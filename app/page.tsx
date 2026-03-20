import Image from "next/image";
import HeroSlider from "./components/HeroSlider";
import { Poppins } from "next/font/google";
import { Montserrat } from "next/font/google";
import PremiumCarousel from "./components/seccioncalidad/PremiumCarousel";

const montserratFont = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})



export default function Home() {
  return (
    <div className={`${montserratFont.className} font-sans`}>
      <HeroSlider />
      <PremiumCarousel />
      <button className="btn-primary" > Agregar al carrito </button>
      <button className="btn">boton normal</button>     
      <button className="btn-outline">boton contorno</button>   
    </div>
  );
}
