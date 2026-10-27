"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import AddToCartButton from "../../../../components/AddToCartButton";
const tvs = [
  {
    id: "1",
    name: "Samsung Crystal UHD 4K Smart TV",
    image: "/samsung-tv-1.jfif",
    price: "Rs. 129,999",
    description:
      "A Samsung 4K Smart TV designed to deliver sharp visuals and an immersive entertainment experience.",
  },
  {
    id: "2",
    name: "Samsung QLED 4K Smart TV",
    image: "/samsung-tv-2.jfif",
    price: "Rs. 189,999",
    description:
      "A premium Samsung QLED television offering vibrant colors and a modern viewing experience.",
  },
  {
    id: "3",
    name: "Samsung Neo QLED Smart TV",
    image: "/samsung-tv-3.jfif",
    price: "Rs. 249,999",
    description:
      "A premium Neo QLED TV designed for detailed picture quality and immersive entertainment.",
  },
  {
    id: "4",
    name: "Samsung Premium 4K Smart TV",
    image: "/samsung-tv-4.jfif",
    price: "Rs. 299,999",
    description:
      "A high-end Samsung 4K Smart TV combining premium design with an advanced viewing experience.",
  },
];
export default function SamsungTVDetails() {
  const { id } = useParams();
  const product = tvs.find((item) => item.id === id);
  if (!product) {
    return (
      <main className="min-h-screen bg-[#100D11] text-[#F1E8EB] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-semibold">
            Product Not Found
          </h1>
          <Link
            href="/electronics/samsung/tvs"
            className="inline-block mt-6 text-[#E8C96A]"
          >
            ← Back to Samsung TVs
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
            href="/electronics/samsung/tvs"
            className="text-[#E8C96A] hover:text-[#F1E8EB] transition"
          >
            ← Back to Samsung TVs
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
                href="/electronics/samsung/tvs"
                className="text-[#B8AEB6] hover:text-[#E8C96A] transition"
              >
                View All Samsung TVs →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}