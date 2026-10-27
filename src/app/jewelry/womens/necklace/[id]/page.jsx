"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import AddToCartButton from "../../../../components/AddToCartButton";

const necklaces = [
  {
    id: "201",
    name: "Golden Grace Necklace",
    price: 4800,
    image: "/women-necklace2.jfif",
    collection: "Golden Collection",
    description:
      "A graceful necklace with timeless elegance, perfect for special occasions and everyday styling.",
  },
  {
    id: "202",
    name: "Elegant Pearl Necklace",
    price: 5500,
    image: "/women-necklace2.jfif",
    collection: "Classic Collection",
    description:
      "A classic-inspired necklace designed to add a refined touch to your look.",
  },
  {
    id: "203",
    name: "Royal Statement Necklace",
    price: 6200,
    image: "/women-necklace2.jfif",
    collection: "Signature Collection",
    description:
      "A statement necklace with distinctive style for memorable occasions.",
  },
  {
    id: "204",
    name: "Minimal Charm Necklace",
    price: 3900,
    image: "/women-necklace2.jfif",
    collection: "Everyday Elegance",
    description:
      "A minimal necklace for effortless and versatile styling.",
  },
];

export default function NecklaceDetails() {
  const params = useParams();
  const id = params.id;
  const [quantity, setQuantity] = useState(1);

  const necklace = necklaces.find((item) => item.id === id);

  if (!necklace) {
    return (
      <main className="min-h-screen bg-[#100D11] text-[#F1E8EB] flex flex-col items-center justify-center px-6">
        <h1 className="text-4xl text-[#E8C96A] mb-5">
          Product Not Found
        </h1>
        <Link
          href="/jewelry/womens/necklace"
          className="text-[#B89542] hover:text-[#E8C96A]"
        >
          ← Back to Necklaces
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#100D11] text-[#F1E8EB] px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/"
          className="inline-block mb-10 text-[#B89542] hover:text-[#E8C96A]"
        >
          ← Back to Home
        </Link>

        <div className="flex flex-col md:flex-row gap-12">
          <div className="w-full md:w-1/2 overflow-hidden rounded-2xl border border-[#B89542]/40">
            <img
              src={necklace.image}
              alt={necklace.name}
              className="w-full h-[420px] md:h-[560px] object-cover"
            />
          </div>

          <div className="w-full md:w-1/2 py-3">
            <p className="text-[#B89542] uppercase tracking-[0.3em] text-sm mb-5">
              {necklace.collection}
            </p>

            <h1 className="text-4xl md:text-5xl font-semibold text-[#E8C96A] mb-6">
              {necklace.name}
            </h1>

            <p className="text-2xl mb-6">
              Rs. {necklace.price.toLocaleString("en-PK")}
            </p>

            <div className="border-y border-[#B89542]/30 py-6 mb-7">
              <p className="text-[#B8AEB6] leading-8">
                {necklace.description}
              </p>
            </div>

            <p className="text-sm text-[#B8AEB6] mb-6">
              Product ID: {necklace.id}
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
              Subtotal: Rs. {(necklace.price * quantity).toLocaleString("en-PK")}
            </p>

            <AddToCartButton
              product={necklace}
              quantity={quantity}
              className="bg-[#E8C96A] text-[#100D11] px-8 py-4 uppercase tracking-widest text-sm hover:bg-[#B89542] transition"
            />

            <div className="mt-8">
              <Link
                href="/jewelry/womens/necklace"
                className="text-[#B89542] hover:text-[#E8C96A]"
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