"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import AddToCartButton from "../../../../components/AddToCartButton";
const stoves = [
  {
    id: "1",
    name: "Kenwood Stove 01",
    image: "/kenwood-stoove-1.jfif",
    price: "Rs. 39,999",
    description:
      "Explore this Kenwood stove for your kitchen. A practical choice for everyday cooking and modern living.",
  },
  {
    id: "2",
    name: "Kenwood Stove 02",
    image: "/kenwood-stoove-2.jfif",
    price: "Rs. 44,999",
    description:
      "Discover another Kenwood stove design for your kitchen and everyday cooking needs.",
  },
  {
    id: "3",
    name: "Kenwood Stove 03",
    image: "/kenwood-stoove-3.jfif",
    price: "Rs. 49,999",
    description:
      "A Kenwood stove option for customers looking for practical kitchen appliances.",
  },
  {
    id: "4",
    name: "Kenwood Stove 04",
    image: "/kenwood-stoove-4.jfif",
    price: "Rs. 54,999",
    description:
      "Explore this Kenwood stove design as part of the ShopSphere kitchen collection.",
  },
  {
    id: "5",
    name: "Kenwood Stove 05",
    image: "/kenwood-stoove-5.jfif",
    price: "Rs. 59,999",
    description:
      "Discover the fifth stove in our Kenwood collection at ShopSphere.",
  },
];

export default function StoveDetails() {
  const { id } = useParams();
  const product = stoves.find((item) => item.id === id);
  if (!product) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#100D11] px-5 text-[#F1E8EB]">
        <div className="text-center">
          <h1 className="text-4xl font-light">
            Product Not Found<span className="text-[#E8C96A]">.</span>
          </h1>
          <Link
            href="/electronics/kenwood/stoves"
            className="mt-6 inline-block border border-[#B89542]/40 px-5 py-3 text-xs uppercase tracking-[0.2em] text-[#B8AEB6] hover:border-[#E8C96A] hover:text-[#E8C96A]"
          >
            ← Back to Stoves
          </Link>
        </div>
      </main>
    );
  }
  return (
    <main className="min-h-screen bg-[#100D11] px-5 py-12 text-[#F1E8EB] sm:px-8 lg:px-16">
      <section className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-wrap gap-3">
          <Link
            href="/electronics/kenwood/stoves"
            className="border border-[#B89542]/30 px-5 py-3 text-xs uppercase tracking-[0.2em] text-[#B8AEB6] transition-all duration-300 hover:border-[#E8C96A] hover:bg-[#E8C96A] hover:text-[#100D11]"
          >
            ← Back to Stoves
          </Link>
          <Link
            href="/"
            className="border border-[#B89542]/30 px-5 py-3 text-xs uppercase tracking-[0.2em] text-[#B8AEB6] transition-all duration-300 hover:border-[#E8C96A] hover:bg-[#E8C96A] hover:text-[#100D11]"
          >
            Home
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative overflow-hidden border border-[#B89542]/20 bg-[#181419]">
            <div className="absolute left-5 top-5 z-10 flex h-10 w-10 items-center justify-center border border-[#E8C96A]/50 bg-[#100D11]/80 text-xs text-[#E8C96A]">
              0{product.id}
            </div>
            <div className="aspect-square p-8 sm:p-12">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-contain"
              />
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-[#E8C96A]">
              ShopSphere / Kenwood / Stoves
            </p>
            <h1 className="mt-5 text-4xl font-light tracking-tight sm:text-6xl">
              {product.name}
              <span className="text-[#E8C96A]">.</span>
            </h1>
            <p className="mt-6 text-2xl text-[#E8C96A]">
              {product.price}
            </p>
            <div className="my-8 h-px w-full bg-[#B89542]/25" />
            <p className="max-w-xl text-sm leading-8 text-[#B8AEB6] sm:text-base">
              {product.description}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <AddToCartButton product={product} className="border border-[#E8C96A] bg-[#E8C96A] px-7 py-4 text-xs uppercase tracking-[0.2em] text-[#100D11] transition-all duration-300 hover:bg-transparent hover:text-[#E8C96A]" />
              <Link
                href="/electronics/kenwood/stoves"
                className="border border-[#B89542]/40 px-7 py-4 text-xs uppercase tracking-[0.2em] text-[#B8AEB6] transition-all duration-300 hover:border-[#E8C96A] hover:text-[#E8C96A]"
              >
                View All
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-20 border-t border-[#B89542]/30 pt-6 text-center">
          <p className="text-[10px] uppercase tracking-[0.35em] text-[#B8AEB6]">
            SHOPSPHERE — Kenwood Stoves
          </p>
        </div>
      </section>
    </main>
  );
}
