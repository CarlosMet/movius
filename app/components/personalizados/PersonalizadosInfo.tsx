"use client";

import { Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

export default function BrandStatement() {
  return (
    <section className={`py-24 bg-white ${poppins.className}`}>
      <div className="max-w-7xl mx-auto px-6">

        {/* EYEBROW — derecha */}
        <p className="text-xs uppercase tracking-[0.2em] text-gray-400 font-medium mb-4 text-right">
          Nuestra historia
        </p>

        {/* MAIN CONTENT — texto izquierda, título derecha */}
        <div className="flex flex-col md:flex-row-reverse md:items-end md:justify-between gap-4 mb-16">
          <h2 className="text-4xl md:text-5xl xl:text-6xl font-bold leading-tight tracking-tight text-gray-900 max-w-xl md:text-right">
            Productos personalizados,{" "}
            <span className="italic font-light text-gray-400">
              Adaptados a tus necesidades.
            </span>
          </h2>
          <p className="text-sm lg:text-base text-gray-400 max-w-xs leading-relaxed">
            Contactanos para crear tus productos personalizados, contamos con el servicio de estampado y confección de uniformes.
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
            <div key={stat.label} className="bg-white px-8 py-10 flex flex-col gap-2">
              <span className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
                {stat.number}
              </span>
              <span className="text-xs uppercase tracking-[0.15em] text-gray-400 font-medium">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}