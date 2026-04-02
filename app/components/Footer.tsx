import Link from "next/link";
import { Poppins } from "next/font/google";
import { Instagram, Facebook, Twitter } from "lucide-react";
import { footer } from "framer-motion/m";

const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "500", "600"] });

const links = {
  colecciones: [
    { label: "Hombre", href: "/hombre" },
    { label: "Mujer", href: "/mujer" },
    { label: "Uniformes", href: "/uniformes" },
    { label: "Calzado", href: "/calzado" },
  ],
  ayuda: [
    { label: "Preguntas frecuentes", href: "/faq" },
    { label: "Guía de tallas", href: "/tallas" },
    { label: "Envíos y devoluciones", href: "/envios" },
    { label: "Contacto", href: "/contacto" },
  ],
  empresa: [
    { label: "Nuestra historia", href: "/nosotros" },
    { label: "Sostenibilidad", href: "/sostenibilidad" },
    { label: "Trabaja con nosotros", href: "/empleos" },
  ],
};

export default function Footer() {
  return (
    <footer className={`bg-black text-white ${poppins.className}`}>

      {/* MAIN */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-16 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">

          {/* BRAND */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="text-xl font-bold tracking-widest text-white">
              MOVIUS
            </Link>
            <p className="text-xs text-white/40 font-light leading-relaxed mt-4 max-w-[200px]">
              Marca 100% colombiana. Cada prenda lleva parte de nuestra historia.
            </p>

            {/* REDES */}
            <div className="flex items-center gap-4 mt-6">
              {[
                { icon: Instagram, href: "https://instagram.com" },
                { icon: Facebook, href: "https://facebook.com" },
                { icon: Twitter, href: "https://twitter.com" },
              ].map(({ icon: Icon, href }, i) => (
                <a  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 flex items-center justify-center border border-white/15 text-white/40 hover:border-white/60 hover:text-white transition-all duration-200">
                 
                
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* COLECCIONES */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-medium mb-5">
              Colecciones
            </p>
            <ul className="space-y-3">
              {links.colecciones.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* AYUDA */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-medium mb-5">
              Ayuda
            </p>
            <ul className="space-y-3">
              {links.ayuda.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* EMPRESA */}
          

        </div>

        {/* NEWSLETTER */}
        
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[10px] text-white/25 uppercase tracking-[0.15em]">
            © {new Date().getFullYear()} Movius. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6">
            {[
              { label: "Privacidad", href: "/privacidad" },
              { label: "Términos", href: "/terminos" },
              { label: "Cookies", href: "/cookies" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[10px] uppercase tracking-[0.15em] text-white/25 hover:text-white/60 transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

    </footer>
  );
}