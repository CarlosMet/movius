"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProductGrid({ filters }: any) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams();

    filters.type.forEach((t: string) =>
      params.append("type", t)
    );

    filters.gender.forEach((g: string) =>
      params.append("gender", g)
    );

    if (filters.sort) {
      params.set("sort", filters.sort);
    }

    fetch(`/api/products?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, [filters]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {products.map((p: any) => (
        <Link key={p.slug} href={`/product/${p.slug}`}>
          <div className="cursor-pointer">
            <img src={p.image} />
            <p>{p.name}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}