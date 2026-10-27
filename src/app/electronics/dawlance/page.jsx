import Link from "next/link";

export default function DawlancePage() {
  return (
    <main className="min-h-screen bg-[#100D11] text-[#F1E8EB] px-6 py-20">

      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-16">
          <p className="text-[#B89542] uppercase tracking-[0.4em] text-sm mb-4">
            Premium Collection
          </p>

          <h1 className="text-5xl md:text-6xl font-serif text-[#F1E8EB]">
            Dawlance
          </h1>

          <div className="w-20 h-[1px] bg-[#B89542] mx-auto mt-6"></div>

          <p className="text-gray-400 mt-6 max-w-xl mx-auto">
            Discover refined home appliances crafted for modern living.
          </p>
        </div>

        <div className="flex justify-center">

          <Link href="/electronics/dawlance/refrigerators">

            <div className="group w-[330px] bg-[#151116] border border-[#B89542]/40 rounded-sm overflow-hidden transition-all duration-500 hover:border-[#E8C96A] hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(184,149,66,0.15)]">

              <div className="relative h-[300px] overflow-hidden">

                <img
                  src="/dawlance-fridgs.jpg"
                  alt="Dawlance Refrigerators"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#100D11] via-transparent to-transparent"></div>

                <div className="absolute top-5 left-5">
                  <span className="text-[10px] tracking-[0.3em] uppercase text-[#E8C96A] border border-[#E8C96A]/50 px-3 py-2 bg-[#100D11]/70">
                    Dawlance
                  </span>
                </div>

              </div>

              <div className="px-7 py-7 text-center">

                <h2 className="text-2xl font-serif text-[#F1E8EB]">
                  Refrigerators
                </h2>

                <p className="text-sm text-gray-500 mt-3">
                  Elegant cooling solutions for your home
                </p>

                <div className="mt-6 inline-flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[#E8C96A]">
                  Explore Collection
                  <span className="transition-transform duration-300 group-hover:translate-x-2">
                    →
                  </span>
                </div>

              </div>

            </div>

          </Link>

        </div>

      </div>

    </main>
  );
}