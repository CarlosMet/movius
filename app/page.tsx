import Image from "next/image";
import HeroSlider from "./components/HeroSlider";

export default function Home() {
  return (
    <div>
      <HeroSlider />
      <button className="btn-primary" > Agregar al carrito </button>
      <button className="btn">boton normal</button>     
      <button className="btn-outline">boton contorno</button>   
    </div>
  );
}
