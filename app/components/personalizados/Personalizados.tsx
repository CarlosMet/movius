"use client";

import Link from "next/link";
import { Poppins } from "next/font/google";
import { WHATSAPP_CUSTOM_MESSAGE } from "@/lib/constantes";


const poppinsFont = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

const WHATSAPP_URL = `https://wa.me/573006161316?text=${encodeURIComponent(WHATSAPP_CUSTOM_MESSAGE)}`;

export default function Personalizados() {
  return (
    <section className={`relative w-full h-[60vh] overflow-hidden bg-black ${poppinsFont.variable}`}>


        

      {/* BACKGROUND VIDEO */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="https://videos.pexels.com/video-files/4763824/4763824-uhd_2560_1440_24fps.mp4" type="video/mp4" />
      </video>

      {/* LAYERED OVERLAYS — same as hero slider */}
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

      {/* CENTERED TEXT */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">

        {/* Eyebrow */}
        <p className={`text-xs uppercase tracking-[0.3em] text-white/60 font-medium mb-4 ${poppinsFont.className}`}>
          Tu uniforme personalizado
        </p>

        {/* Title */}
        <h2 className={`text-5xl md:text-7xl font-bold tracking-tight text-white leading-none mb-4 ${poppinsFont.className}`}>
          Somos Fabricantes
        </h2>

        {/* Subtitle */}
        <p className={`text-sm md:text-base text-white/70 font-light mb-8 ${poppinsFont.className}`}>
          Ponte en contacto con nosotros para crear tus uniformes personalizados
        </p>

        {/* CTA — squared fill-up button */}
        <Link
          href={WHATSAPP_URL}
          className="relative inline-flex items-center gap-2 border border-white text-white text-xs md:text-sm font-semibold tracking-[0.15em] uppercase px-8 py-3 md:px-10 md:py-4 overflow-hidden group transition-colors duration-300"
        >
          <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          <span className={`relative z-10 group-hover:text-black transition-colors duration-300 ${poppinsFont.className}`}>
            Contactanos
          </span>
        </Link>

      </div>
    </section>
  );
}