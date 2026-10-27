import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCartButton from "../../../../components/AddToCartButton";
const refrigerators = [
  {
    id: 1,
    name: "Dawlance Refrigerator 1",
    price: "Rs. 129,999",
    category: "Double Door",
    image: "/dawlence-fridge-1.jfif",
    description:
      "A premium Dawlance refrigerator designed for modern homes with efficient cooling, spacious storage and an elegant appearance.",
  },
  {
    id: 2,
    name: "Dawlance Refrigerator 2",
    price: "Rs. 139,999",
    category: "Double Door",
    image: "/dawlence-fridge-2.jfif",
    description:
      "A stylish Dawlance refrigerator offering reliable cooling and practical storage for everyday use.",
  },
  {
    id: 3,
    name: "Dawlance Refrigerator 3",
    price: "Rs. 149,999",
    category: "Top Mount",
    image: "/dawlence-fridge-3.jfif",
    description:
      "A modern top-mount refrigerator combining spacious storage with efficient cooling.",
  },
  {
    id: 4,
    name: "Dawlance Refrigerator 4",
    price: "Rs. 159,999",
    category: "Top Mount",
    image: "/dawlence-fridge-4.jfif",
    description:
      "A refined Dawlance refrigerator built for convenient storage and everyday performance.",
  },
  {
    id: 5,
    name: "Dawlance Refrigerator 5",
    price: "Rs. 169,999",
    category: "Side by Side",
    image: "/dawlence-fridge-5.jfif",
    description:
      "A spacious side-by-side refrigerator with a premium appearance and generous storage.",
  },
  {
    id: 6,
    name: "Dawlance Refrigerator 6",
    price: "Rs. 179,999",
    category: "Side by Side",
    image: "/dawlence-fridge-6.jfif",
    description:
      "A premium refrigerator designed to provide convenient organization and dependable cooling.",
  },
  {
    id: 7,
    name: "Dawlance Refrigerator 7",
    price: "Rs. 189,999",
    category: "French Door",
    image: "/dawlence-fridge-7.jfif",
    description:
      "An elegant French-door refrigerator offering spacious and sophisticated storage.",
  },
  {
    id: 8,
    name: "Dawlance Refrigerator 8",
    price: "Rs. 199,999",
    category: "French Door",
    image: "/dawlence-fridge-8.jfif",
    description:
      "A premium French-door refrigerator combining modern styling with practical functionality.",
  },
];
export default async function ProductDetailsPage({ params }) {
  const { id } = await params;
  const product = refrigerators.find(
    (item) => item.id === Number(id)
  );
  if (!product) {
    notFound();
  }
  return (
    <main className="min-h-screen bg-[#100D11] text-[#F1E8EB] px-5 md:px-10 py-20">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/electronics/dawlance/refrigerators"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#B89542] hover:text-[#E8C96A] transition"
        >
          ← Back to Refrigerators
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 mt-12 items-center">
          <div className="relative group">
            <div className="absolute -inset-3 border border-[#B89542]/20"></div>
            <div className="relative h-[500px] bg-[#151116] overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#100D11]/70 via-transparent to-transparent"></div>
              <div className="absolute top-5 left-5">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#E8C96A] border border-[#E8C96A]/50 bg-[#100D11]/80 px-4 py-2">
                  Dawlance
                </span>
              </div>
            </div>
          </div>
          <div>
            <p className="text-[#B89542] uppercase tracking-[0.4em] text-xs mb-5">
              {product.category}
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight">
              {product.name}
            </h1>
            <div className="w-20 h-[1px] bg-[#B89542] mt-7"></div>
            <p className="text-[#E8C96A] text-2xl mt-8">
              {product.price}
            </p>
            <p className="text-gray-400 leading-8 mt-7">
              {product.description}
            </p>
            <div className="mt-8 border-t border-[#B89542]/20 pt-7">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">
                  Brand
                </span>
                <span className="text-[#F1E8EB]">
                  Dawlance
                </span>
              </div>
              <div className="flex items-center justify-between text-sm mt-4">
                <span className="text-gray-500">
                  Category
                </span>
                <span className="text-[#F1E8EB]">
                  {product.category}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm mt-4">
                <span className="text-gray-500">
                  Product ID
                </span>
                <span className="text-[#F1E8EB]">
                  #{product.id}
                </span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <AddToCartButton product={product} className="flex-1 bg-[#E8C96A] text-[#100D11] py-4 text-xs uppercase tracking-[0.25em] font-medium hover:bg-[#F1D98B] transition" />
              <button className="flex-1 border border-[#B89542] text-[#E8C96A] py-4 text-xs uppercase tracking-[0.25em] hover:bg-[#E8C96A] hover:text-[#100D11] transition">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
