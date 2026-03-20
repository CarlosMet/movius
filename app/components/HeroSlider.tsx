"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Poppins } from "next/font/google";

const poppinsFont = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

const slides = [
  {
    id: 1,
    image: "https://i.postimg.cc/wv7GZ3Mt/uniformes.png",
    label: "Nueva Colección",
    title: "Uniformes Escolares",
    subtitle: "Comodidad y calidad para todo el año",
    link: "/uniformes",
    button: "Ver Uniformes",
  },
  {
    id: 2,
    image: "https://i.postimg.cc/tg1Jgtmg/Chat-GPT-Image-Mar-17-2026-02-33-48-AM.png",
    label: "Temporada 2026",
    title: "Colección Hombre",
    subtitle: "Ropa casual y deportiva",
    link: "/hombre",
    button: "Ver Hombre",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop",
    label: "Tendencias",
    title: "Colección Mujer",
    subtitle: "Estilo moderno y cómodo",
    link: "/mujer",
    button: "Ver Mujer",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop",
    label: "Destacado",
    title: "Calzado",
    subtitle: "Perfecto para el colegio y el día a día",
    link: "/calzado",
    button: "Ver Calzado",
  },
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);

  const nextSlide = () => setIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [index]);

  return (
    <div className={`relative w-full h-[80vh] overflow-hidden bg-black ${poppinsFont.variable}`}>

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={(_, info) => {
            if (info.offset.x < -100) nextSlide();
            if (info.offset.x > 100) prevSlide();
          }}
        >
          <motion.div
            className="w-full h-full"
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 6, ease: "easeOut" }}
          >
            <Image
              src={slides[index].image}
              alt={slides[index].title}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* LAYERED OVERLAYS */}
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

      {/* TEXT */}
      <div className="absolute bottom-0 left-0 right-0 px-8 md:px-16 pb-16 md:pb-20">

        <motion.p
          key={`label-${index}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={`text-xs uppercase tracking-[0.25em] text-white/60 font-medium mb-2 ${poppinsFont.className}`}
        >
          {slides[index].label}
        </motion.p>

        <motion.h1
          key={`title-${index}`}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`text-4xl md:text-5xl font-bold tracking-tight text-white leading-none mb-3 ${poppinsFont.className}`}
        >
          {slides[index].title}
        </motion.h1>

        <motion.p
          key={`sub-${index}`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className={`text-sm md:text-base text-white/70 font-light mb-6 max-w-sm ${poppinsFont.className}`}
        >
          {slides[index].subtitle}
        </motion.p>

        {/* CTA — squared, fill bottom to top on hover */}
        <motion.div
          key={`cta-${index}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link
            href={slides[index].link}
            className="relative inline-flex items-center gap-2 border border-white text-white text-sm font-semibold px-6 py-3 overflow-hidden group transition-colors duration-500 md:px-8 lg:px-12 xl:px-16 2xl:px-20"
          >
            {/* Fill layer */}
            <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            {/* Text */}
            <span className={`relative z-10 group-hover:text-black transition-colors duration-500 ${poppinsFont.className}`}>
              {slides[index].button}
            </span>
            <ArrowRight size={16} className="relative z-10 group-hover:text-black transition-colors duration-500" />
          </Link>
        </motion.div>
      </div>

      {/* NAV ARROWS */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/15 hover:bg-white/20 transition-all duration-300"
      >
        <ChevronLeft size={20} className="text-white" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/15 hover:bg-white/20 transition-all duration-300"
      >
        <ChevronRight size={20} className="text-white" />
      </button>

      {/* PROGRESS BARS */}
      <div className="absolute bottom-5 left-8 md:left-16 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className="relative w-12 xl:w-16 2xl:w-24 h-[3px] rounded-full bg-white/25 overflow-hidden hover:bg-white/40 transition-colors"
          >
            {i === index && (
              <motion.div
                key={index}
                className="absolute left-0 top-0 h-full bg-white rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 6, ease: "linear" }}
              />
            )}
          </button>
        ))}
      </div>

      {/* SLIDE COUNTER */}
      <div className={`absolute bottom-[22px] right-8 md:right-16 text-white/40 text-xs font-medium tabular-nums ${poppinsFont.className}`}>
        {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
      </div>

    </div>
  );
}