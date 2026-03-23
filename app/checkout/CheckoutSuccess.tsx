import { CheckCircle } from "lucide-react";

interface Props {
  firstName: string;
}

export default function CheckoutSuccess({ firstName }: Props) {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={32} className="text-gray-900" />
        </div>
        <p className="text-xs uppercase tracking-[0.2em] text-gray-400 font-medium mb-3">
          Pedido confirmado
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">
          ¡Gracias, {firstName}!
        </h1>
        <p className="text-sm text-gray-500 leading-relaxed mb-8">
          Tu pedido ha sido recibido. Nuestro equipo se pondrá en contacto contigo para coordinar la entrega y el pago contra entrega.
        </p>
        <a
          href="/"
          className="inline-flex items-center gap-2 bg-black text-white text-xs font-semibold tracking-[0.15em] uppercase px-8 py-4 hover:bg-gray-800 transition-colors"
        >
          Volver al inicio
        </a>
      </div>
    </div>
  );
}