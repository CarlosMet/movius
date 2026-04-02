
import { Suspense } from "react";
import HMContent from "../components/hombreymujer/HMContent";

export default function MujerPage() {
  return (
    <Suspense>
      <HMContent gender="Mujer" />
    </Suspense>
  );
}
