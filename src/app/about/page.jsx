import Link from "next/link";
import Navbar from "../components/Navbar/Navbar";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#100D11] px-5 py-14 text-[#F1E8EB] sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#E8C96A]">
            Our Story
          </p>
          <h1 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
            Curated with <span className="italic text-[#E8C96A]">purpose.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-sm leading-8 text-[#C5B6BC] sm:text-base">
            ShopSphere began as Velvety Thorns — a small edit of pieces chosen
            for character rather than volume. Today the store brings together
            fashion, trusted electronics, fine jewellery, fragrance and watches
            under one roof, while keeping the same principle: every product must
            earn its place.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              {
                title: "Considered selection",
                body: "We stock fewer, better pieces across five collections so choosing is simpler.",
              },
              {
                title: "Cash on delivery",
                body: "Order with confidence across Pakistan and pay when your parcel arrives.",
              },
              {
                title: "Real support",
                body: "Questions about sizing, stock or delivery are answered by a real person.",
              },
            ].map((value) => (
              <div
                key={value.title}
                className="border border-[#B89542]/20 bg-[#19141A] p-6"
              >
                <h2 className="font-serif text-xl text-[#E8C96A]">{value.title}</h2>
                <p className="mt-3 text-xs leading-6 text-[#B8AEB6]">{value.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 border border-[#B89542]/20 bg-[#19141A] p-7 sm:p-10">
            <p className="font-serif text-2xl leading-relaxed text-[#F1E8EB] sm:text-3xl">
              “Distinctive details, timeless elegance, and pieces chosen to
              stand apart.”
            </p>
            <p className="mt-5 text-[10px] uppercase tracking-[0.25em] text-[#7D7079]">
              The ShopSphere promise
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/shop"
              className="border border-[#E8C96A] bg-[#E8C96A] px-7 py-3.5 text-[10px] uppercase tracking-[0.2em] text-[#100D11] transition hover:bg-transparent hover:text-[#E8C96A]"
            >
              Shop the collections
            </Link>
            <Link
              href="/contact"
              className="border border-[#B89542]/40 px-7 py-3.5 text-[10px] uppercase tracking-[0.2em] text-[#B8AEB6] transition hover:border-[#E8C96A] hover:text-[#E8C96A]"
            >
              Contact us
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
