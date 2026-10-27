"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useCart } from "../../../../../context/CartContext";

const rings = [
  {
    id: "301",
    name: "Royal Signet Ring",
    price: 4500,
    image: "/men-ring2.jfif",
    tag: "BESTSELLER",
    material: "Gold-plated brass with onyx seal",
    description: "An imposing signet ring with heritage inspiration, sculpted with weight and prestige.",
  },
  {
    id: "302",
    name: "Classic Gold Ring",
    price: 5200,
    image: "/men-ring2.jfif",
    tag: "TIMELESS",
    material: "Polished Gold-tone alloy",
    description: "A minimal band with subtle bevelled edges, designed for effortless everyday distinction.",
  },
  {
    id: "303",
    name: "Modern Statement Ring",
    price: 6000,
    image: "/men-ring2.jfif",
    tag: "SIGNATURE",
    material: "Textured Dark Rhodium & Gold accent",
    description: "Architectural geometric lines and contrasting metallic tones define this signature statement ring.",
  },
  {
    id: "304",
    name: "Minimal Silver Ring",
    price: 3800,
    image: "/men-ring2.jfif",
    tag: "ESSENTIAL",
    material: "Brushed 925 Sterling Silver tone",
    description: "Clean, restrained, and timeless. The essential minimal ring for understated elegance.",
  },
];

export default function MensRingDetail() {
  const params = useParams();
  const id = params?.id;
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("9");
  const [message, setMessage] = useState("");
  const { addItem } = useCart();

  const ring = rings.find((item) => item.id === id);

  const handleAddToCart = () => {
    if (!ring) return;
    addItem(
      {
        id: `j-ring-${ring.id}`,
        name: ring.name,
        price: ring.price,
        image: ring.image,
      },
      { quantity, size: selectedSize }
    );
    setMessage("Ring added to your shopping bag.");
  };

  if (!ring) {
    return (
      <main className="min-h-screen bg-[#100D11] text-[#F1E8EB] flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-4xl font-serif text-[#E8C96A] mb-4">Product Not Found</h1>
        <p className="text-[#B8AEB6] mb-8">This piece could not be located in our collection.</p>
        <Link
          href="/jewelry/mens/rings"
          className="border border-[#E8C96A] px-6 py-3 text-xs uppercase tracking-[0.2em] text-[#E8C96A] hover:bg-[#E8C96A] hover:text-[#100D11] transition"
        >
          ← Back to Rings
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#100D11] text-[#F1E8EB] px-5 sm:px-10 lg:px-16 py-12">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/jewelry/mens/rings"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#B8AEB6] hover:text-[#E8C96A] transition mb-10"
        >
          <span>←</span> Back to Rings
        </Link>

        <div className="flex flex-col md:flex-row gap-12 items-center border border-[#B89542]/30 bg-[#171318] p-6 sm:p-10 rounded-2xl">
          <div className="w-full md:w-1/2">
            <div className="relative overflow-hidden rounded-xl border border-[#B89542]/20 bg-[#0F0B10]">
              <img
                src={ring.image}
                alt={ring.name}
                className="w-full h-[400px] sm:h-[500px] object-cover"
              />
              <span className="absolute top-4 left-4 border border-[#E8C96A]/50 bg-[#100D11]/85 px-3 py-1.5 text-[9px] tracking-[0.2em] text-[#E8C96A]">
                {ring.tag}
              </span>
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <p className="text-[#B89542] uppercase tracking-[0.3em] text-xs mb-3">
              Men's Signature Collection
            </p>
            <h1 className="text-3xl sm:text-5xl font-serif text-[#F1E8EB] mb-4">
              {ring.name}
            </h1>
            <p className="text-2xl font-bold text-[#E8C96A] mb-6">
              Rs. {ring.price.toLocaleString("en-PK")}
            </p>

            <div className="border-t border-b border-[#B89542]/20 py-5 mb-6">
              <p className="text-[#B8AEB6] leading-8 text-sm sm:text-base">
                {ring.description}
              </p>
              <p className="text-xs text-[#E8C96A] mt-3 tracking-wide">
                Material: {ring.material}
              </p>
            </div>

            <div className="mb-6">
              <span className="text-xs uppercase tracking-widest text-[#B8AEB6] block mb-3">
                Ring Size (US)
              </span>
              <div className="flex gap-2">
                {["8", "9", "10", "11", "12"].map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`h-10 w-10 border text-xs font-semibold transition ${
                      selectedSize === size
                        ? "border-[#E8C96A] bg-[#E8C96A] text-[#100D11]"
                        : "border-[#B89542]/30 text-[#F1E8EB] hover:border-[#E8C96A]"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
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
          </div>
        </div>
      </div>
    </main>
  );
}
