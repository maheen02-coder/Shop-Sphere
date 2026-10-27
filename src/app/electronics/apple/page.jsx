import Link from "next/link";

export default function Apple() {
  return (
    <main className="min-h-screen bg-[#100D11] text-[#F1E8EB] px-6 py-12">
      <div className="max-w-6xl mx-auto">

        <Link
          href="/electronics"
          className="inline-block mb-10 text-[#B89542] hover:text-[#E8C96A] transition"
        >
          ← Back to Electronics
        </Link>

        <div className="text-center mb-14">
          <h1 className="text-5xl font-bold text-[#E8C96A] mb-4">
            Apple
          </h1>

          <p className="text-[#B8AEB6] text-lg">
            Explore Apple devices and accessories
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8">

          <Link
            href="/electronics/apple/phones"
            className="w-[320px] border border-[#B89542] rounded-2xl overflow-hidden bg-[#171318] hover:-translate-y-2 transition duration-300"
          >
            <img
              src="/apple-phone1.jfif"
              alt="Apple Phones"
              className="w-full h-[260px] object-cover"
            />

            <div className="p-6 text-center">
              <h2 className="text-2xl font-semibold text-[#E8C96A]">
                Phones
              </h2>

              <p className="text-[#B8AEB6] mt-2">
                Explore Apple phones and devices
              </p>
            </div>
          </Link>

          <Link
            href="/electronics/apple/watches"
            className="w-[320px] border border-[#B89542] rounded-2xl overflow-hidden bg-[#171318] hover:-translate-y-2 transition duration-300"
          >
            <img
              src="/apple-watch-1.jfif"
              alt="Apple Watches"
              className="w-full h-[260px] object-cover"
            />

            <div className="p-6 text-center">
              <h2 className="text-2xl font-semibold text-[#E8C96A]">
                Watches
              </h2>

              <p className="text-[#B8AEB6] mt-2">
                Explore Apple Watch collection
              </p>
            </div>
          </Link>

        </div>

        <div className="text-center mt-14">
          <Link
            href="/"
            className="text-[#B89542] hover:text-[#E8C96A] transition"
          >
            ← Back to Home
          </Link>
        </div>

      </div>
    </main>
  );
}