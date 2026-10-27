"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import AddToCartButton from "../../../../components/AddToCartButton";

const products = [
  {
    id: "1",
    name: "Apple iPhone",
    price: "$999",
    image: "/apple-phone1.jfif",
    description: "Premium Apple smartphone with powerful performance and elegant design.",
  },
  {
    id: "2",
    name: "Apple iPhone Pro",
    price: "$1,199",
    image: "/apple-phone2.jfif",
    description: "Advanced Apple smartphone with a premium display and powerful camera system.",
  },
  {
    id: "3",
    name: "Apple MacBook",
    price: "$1,499",
    image: "/apple-laptop-1.jfif",
    description: "Powerful Apple laptop designed for productivity, creativity, and everyday work.",
  },
];

export default function ApplePhoneDetail() {
  const { id } = useParams();

  const product = products.find((item) => item.id === id);

  if (!product) {
    return (
      <main className="min-h-screen bg-[#100D11] text-[#F1E8EB] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#E8C96A] mb-6">
            Product Not Found
          </h1>

          <Link
            href="/electronics/apple/phones"
            className="text-[#B89542] hover:text-[#E8C96A]"
          >
            ← Back to Phones
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#100D11] text-[#F1E8EB] px-6 py-12">
      <div className="max-w-6xl mx-auto">

        <Link
          href="/electronics/apple/phones"
          className="inline-block mb-10 text-[#B89542] hover:text-[#E8C96A] transition"
        >
          ← Back to Phones
        </Link>

        <div className="flex flex-col md:flex-row gap-12 items-center border border-[#B89542] rounded-2xl p-8 bg-[#171318]">

          <div className="w-full md:w-1/2">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[450px] object-cover rounded-xl"
            />
          </div>

          <div className="w-full md:w-1/2">
            <p className="text-[#B89542] uppercase tracking-widest mb-3">
              Apple
            </p>

            <h1 className="text-4xl font-bold text-[#E8C96A] mb-6">
              {product.name}
            </h1>

            <p className="text-[#B8AEB6] text-lg leading-8 mb-8">
              {product.description}
            </p>

            <p className="text-3xl font-bold mb-8">
              {product.price}
            </p>

            <AddToCartButton product={product} className="px-8 py-4 border border-[#B89542] text-[#E8C96A] rounded-lg hover:bg-[#E8C96A] hover:text-[#100D11] transition duration-300" />
          </div>

        </div>
      </div>
    </main>
  );
}