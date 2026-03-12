import Link from "next/link";
import Image from "next/image";

type DropdownMenuProps = {
  basePath: string;
};

export default function DropdownMenu({ basePath }: DropdownMenuProps) {

  const image =
    basePath === "/hombre"
      ? "https://images.unsplash.com/photo-1516826957135-700dedea698c"
      : "https://images.unsplash.com/photo-1483985988355-763728e1935b";

  return (
    <div
      className="
      absolute
      top-full
      left-1/2
      -translate-x-1/2
      w-screen
      bg-white
      border-t
      border-gray-200
      shadow-[0_10px_40px_rgba(0,0,0,0.08)]
      opacity-0
      invisible
      group-hover:visible
      group-hover:opacity-100
      transition-all
      duration-300
      ease-out
      translate-y-3
      group-hover:translate-y-0
      z-40
    "
    >
      <div className="max-w-7xl mx-auto grid grid-cols-3 min-h-[360px]">

        {/* CATEGORIAS */}
        <div className="col-span-2 px-10 py-12">

          <div className="grid grid-cols-2 gap-16 text-sm">

            {/* Casual */}
            <div>
              <h3 className="font-extrabold text-gray-900 mb-5 tracking-wide">
                Casual
              </h3>

              <ul className="space-y-3 text-gray-600">
                <li>
                  <Link href={`${basePath}/casual/busos`} className="hover:text-black transition">
                    Busos
                  </Link>
                </li>

                <li>
                  <Link href={`${basePath}/casual/camisetas`} className="hover:text-black transition">
                    Camisetas
                  </Link>
                </li>

                <li>
                  <Link href={`${basePath}/casual/pantalonetas`} className="hover:text-black transition">
                    Pantalonetas
                  </Link>
                </li>
              </ul>
            </div>

            {/* Deportivo */}
            <div>
              <h3 className="font-extrabold text-gray-900 mb-5 tracking-wide">
                Deportivo
              </h3>

              <ul className="space-y-3 text-gray-600">
                <li>
                  <Link href={`${basePath}/deportivo/camisetas`} className="hover:text-black transition">
                    Camisetas
                  </Link>
                </li>

                <li>
                  <Link href={`${basePath}/deportivo/sudaderas`} className="hover:text-black transition">
                    Sudaderas
                  </Link>
                </li>
              </ul>
            </div>

          </div>

        </div>

        {/* IMAGEN */}
        <div className="relative w-full h-full min-h-[260px]">

          <Image
            src={image}
            alt="categoria"
            fill
            className="object-cover"
          />

        </div>

      </div>
    </div>
  );
}