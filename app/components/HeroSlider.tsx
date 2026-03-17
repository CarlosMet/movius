"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    image:
      "https://i.postimg.cc/wv7GZ3Mt/uniformes.png",
    title: "Uniformes Escolares",
    subtitle: "Comodidad y calidad para todo el año",
    link: "/uniformes",
    button: "Ver Uniformes",
  },
  {
    id: 2,
    image:
      "https://i.postimg.cc/tg1Jgtmg/Chat-GPT-Image-Mar-17-2026-02-33-48-AM.png",
    title: "Colección Hombre",
    subtitle: "Ropa casual y deportiva",
    link: "/hombre",
    button: "Ver Hombre",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop",
    title: "Colección Mujer",
    subtitle: "Estilo moderno y cómodo",
    link: "/mujer",
    button: "Ver Mujer",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop",
    title: "Calzado",
    subtitle: "Perfecto para el colegio y el día a día",
    link: "/calzado",
    button: "Ver Calzado",
  },
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => clearInterval(interval);
  }, [index]);

  return (
    <div className="relative w-full h-[70vh] overflow-hidden bg-black">

      {/* SLIDES */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={(e, info) => {
            if (info.offset.x < -100) nextSlide();
            if (info.offset.x > 100) prevSlide();
          }}
        >
          {/* parallax */}
          <motion.div
            className="w-full h-full"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 6 }}
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

      {/* overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* TEXTO */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">

        <motion.h1
          key={slides[index].title}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold"
        >
          {slides[index].title}
        </motion.h1>

        <motion.p
          key={slides[index].subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-lg md:text-xl"
        >
          {slides[index].subtitle}
        </motion.p>

        {/* CTA */}
        <Link href={slides[index].link}>
          <button className="btn-primary mt-8">
            {slides[index].button}
          </button>
        </Link>

      </div>

      {/* flecha izquierda */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2
        w-12 h-12
        flex items-center justify-center
        rounded-full
        bg-white/15 backdrop-blur-lg
        border border-white/20
        hover:bg-white/25
        transition-all duration-300"
        >
        <ChevronLeft size={24} className="text-white" />
       </button>

      {/* flecha derecha */}
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2
        w-12 h-12
        flex items-center justify-center
        rounded-full
        bg-white/15 backdrop-blur-lg
        border border-white/20
        hover:bg-white/25
        transition-all duration-300"
        >
            <ChevronRight size={24} className="text-white" />
        </button>

      {/* DOTS */}
      

      {/* progress bar */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">

            {slides.map((_, i) => (

                <button
                key={i}
                onClick={() => setIndex(i)}
                className="relative w-14 h-[4px] rounded-full bg-white/30 overflow-hidden transition hover:bg-white/50"
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

    </div>
  );
}