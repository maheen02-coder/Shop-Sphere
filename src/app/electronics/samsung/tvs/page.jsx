import Link from "next/link";

const tvs = [
  {
    id: "1",
    name: "Samsung Crystal UHD 4K Smart TV",
    image: "/samsung-tv-1.jfif",
    price: "Rs. 129,999",
  },
  {
    id: "2",
    name: "Samsung QLED 4K Smart TV",
    image: "/samsung-tv-2.jfif",
    price: "Rs. 189,999",
  },
  {
    id: "3",
    name: "Samsung Neo QLED Smart TV",
    image: "/samsung-tv-3.jfif",
    price: "Rs. 249,999",
  },
  {
    id: "4",
    name: "Samsung Premium 4K Smart TV",
    image: "/samsung-tv-4.jfif",
    price: "Rs. 299,999",
  },
];

export default function SamsungTVs() {
  return (
    <main className="min-h-screen bg-[#100D11] text-[#F1E8EB] px-6 py-12">
      <div className="max-w-7xl mx-auto">

        <div className="flex justify-between items-center mb-12">
          <Link
            href="/electronics/samsung"
            className="text-[#E8C96A] hover:text-[#F1E8EB] transition"
          >
            ← Back to Samsung
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
            Samsung Collection
          </p>

          <h1 className="text-4xl md:text-5xl font-semibold">
            Samsung TVs
          </h1>

          <p className="text-[#B8AEB6] mt-4">
            Explore Samsung's premium television collection.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {tvs.map((product) => (
            <Link
              key={product.id}
              href={`/electronics/samsung/tvs/${product.id}`}
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
                    SAMSUNG
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