export default function ProductSkeleton() {
  return (
    <div className="animate-pulse">

      <div className="w-full aspect-[1080/1616] bg-gray-200" />

      <div className="mt-3 space-y-2">
        <div className="h-4 bg-gray-200 w-3/4" />
        <div className="h-4 bg-gray-200 w-1/2" />
        <div className="h-8 bg-gray-200 w-full mt-2" />
      </div>

    </div>
  );
}