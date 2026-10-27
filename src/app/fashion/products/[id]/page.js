"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { products } from "../../data/product";
import { useCart } from "../../../../context/CartContext";
export default function ProductDetailsPage() {
  const params = useParams();
  const product = products.find(
    (item) => item.id === Number(params.id)
  );
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [message, setMessage] = useState("");
  const { addItem } = useCart();
  const addToCart = () => {
    if (!selectedSize || !selectedColor) {
      setMessage("Please select a size and color.");
      return;
    }
    addItem(
      {
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
      },
      { quantity: 1, size: selectedSize, color: selectedColor }
    );
    setMessage("Product added to cart successfully.");
  };
  if (!product) {
    return (
      <main className="min-h-screen bg-[#100D11] text-white flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-4xl font-serif text-[#E8C96A]">
          Product Not Found
        </h1>
        <p className="mt-4 text-gray-400">
          This product could not be found in the collection.
        </p>
        <Link
          href="/fashion"
          className="mt-8 border border-[#E8C96A] px-6 py-3 text-[#E8C96A] transition hover:bg-[#E8C96A] hover:text-black"
        >
          Back to Collections
        </Link>
      </main>
    );
  }
  return (
    <main className="min-h-screen bg-[#100D11] px-5 py-10 text-white md:px-12 lg:px-20 lg:py-14">
      <Link
        href="/fashion"
        className="inline-block text-sm text-[#E8C96A] transition hover:text-white"
      >
        ← Back to Collections
      </Link>
      <div className="mx-auto mt-8 flex max-w-6xl flex-col gap-10 md:flex-row lg:gap-16">
        <div className="w-full md:w-1/2">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#19151B]">
            <img
              src={product.image}
              alt={product.name}
              className="h-[420px] w-full object-cover object-center md:h-[600px]"
            />
          </div>
          {product.label && (
            <span className="mt-5 inline-block border border-[#E8C96A]/40 px-4 py-2 text-xs tracking-[3px] text-[#E8C96A]">
              {product.label}
            </span>
          )}
        </div>
        <div className="flex w-full flex-col justify-center md:w-1/2">
          <p className="text-xs uppercase tracking-[5px] text-[#E8C96A]">
            {product.collection || "Collection"} / {product.category}
          </p>
          <h1 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">
            {product.name}
          </h1>
          <p className="mt-5 text-2xl text-[#E8C96A]">
            Rs. {product.price.toLocaleString("en-PK")}
          </p>
          <div className="my-7 h-px bg-white/10" />
          <p className="leading-8 text-gray-300">
            {product.description ||
              "Discover timeless style with this exclusive piece from our collection."}
          </p>
          <div className="mt-7">
            <h2 className="text-sm uppercase tracking-widest text-gray-400">
              Material
            </h2>
            <p className="mt-2">
              {product.material || "Premium quality material"}
            </p>
          </div>
          <div className="mt-7">
            <h2 className="text-sm uppercase tracking-widest text-gray-400">
              Select Size
            </h2>
            <div className="mt-3 flex flex-wrap gap-3">
              {(product.sizes || []).map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => {
                    setSelectedSize(size);
                    setMessage("");
                  }}
                  className={`min-w-12 border px-4 py-3 transition ${
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
            <h2 className="text-sm uppercase tracking-widest text-gray-400">
              Select Color
            </h2>
            <div className="mt-3 flex flex-wrap gap-3">
              {(product.colors || []).map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => {
                    setSelectedColor(color);
                    setMessage("");
                  }}
                  className={`border px-4 py-3 text-sm transition ${
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
            <h2 className="text-sm uppercase tracking-widest text-gray-400">
              Care Instructions
            </h2>
            <p className="mt-2 leading-7 text-gray-300">
              {product.care ||
                "Please follow the care instructions provided with the product."}
            </p>
          </div>
          <button
            type="button"
            disabled={
              !selectedSize ||
              !selectedColor ||
              !(product.sizes || []).length ||
              !(product.colors || []).length
            }
            onClick={addToCart}
            className="mt-10 w-full bg-[#E8C96A] py-4 text-sm font-semibold uppercase tracking-[3px] text-black transition hover:bg-[#F4D98A] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Add to Cart
          </button>
          {message && (
            <p
              aria-live="polite"
              className="mt-4 text-center text-sm text-[#E8C96A]"
            >
              {message}
            </p>
          )}
          <p className="mt-4 text-center text-xs text-gray-500">
            Premium style. Timeless elegance.
          </p>
        </div>
      </div>
    </main>
  );
}