"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  images: string[];
  name: string;
}

export default function ProductGallery({ images, name }: Props) {
  const [selected, setSelected] = useState(0);
  const [dragStart, setDragStart] = useState(0);

  const prev = () => setSelected((s) => (s - 1 + images.length) % images.length);
  const next = () => setSelected((s) => (s + 1) % images.length);

  return (
    <div className="flex flex-col gap-3">

      {/* IMAGEN PRINCIPAL */}
      <div
        className="relative w-full h-[420px] md:h-[580px] bg-gray-100 overflow-hidden rounded-sm"
        onTouchStart={(e) => setDragStart(e.touches[0].clientX)}
        onTouchEnd={(e) => {
          const diff = dragStart - e.changedTouches[0].clientX;
          if (diff > 50) next();
          if (diff < -50) prev();
        }}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={selected}
            src={images[selected]}
            alt={`${name} ${selected + 1}`}
            className="w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          />
        </AnimatePresence>

        {/* Contador móvil */}
        <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2.5 py-1 md:hidden">
          {selected + 1} / {images.length}
        </div>
      </div>

      {/* THUMBNAILS — solo desktop */}
      <div className="hidden md:grid grid-cols-4 gap-2">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className={`relative h-[90px] overflow-hidden rounded-sm transition-all duration-200 ${
              selected === i
                ? "ring-2 ring-black ring-offset-1"
                : "opacity-60 hover:opacity-100"
            }`}
          >
            <img
              src={img}
              alt={`${name} ${i + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* DOTS — solo móvil */}
      <div className="flex justify-center gap-1.5 md:hidden mt-1">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              selected === i ? "w-5 bg-black" : "w-1.5 bg-gray-300"
            }`}
          />
        ))}
      </div>

    </div>
  );
}