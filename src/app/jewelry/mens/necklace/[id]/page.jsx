"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useCart } from "../../../../../context/CartContext";

const necklaces = [
  {
    id: "401",
    name: "Classic Silver Chain",
    price: 3800,
    image: "/mens-necklace1.jfif",
    collection: "Men's Signature",
    tag: "BESTSELLER",
    material: "Sterling Silver finish",
    description: "A refined silver-toned chain designed for modern sophistication and effortless wear.",
  },
  {
    id: "402",
    name: "Obsidian Pendant Necklace",
    price: 4600,
    image: "/mens-necklace2.jfif",
    collection: "Men's Signature",
    tag: "FEATURED",
    material: "Polished Black Obsidian & Stainless Steel",
    description: "A bold statement pendant that embodies strength, poise, and distinct character.",
  },
  {
    id: "403",
    name: "Cuban Link Luxury Necklace",
    price: 5400,
    image: "/mens-necklace3.jfif",
    collection: "Men's Luxury",
    tag: "EXCLUSIVE",
    material: "Heavy Gauge Gold-Tone Alloy",
    description: "A meticulously crafted Cuban link necklace with a polished finish and substantial weight.",
  },
];

export default function MensNecklaceDetail() {
  const params = useParams();
  const id = params?.id;
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const { addItem } = useCart();

  const necklace = necklaces.find((item) => item.id === id);

  const handleAddToCart = () => {
    if (!necklace) return;
    addItem(
      {
        id: `j-neck-${necklace.id}`,
        name: necklace.name,
        price: necklace.price,
        image: necklace.image,
      },
      { quantity }
    );
    setMessage("Item added to your shopping bag.");
  };

  if (!necklace) {
    return (
      <main className="min-h-screen bg-[#100D11] text-[#F1E8EB] flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-4xl font-serif text-[#E8C96A] mb-4">Product Not Found</h1>
        <p className="text-[#B8AEB6] mb-8">This piece could not be located in our collection.</p>
        <Link
          href="/jewelry/mens/necklace"
          className="border border-[#E8C96A] px-6 py-3 text-xs uppercase tracking-[0.2em] text-[#E8C96A] hover:bg-[#E8C96A] hover:text-[#100D11] transition"
        >
          ← Back to Necklaces
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#100D11] text-[#F1E8EB] px-5 sm:px-10 lg:px-16 py-12">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/jewelry/mens/necklace"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#B8AEB6] hover:text-[#E8C96A] transition mb-10"
        >
          <span>←</span> Back to Necklaces
        </Link>

        <div className="flex flex-col md:flex-row gap-12 items-center border border-[#B89542]/30 bg-[#171318] p-6 sm:p-10 rounded-2xl">
          <div className="w-full md:w-1/2">
            <div className="relative overflow-hidden rounded-xl border border-[#B89542]/20 bg-[#0F0B10]">
              <img
                src={necklace.image}
                alt={necklace.name}
                className="w-full h-[400px] sm:h-[500px] object-cover"
              />
              <span className="absolute top-4 left-4 border border-[#E8C96A]/50 bg-[#100D11]/85 px-3 py-1.5 text-[9px] tracking-[0.2em] text-[#E8C96A]">
                {necklace.tag}
              </span>
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <p className="text-[#B89542] uppercase tracking-[0.3em] text-xs mb-3">
              {necklace.collection}
            </p>
            <h1 className="text-3xl sm:text-5xl font-serif text-[#F1E8EB] mb-4">
              {necklace.name}
            </h1>
            <p className="text-2xl font-bold text-[#E8C96A] mb-6">
              Rs. {necklace.price.toLocaleString("en-PK")}
            </p>

            <div className="border-t border-b border-[#B89542]/20 py-5 mb-6">
              <p className="text-[#B8AEB6] leading-8 text-sm sm:text-base">
                {necklace.description}
              </p>
              <p className="text-xs text-[#E8C96A] mt-3 tracking-wide">
                Material: {necklace.material}
              </p>
            </div>

            <div className="flex items-center gap-4 mb-8">
              <span className="text-xs uppercase tracking-widest text-[#B8AEB6]">Quantity</span>
              <div className="flex items-center border border-[#B89542]/40 rounded bg-[#100D11]">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-4 py-2 text-[#E8C96A] hover:bg-[#201A22] transition"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="px-4 text-sm font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-4 py-2 text-[#E8C96A] hover:bg-[#201A22] transition"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              <span className="text-xs text-[#B8AEB6]">
                Subtotal: Rs. {(necklace.price * quantity).toLocaleString("en-PK")}
              </span>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full bg-[#E8C96A] text-[#100D11] py-4 text-xs uppercase tracking-[0.25em] font-semibold hover:bg-[#F5DFA0] transition duration-300"
            >
              Add to Shopping Bag
            </button>

            {message && (
              <p className="mt-4 text-center text-xs tracking-wider text-[#E8C96A]">
                {message}
              </p>
            )}

            <div className="mt-6 flex items-center justify-between text-[11px] text-[#B8AEB6] border-t border-[#B89542]/20 pt-4">
              <span>✦ Authentic Craftsmanship</span>
              <span>✦ Cash on Delivery Available</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
