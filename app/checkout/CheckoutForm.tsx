"use client";

import { Truck } from "lucide-react";

const DOC_TYPES = [
  "Cédula de ciudadanía",
  "Cédula de extranjería",
  "Pasaporte",
  "NIT",
];

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
}

export default function CheckoutForm({ form, errors, onChange }: Props) {
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

        <div className="flex items-start gap-4 border border-black p-4">
          <div className="w-4 h-4 mt-0.5 rounded-full border-2 border-black flex items-center justify-center flex-shrink-0">
            <div className="w-2 h-2 rounded-full bg-black" />
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