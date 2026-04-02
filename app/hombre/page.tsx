
import { Suspense } from "react";
import HMContent from "../components/hombreymujer/HMContent";


export default function HombrePage() {
  return (
    <Suspense>
      <HMContent gender="Hombre" />
    </Suspense>
  );
}