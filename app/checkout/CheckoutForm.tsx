"use client";

import { Truck, MessageCircle } from "lucide-react";

const DOC_TYPES = [
  "Cédula de ciudadanía",
  "Cédula de extranjería",
  "Pasaporte",
  "NIT",
];

export type PaymentMethod = "cod" | "whatsapp";

export interface FormData {
  docType: string;
  docNumber: string;
  firstName: string;
  lastName: string;
  address: string;
  addressDetails: string;
  phone: string;
}

export const EMPTY_FORM: FormData = {
  docType: "Cédula de ciudadanía",
  docNumber: "",
  firstName: "",
  lastName: "",
  address: "",
  addressDetails: "",
  phone: "",
};

interface Props {
  form: FormData;
  errors: Partial<FormData>;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  paymentMethod: PaymentMethod;
  onPaymentMethodChange: (method: PaymentMethod) => void;
  whatsappUrl?: string;
}

export default function CheckoutForm({
  form,
  errors,
  onChange,
  paymentMethod,
  onPaymentMethodChange,
  whatsappUrl,
}: Props) {
  return (
    <div className="space-y-6">

      {/* DATOS PERSONALES */}
      <div className="bg-white border border-gray-100 p-6 md:p-8">
        <p className="text-xs uppercase tracking-[0.2em] text-gray-400 font-medium mb-6">
          Datos personales
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs uppercase tracking-[0.12em] text-gray-400 font-medium mb-1.5">
              Tipo de documento
            </label>
            <select
              name="docType"
              value={form.docType}
              onChange={onChange}
              className="w-full border border-gray-200 text-sm text-gray-900 px-4 py-3 outline-none focus:border-gray-900 transition-colors bg-white"
            >
              {DOC_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <Field
              label="Número de documento *"
              name="docNumber"
              value={form.docNumber}
              error={errors.docNumber}
              onChange={onChange}
              placeholder="Ej: 1234567890"
            />
          </div>

          <Field
            label="Nombres *"
            name="firstName"
            value={form.firstName}
            error={errors.firstName}
            onChange={onChange}
            placeholder="Ej: Juan Carlos"
          />

          <Field
            label="Apellidos *"
            name="lastName"
            value={form.lastName}
            error={errors.lastName}
            onChange={onChange}
            placeholder="Ej: Gómez Pérez"
          />

          <div className="md:col-span-2">
            <Field
              label="Teléfono *"
              name="phone"
              value={form.phone}
              error={errors.phone}
              onChange={onChange}
              placeholder="Ej: 3001234567"
              type="tel"
            />
          </div>
        </div>
      </div>

      {/* DIRECCIÓN */}
      <div className="bg-white border border-gray-100 p-6 md:p-8">
        <p className="text-xs uppercase tracking-[0.2em] text-gray-400 font-medium mb-6">
          Dirección de entrega
        </p>
        <div className="space-y-4">
          <Field
            label="Dirección *"
            name="address"
            value={form.address}
            error={errors.address}
            onChange={onChange}
            placeholder="Ej: Calle 10 # 43A - 25"
          />
          <div>
            <label className="block text-xs uppercase tracking-[0.12em] text-gray-400 font-medium mb-1.5">
              Especificaciones adicionales
              <span className="normal-case tracking-normal ml-1 text-gray-300">
                (opcional)
              </span>
            </label>
            <textarea
              name="addressDetails"
              value={form.addressDetails}
              onChange={onChange}
              placeholder="Ej: Apto 301, Torre B, cerca al parque..."
              rows={3}
              className="w-full border border-gray-200 text-sm text-gray-900 px-4 py-3 outline-none focus:border-gray-900 transition-colors resize-none placeholder:text-gray-300"
            />
          </div>
        </div>
      </div>

      {/* MÉTODO DE PAGO */}
      <div className="bg-white border border-gray-100 p-6 md:p-8">
        <p className="text-xs uppercase tracking-[0.2em] text-gray-400 font-medium mb-6">
          Método de pago
        </p>

        <div className="space-y-3">

          {/* CONTRA ENTREGA */}
          <button
            type="button"
            onClick={() => onPaymentMethodChange("cod")}
            className={`w-full flex items-start gap-4 p-4 border transition-colors duration-200 text-left ${
              paymentMethod === "cod"
                ? "border-black"
                : "border-gray-200 hover:border-gray-400"
            }`}
          >
            <div className={`w-4 h-4 mt-0.5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
              paymentMethod === "cod" ? "border-black" : "border-gray-300"
            }`}>
              {paymentMethod === "cod" && (
                <div className="w-2 h-2 rounded-full bg-black" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Truck size={15} className="text-gray-700" />
                <p className="text-sm font-semibold text-gray-900">
                  Pago contra entrega
                </p>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                Paga en efectivo cuando recibas tu pedido. Nuestro equipo se contactará contigo para coordinar la entrega.
              </p>
            </div>
          </button>

          {/* WHATSAPP */}
          <button
            type="button"
            onClick={() => onPaymentMethodChange("whatsapp")}
            className={`w-full flex items-start gap-4 p-4 border transition-colors duration-200 text-left ${
              paymentMethod === "whatsapp"
                ? "border-black"
                : "border-gray-200 hover:border-gray-400"
            }`}
          >
            <div className={`w-4 h-4 mt-0.5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
              paymentMethod === "whatsapp" ? "border-black" : "border-gray-300"
            }`}>
              {paymentMethod === "whatsapp" && (
                <div className="w-2 h-2 rounded-full bg-black" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <MessageCircle size={15} className="text-[#25D366]" />
                <p className="text-sm font-semibold text-gray-900">
                  Continuar por WhatsApp
                </p>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                Enviaremos el resumen de tu pedido por WhatsApp para coordinar el pago y la entrega directamente.
              </p>
            </div>
          </button>

          {/* SECCIÓN EXPANDIDA */}
          {paymentMethod === "whatsapp" && (
            <div className="border border-t-0 border-black px-4 pb-4 pt-3 flex items-center justify-between gap-4 bg-gray-50">
              <p className="text-xs text-gray-500 leading-relaxed">
                Se enviará el resumen de tu pedido. Los datos personales los coordinarás directamente por chat.
              </p>
              <a
                href={whatsappUrl ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => !whatsappUrl && e.preventDefault()}
                className="flex-shrink-0 inline-flex items-center gap-2 bg-[#25D366] text-white text-xs font-semibold tracking-[0.12em] uppercase px-4 py-2.5 hover:bg-[#20b858] transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-3.5 h-3.5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.855L.057 23.885a.75.75 0 0 0 .92.92l6.056-1.47A11.955 11.955 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.713 9.713 0 0 1-4.953-1.356l-.355-.211-3.684.894.912-3.585-.231-.368A9.715 9.715 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
                </svg>
                Ir a WhatsApp
              </a>
            </div>
          )}

        </div>
      </div>

    </div>
  );
}

function Field({
  label, name, value, onChange, error, placeholder, type = "text",
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-[0.12em] text-gray-400 font-medium mb-1.5">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full border text-sm text-gray-900 px-4 py-3 outline-none transition-colors placeholder:text-gray-300 ${
          error
            ? "border-red-300 focus:border-red-400"
            : "border-gray-200 focus:border-gray-900"
        }`}
      />
      {error && <p className="text-[10px] text-red-400 mt-1">{error}</p>}
    </div>
  );
}


