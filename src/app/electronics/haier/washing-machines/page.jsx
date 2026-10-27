import Link from "next/link";
const washingMachines = [
  {
    id: "1",
    name: "Haier Automatic Washing Machine",
    image: "/haier-washing-machine-1.jfif",
    price: "Rs. 64,999",
  },
  {
    id: "2",
    name: "Haier Fully Automatic Washer",
    image: "/haier-washing-machine-2.jfif",
    price: "Rs. 69,999",
  },
  {
    id: "3",
    name: "Haier Smart Washing Machine",
    image: "/haier-washing-machine-3.jfif",
    price: "Rs. 74,999",
  },
  {
    id: "4",
    name: "Haier Premium Washing Machine",
    image: "/haier-washing-machine-4.jfif",
    price: "Rs. 79,999",
  },
  {
    id: "5",
    name: "Haier Front Load Washing Machine",
    image: "/haier-washing-machine-5.jfif",
    price: "Rs. 89,999",
  },
  {
    id: "6",
    name: "Haier Advanced Washing Machine",
    image: "/haier-washing-machine-6.jfif",
    price: "Rs. 94,999",
  },
];
export default function WashingMachines() {
  return (
    <main className="min-h-screen bg-[#100D11] text-[#F1E8EB] px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <Link
            href="/electronics/haier"
            className="text-[#E8C96A] hover:text-[#F1E8EB] transition"
          >
            ← Back to Haier
          </Link>
          <Link
            href="/"
            className="text-[#B8AEB6] hover:text-[#E8C96A] transition"
          >
            Home
          </Link>
        </div>
        <div className="text-center mb-14">
          <p className="text-[#B89542] uppercase tracking-[0.3em] text-sm mb-3">
            Haier Collection
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold">
            Washing Machines
          </h1>
          <p className="text-[#B8AEB6] mt-4">
            Explore our Haier washing machine collection.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {washingMachines.map((product) => (
            <Link
              key={product.id}
              href={`/electronics/haier/washing-machines/${product.id}`}
              className="group"
            >
              <div className="bg-[#151116] border border-[#B89542]/30 rounded-2xl overflow-hidden hover:border-[#E8C96A] transition duration-300">
                <div className="h-72 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
                <div className="p-5">
                  <p className="text-[#B89542] text-sm mb-2">
                    HAIER
                  </p>
                  <h2 className="text-xl font-semibold">
                    {product.name}
                  </h2>
                  <p className="text-[#E8C96A] text-lg mt-4">
                    {product.price}
                  </p>
                  <p className="text-[#B8AEB6] text-sm mt-3">
                    View Product →
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}