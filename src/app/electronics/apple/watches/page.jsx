import Link from "next/link";

const products = [
  {
    id: "1",
    name: "Apple Watch Series",
    price: "$399",
    image: "/apple-watch-1.jfif",
    description: "Elegant Apple Watch with smart features and premium design.",
  },
  {
    id: "2",
    name: "Apple Watch Pro",
    price: "$499",
    image: "/apple-watch-2.jfif",
    description: "Advanced Apple Watch built for performance and everyday use.",
  },
  {
    id: "3",
    name: "Apple Watch Ultra",
    price: "$799",
    image: "/apple-watch-3.jfif",
    description: "Premium Apple Watch with a bold design and advanced features.",
  },
  {
    id: "4",
    name: "Apple Watch Edition",
    price: "$599",
    image: "/apple-watch-4.jfif",
    description: "Luxury Apple Watch combining modern technology with elegant style.",
  },
];

export default function AppleWatches() {
  return (
    <main className="min-h-screen bg-[#100D11] text-[#F1E8EB] px-6 py-12">
      <div className="max-w-7xl mx-auto">

        <Link
          href="/electronics/apple"
          className="inline-block mb-10 text-[#B89542] hover:text-[#E8C96A] transition"
        >
          ← Back to Apple
        </Link>

        <div className="text-center mb-14">
          <h1 className="text-5xl font-bold text-[#E8C96A] mb-4">
            Apple Watches
          </h1>

          <p className="text-[#B8AEB6] text-lg">
            Explore our Apple Watch collection
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/electronics/apple/watches/${product.id}`}
              className="w-[320px] border border-[#B89542] rounded-2xl overflow-hidden bg-[#171318] hover:-translate-y-2 transition duration-300"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[280px] object-cover"
              />

              <div className="p-6">
                <h2 className="text-2xl font-semibold text-[#E8C96A] mb-3">
                  {product.name}
                </h2>

                <p className="text-[#B8AEB6] text-sm mb-5">
                  {product.description}
                </p>

                <p className="text-xl font-bold">
                  {product.price}
                </p>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </main>
  );
}