"use client";

import { Poppins } from "next/font/google";
import { useEffect, useRef, useState } from "react";

const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

// Parsea "+5k", "100%", "+1000" → { prefix, value, suffix }
function parseNumber(str: string): { prefix: string; value: number; suffix: string } {
  const prefix = str.startsWith("+") ? "+" : "";
  const clean = str.replace("+", "");
  const suffix = clean.endsWith("k") ? "k" : clean.endsWith("%") ? "%" : "";
  const value = parseFloat(clean.replace("k", "").replace("%", ""));
  return { prefix, value, suffix };
}

function useCountUp(target: number, duration: number = 1800, start: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);

  return count;
}

function StatCard({ number, label }: { number: string; label: string }) {
  const { prefix, value, suffix } = parseNumber(number);
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const count = useCountUp(value, 1800, started);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="bg-white px-8 py-10 flex flex-col gap-2">
      <span className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 tabular-nums">
        {prefix}{count}{suffix}
      </span>
      <span className="text-xs uppercase tracking-[0.15em] text-gray-400 font-medium">
        {label}
      </span>
    </div>
  );
}

export default function BrandStatement() {
  return (
    <section className={`py-24 bg-white ${poppins.className}`}>
      <div className="max-w-7xl mx-auto px-6">

        {/* EYEBROW */}
        <p className="text-xs uppercase tracking-[0.2em] text-gray-400 font-medium mb-4 text-right">
          Nuestra historia
        </p>

        {/* MAIN CONTENT */}
        <div className="flex flex-col md:flex-row-reverse md:items-end md:justify-between gap-4 mb-16">
          <h2 className="text-4xl md:text-5xl xl:text-6xl font-bold leading-tight tracking-tight text-gray-900 max-w-xl md:text-right">
            Productos personalizados,{" "}
            <span className="italic font-light text-gray-400">
              Adaptados a tus necesidades.
            </span>
          </h2>
          <p className="text-sm lg:text-base text-gray-400 max-w-xs leading-relaxed">
            Contáctanos para crear tus productos personalizados, contamos con el
            servicio de estampado y confección de uniformes.
          </p>
        </div>

        {/* STATS ROW */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-100 border border-gray-100">
          {[
            { number: "+5", label: "Años de experiencia" },
            { number: "+5k", label: "Prendas producidas" },
            { number: "100%", label: "Fabricación local" },
            { number: "+1000", label: "Clientes satisfechos" },
          ].map((stat) => (
            <StatCard key={stat.label} number={stat.number} label={stat.label} />
          ))}
        </div>

      </div>
    </section>
  );
}