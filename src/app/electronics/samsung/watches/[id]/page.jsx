"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import AddToCartButton from "../../../../components/AddToCartButton";

const watches = [
  {
    id: "1",
    name: "Samsung Galaxy Watch",
    image: "/samsung-watch-1.jfif",
    price: "Rs. 79,999",
    description:
      "A Samsung Galaxy smartwatch designed to combine everyday connectivity, fitness features, and modern style.",
  },
  {
    id: "2",
    name: "Samsung Galaxy Watch Premium",
    image: "/samsung-watch-2.jfif",
    price: "Rs. 99,999",
    description:
      "A premium Samsung Galaxy smartwatch offering a modern wearable experience with advanced everyday features.",
  },
];

export default function SamsungWatchDetails() {
  const { id } = useParams();

  const product = watches.find((item) => item.id === id);

  if (!product) {
    return (
      <main className="min-h-screen bg-[#100D11] text-[#F1E8EB] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-semibold">
            Product Not Found
          </h1>

          <Link
            href="/electronics/samsung/watches"
            className="inline-block mt-6 text-[#E8C96A]"
          >
            ← Back to Samsung Watches
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#100D11] text-[#F1E8EB] px-6 py-12">
      <div className="max-w-6xl mx-auto">

        <div className="flex justify-between items-center mb-12">
          <Link
            href="/electronics/samsung/watches"
            className="text-[#E8C96A] hover:text-[#F1E8EB] transition"
          >
            ← Back to Samsung Watches
          </Link>

          <Link
            href="/"
            className="text-[#B8AEB6] hover:text-[#E8C96A] transition"
          >
            Home
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">

          <div className="rounded-2xl overflow-hidden border border-[#B89542]/40 bg-[#151116]">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[500px] object-cover"
            />
          </div>

          <div>
            <p className="text-[#B89542] uppercase tracking-[0.25em] text-sm mb-4">
              Samsung
            </p>

            <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
              {product.name}
            </h1>

            <p className="text-[#E8C96A] text-2xl mt-6">
              {product.price}
            </p>

            <p className="text-[#B8AEB6] leading-7 mt-6">
              {product.description}
            </p>

            <AddToCartButton product={product} className="mt-8 px-8 py-3 border border-[#E8C96A] text-[#E8C96A] rounded-lg hover:bg-[#E8C96A] hover:text-[#100D11] transition" />

            <div className="mt-8">
              <Link
                href="/electronics/samsung/watches"
                className="text-[#B8AEB6] hover:text-[#E8C96A] transition"
              >
                View All Samsung Watches →
              </Link>
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}