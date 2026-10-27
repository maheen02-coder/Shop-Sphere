"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import AddToCartButton from "../../../../components/AddToCartButton";
const washingMachines = [
  {
    id: "1",
    name: "Haier Automatic Washing Machine",
    image: "/haier-washing-machine-1.jfif",
    price: "Rs. 64,999",
    description:
      "A reliable Haier washing machine designed for convenient everyday laundry.",
  },
  {
    id: "2",
    name: "Haier Fully Automatic Washer",
    image: "/haier-washing-machine-2.jfif",
    price: "Rs. 69,999",
    description:
      "A practical fully automatic washing machine designed for modern homes.",
  },
  {
    id: "3",
    name: "Haier Smart Washing Machine",
    image: "/haier-washing-machine-3.jfif",
    price: "Rs. 74,999",
    description:
      "A modern Haier washing machine offering convenient washing performance.",
  },
  {
    id: "4",
    name: "Haier Premium Washing Machine",
    image: "/haier-washing-machine-4.jfif",
    price: "Rs. 79,999",
    description:
      "A premium washing machine built for efficient and comfortable everyday use.",
  },
  {
    id: "5",
    name: "Haier Front Load Washing Machine",
    image: "/haier-washing-machine-5.jfif",
    price: "Rs. 89,999",
    description:
      "A stylish front-load washing machine designed for efficient laundry care.",
  },
  {
    id: "6",
    name: "Haier Advanced Washing Machine",
    image: "/haier-washing-machine-6.jfif",
    price: "Rs. 94,999",
    description:
      "An advanced Haier washing machine designed for a modern laundry experience.",
  },
];
export default function WashingMachineDetails() {
  const { id } = useParams();
  const product = washingMachines.find((item) => item.id === id);
  if (!product) {
    return (
      <main className="min-h-screen bg-[#100D11] text-[#F1E8EB] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-semibold">
            Product Not Found
          </h1>

          <Link
            href="/electronics/haier/washing-machines"
            className="inline-block mt-6 text-[#E8C96A]"
          >
            ← Back to Washing Machines
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
            href="/electronics/haier/washing-machines"
            className="text-[#E8C96A] hover:text-[#F1E8EB] transition"
          >
            ← Back to Washing Machines
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
              Haier
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
                href="/electronics/haier/washing-machines"
                className="text-[#B8AEB6] hover:text-[#E8C96A] transition"
              >
                View All Washing Machines →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}