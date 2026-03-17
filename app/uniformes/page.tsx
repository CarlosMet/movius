import { Suspense } from "react";
import UniformesContent from "./UniformesContent";

export default function Page() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <UniformesContent />
    </Suspense>
  );
}