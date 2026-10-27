import Link from "next/link";
export default function HaierPage() {
  return (
    <main className="min-h-screen bg-[#100D11] text-[#F1E8EB] px-6 py-12">
      <div className="max-w-6xl mx-auto">
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
            Haier
          </h1>
          <p className="text-[#B8AEB6] mt-4 max-w-2xl mx-auto">
            Smart and reliable home appliances designed for modern living.
          </p>
        </div>
        <div className="max-w-md mx-auto">
          <Link
            href="/electronics/haier/washing-machines"
            className="group block"
          >
            <div className="border border-[#B89542]/40 rounded-2xl overflow-hidden bg-[#151116] hover:border-[#E8C96A] transition duration-300">
              <div className="h-80 overflow-hidden">
                <img
                  src="/haier-washing-machine-1.jfif"
                  alt="Haier Washing Machines"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="p-6 text-center">
                <p className="text-[#B89542] text-sm uppercase tracking-[0.2em] mb-2">
                  Haier
                </p>
                <h2 className="text-2xl font-semibold">
                  Washing Machines
                </h2>
                <p className="text-[#B8AEB6] mt-3">
                  Explore Haier's modern washing machines.
                </p>
                <span className="inline-block mt-5 text-[#E8C96A]">
                  Explore Collection →
                </span>
              </div>
            </div>
          </Link>
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