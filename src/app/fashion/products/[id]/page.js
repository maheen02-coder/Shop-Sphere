"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { products } from "../../data/product";
export default function ProductDetailsPage() {
  const params = useParams();
  const product = products.find(
    (item) => item.id === Number(params.id)
  );
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  if (!product) {
    return (
      <main className="min-h-screen bg-[#100D11] text-white flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-4xl font-serif text-[#E8C96A]">
          Product Not Found
        </h1>
        <p className="mt-4 text-gray-400">
          Sorry, this product does not exist.
        </p>
        <Link
          href="/fashion/women"
          className="mt-8 border border-[#E8C96A] px-6 py-3 text-[#E8C96A] hover:bg-[#E8C96A] hover:text-black transition"
        >
          Back to Collection
        </Link>
      </main>
    );
  }
  return (
    <main className="min-h-screen bg-[#100D11] text-white px-5 md:px-12 lg:px-20 py-12">
      <Link
        href="/fashion/women"
        className="text-sm text-[#E8C96A] hover:text-white transition"
      >
        ← Back to Collection
      </Link>
      <div className="max-w-6xl mx-auto mt-10 flex flex-col md:flex-row gap-10 lg:gap-16">
        <div className="w-full md:w-1/2">
          <div className="overflow-hidden rounded-2xl border border-white/10">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[420px] md:h-[600px] object-cover object-center"
            />
          </div>
          {product.label && (
            <span className="inline-block mt-5 text-xs tracking-[3px] text-[#E8C96A] border border-[#E8C96A]/40 px-4 py-2">
              {product.label}
            </span>
          )}
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <p className="text-xs tracking-[5px] uppercase text-[#E8C96A]">
            {product.category}
          </p>
          <h1 className="mt-4 text-4xl md:text-5xl font-serif leading-tight">
            {product.name}
          </h1>
          <p className="mt-5 text-2xl text-[#E8C96A]">
            Rs. {product.price.toLocaleString("en-PK")}
          </p>
          <div className="h-px bg-white/10 my-7" />
          <p className="text-gray-300 leading-8">
            {product.description || "Discover timeless elegance with this exclusive piece from our collection."}
          </p>
          <div className="mt-7">
            <h2 className="text-sm tracking-widest uppercase text-gray-400">
              Material
            </h2>
            <p className="mt-2">{product.material || "Premium quality material"}</p>
          </div>
          <div className="mt-7">
            <h2 className="text-sm tracking-widest uppercase text-gray-400">
              Select Size
            </h2>
            <div className="flex flex-wrap gap-3 mt-3">
              {product.sizes?.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`min-w-12 px-4 py-3 border transition ${
                    selectedSize === size
                      ? "border-[#E8C96A] bg-[#E8C96A] text-black"
                      : "border-white/20 text-white hover:border-[#E8C96A]"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-7">
            <h2 className="text-sm tracking-widest uppercase text-gray-400">
              Select Color
            </h2>
            <div className="flex flex-wrap gap-3 mt-3">
              {product.colors?.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-3 border text-sm transition ${
                    selectedColor === color
                      ? "border-[#E8C96A] text-[#E8C96A]"
                      : "border-white/20 text-gray-300 hover:border-[#E8C96A]"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-7">
            <h2 className="text-sm tracking-widest uppercase text-gray-400">
              Care Instructions
            </h2>
            <p className="mt-2 text-gray-300 leading-7">
              {product.care || "Please follow the care instructions provided with the product."}
            </p>
          </div>
          <button
            disabled={!selectedSize || !selectedColor}
            onClick={() =>
              alert(
                `Selected: ${product.name}\nSize: ${selectedSize}\nColor: ${selectedColor}\nPrice: Rs. ${product.price.toLocaleString("en-PK")}`
              )
            }
            className="mt-10 w-full py-4 bg-[#E8C96A] text-black uppercase tracking-[3px] text-sm font-semibold hover:bg-[#F4D98A] transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Add to Cart
          </button>
          <p className="text-xs text-gray-500 mt-4 text-center">
            Premium style. Timeless elegance.
          </p>
        </div>
      </div>
    </main>
  );
}