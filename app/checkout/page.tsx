"use client";

import { useState, useEffect } from "react";
import { Poppins } from "next/font/google";
import { ShoppingBag } from "lucide-react";
import { getCart, saveCart, type CartItem } from "@/lib/cart";
import CheckoutForm, { type FormData, EMPTY_FORM } from "./CheckoutForm";
import CheckoutSuccess from "./CheckoutSuccess";
import CheckoutSummary from "./CheckoutSummary";


const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

export default function CheckoutPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setItems(getCart());
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!form.docNumber.trim()) newErrors.docNumber = "Requerido";
    if (!form.firstName.trim()) newErrors.firstName = "Requerido";
    if (!form.lastName.trim()) newErrors.lastName = "Requerido";
    if (!form.address.trim()) newErrors.address = "Requerido";
    if (!form.phone.trim()) newErrors.phone = "Requerido";
    else if (!/^\d{7,15}$/.test(form.phone.trim())) newErrors.phone = "Número inválido";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!validate()) return;
    saveCart([]);
    setSubmitted(true);
  };

  if (submitted) return <CheckoutSuccess firstName={form.firstName} />;

  if (items.length === 0) {
    return (
      <div className={`min-h-screen flex items-center justify-center px-6 ${poppins.className}`}>
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-4">
            <ShoppingBag size={24} className="text-gray-300" />
          </div>
          <p className="text-sm font-medium text-gray-900 mb-1">
            Tu carrito está vacío
          </p>
          <p className="text-xs text-gray-400 mb-6">
            Agrega productos antes de continuar
          </p>
          <a
            href="/"
            className="text-xs font-semibold uppercase tracking-[0.15em] underline underline-offset-2 hover:text-gray-500 transition-colors"
          >
            Explorar productos
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gray-50 ${poppins.className}`}>
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-12">

        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400 font-medium mb-2">
            Finalizar compra
          </p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
            Checkout
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 items-start">
          <CheckoutForm form={form} errors={errors} onChange={handleChange} />
          <CheckoutSummary items={items} onItemsChange={setItems} onSubmit={handleSubmit} />
        </div>

      </div>
    </div>
  );
}