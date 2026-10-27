import Link from "next/link";

export default function SamsungPage() {
  const categories = [
    {
      name: "TVs",
      image: "/samsung-tv-1.jfif",
      link: "/electronics/samsung/tvs",
      description: "Explore Samsung's premium television collection.",
    },
    {
      name: "Phones",
      image: "/samsung-phone-1.jfif",
      link: "/electronics/samsung/phones",
      description: "Discover Samsung smartphones built for everyday life.",
    },
    {
      name: "Watches",
      image: "/samsung-watch-1.jfif",
      link: "/electronics/samsung/watches",
      description: "Explore Samsung smartwatches and wearable technology.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#100D11] text-[#F1E8EB] px-6 py-12">
      <div className="max-w-7xl mx-auto">

        <Link
          href="/electronics"
          className="inline-block mb-10 text-[#E8C96A] hover:text-[#F1E8EB] transition"
        >
          ← Back to Electronics
        </Link>

        <div className="text-center mb-14">
          <p className="text-[#B89542] uppercase tracking-[0.3em] text-sm mb-3">
            Electronics
          </p>

          <h1 className="text-5xl font-semibold tracking-wide">
            Samsung
          </h1>

          <p className="text-[#B8AEB6] mt-4 max-w-2xl mx-auto">
            Explore Samsung's collection of premium electronics and smart
            technology.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.link}
              className="group"
            >
              <div className="bg-[#151116] border border-[#B89542]/30 rounded-2xl overflow-hidden hover:border-[#E8C96A] transition duration-300">

                <div className="h-80 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>

                <div className="p-6 text-center">

                  <p className="text-[#B89542] text-sm uppercase tracking-[0.2em] mb-2">
                    Samsung
                  </p>

                  <h2 className="text-2xl font-semibold">
                    {category.name}
                  </h2>

                  <p className="text-[#B8AEB6] mt-3">
                    {category.description}
                  </p>

                  <span className="inline-block mt-5 text-[#E8C96A]">
                    Explore Collection →
                  </span>

                </div>

              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link
            href="/"
            className="text-[#B8AEB6] hover:text-[#E8C96A] transition"
          >
            ← Back to Home
          </Link>
        </div>

      </div>
    </main>
  );
}