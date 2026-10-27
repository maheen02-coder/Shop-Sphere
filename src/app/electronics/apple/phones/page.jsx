import Link from "next/link";

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

export default function ApplePhones() {
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
            Apple Phones
          </h1>

          <p className="text-[#B8AEB6] text-lg">
            Explore our Apple devices collection
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/electronics/apple/phones/${product.id}`}
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

                <p className="text-xl font-bold text-[#F1E8EB]">
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