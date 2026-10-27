"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import AddToCartButton from "../../../../components/AddToCartButton";

const rings = [
  {
    id: "101",
    name: "Golden Elegance Ring",
    price: 4500,
    image: "/women-ring2.jfif",
    type: "Gold Collection",
    description:
      "A timeless ring design with elegant details, perfect for everyday styling and special occasions.",
  },
  {
    id: "102",
    name: "Classic Gold Ring",
    price: 5200,
    image: "/women-ring2.jfif",
    type: "Timeless Collection",
    description:
      "A classic-inspired ring created for a refined and sophisticated look.",
  },
  {
    id: "103",
    name: "Elegant Statement Ring",
    price: 6000,
    image: "/women-ring2.jfif",
    type: "Signature Collection",
    description:
      "A statement design that adds a distinctive touch to your jewelry collection.",
  },
  {
    id: "104",
    name: "Luxury Minimal Ring",
    price: 3800,
    image: "/women-ring2.jfif",
    type: "Everyday Elegance",
    description:
      "A minimal and versatile design for effortless elegance throughout the day.",
  },
];

export default function RingDetails() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);

  const ring = rings.find((item) => item.id === id);

  if (!ring) {
    return (
      <main className="min-h-screen bg-[#100D11] text-[#F1E8EB] flex flex-col items-center justify-center px-6">
        <h1 className="text-4xl text-[#E8C96A] mb-4">
          Product Not Found
        </h1>
        <Link href="/jewelry/womens/rings" className="text-[#B89542] hover:text-[#E8C96A]">
          ← Back to Women's Rings
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#100D11] text-[#F1E8EB] px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/"
          className="inline-block mb-10 text-[#B89542] hover:text-[#E8C96A] transition"
        >
          ← Back to Home
        </Link>

        <div className="flex flex-col md:flex-row gap-12 items-start">
          <div className="w-full md:w-1/2 overflow-hidden rounded-2xl border border-[#B89542]/40">
            <img
              src={ring.image}
              alt={ring.name}
              className="w-full h-[420px] md:h-[560px] object-cover"
            />
          </div>

          <div className="w-full md:w-1/2 py-3">
            <p className="text-[#B89542] uppercase tracking-[0.3em] text-sm mb-5">
              {ring.type}
            </p>

            <h1 className="text-4xl md:text-5xl font-semibold text-[#E8C96A] mb-6">
              {ring.name}
            </h1>

            <p className="text-2xl mb-6">
              Rs. {ring.price.toLocaleString("en-PK")}
            </p>

            <div className="border-y border-[#B89542]/30 py-6 mb-7">
              <p className="text-[#B8AEB6] leading-8">
                {ring.description}
              </p>
            </div>

            <p className="text-sm text-[#B8AEB6] mb-3">
              Product ID: {ring.id}
            </p>

            <div className="flex items-center gap-5 mb-8">
              <span className="text-sm uppercase tracking-widest">
                Quantity
              </span>

              <div className="flex items-center border border-[#B89542]/50 rounded">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-4 py-2 text-[#E8C96A] hover:bg-[#2A2225]"
                >
                  −
                </button>

                <span className="px-4">{quantity}</span>

                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-4 py-2 text-[#E8C96A] hover:bg-[#2A2225]"
                >
                  +
                </button>
              </div>
            </div>

            <p className="text-[#B8AEB6] mb-6">
              Subtotal: Rs. {(ring.price * quantity).toLocaleString("en-PK")}
            </p>

            <AddToCartButton
              product={ring}
              quantity={quantity}
              className="w-full md:w-auto bg-[#E8C96A] text-[#100D11] px-8 py-4 uppercase tracking-widest text-sm hover:bg-[#B89542] transition"
            />

            <div className="mt-8">
              <Link
                href="/jewelry/womens/rings"
                className="text-[#B89542] hover:text-[#E8C96A] transition"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}