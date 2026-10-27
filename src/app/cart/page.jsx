"use client";

import Link from "next/link";
import Navbar from "../components/Navbar/Navbar";
import { useCart } from "../../context/CartContext";
import { formatPrice } from "../../lib/format";

export default function CartPage() {
  const {
    items,
    hydrated,
    updateQuantity,
    removeItem,
    subtotal,
    shipping,
    total,
  } = useCart();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#100D11] px-5 py-12 text-[#F1E8EB] sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#E8C96A]">
            Your Selection
          </p>
          <h1 className="mt-4 font-serif text-4xl sm:text-5xl">
            Shopping <span className="italic text-[#E8C96A]">Bag</span>
          </h1>

          {!hydrated ? (
            <div className="mt-10 h-64 animate-pulse border border-[#B89542]/15 bg-[#19141A]" />
          ) : items.length === 0 ? (
            <div className="mt-12 border border-[#B89542]/20 bg-[#19141A] px-6 py-16 text-center">
              <p className="font-serif text-3xl text-[#E8C96A]">
                Your bag is empty
              </p>
              <p className="mt-4 text-sm text-[#B8AEB6]">
                Explore the collections and find something distinctive.
              </p>
              <Link
                href="/shop"
                className="mt-8 inline-flex border border-[#B89542] px-7 py-3.5 text-[10px] uppercase tracking-[0.2em] text-[#E8C96A] transition hover:bg-[#E8C96A] hover:text-[#100D11]"
              >
                Start shopping
              </Link>
            </div>
          ) : (
            <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1.7fr_1fr]">
              <section className="border border-[#B89542]/20 bg-[#19141A]">
                <div className="hidden grid-cols-[2fr_1fr_1fr_auto] gap-4 border-b border-[#B89542]/20 px-5 py-4 text-[9px] uppercase tracking-[0.22em] text-[#7D7079] sm:grid">
                  <span>Product</span>
                  <span>Quantity</span>
                  <span className="text-right">Total</span>
                  <span />
                </div>
                {items.map((item) => (
                  <div
                    key={`${item.id}-${item.size}-${item.color}`}
                    className="grid grid-cols-1 gap-5 border-b border-[#B89542]/10 px-5 py-5 last:border-b-0 sm:grid-cols-[2fr_1fr_1fr_auto] sm:items-center"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-24 w-20 shrink-0 object-cover"
                      />
                      <div>
                        <p className="font-serif text-lg leading-snug">
                          {item.name}
                        </p>
                        <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-[#B9AAB1]">
                          {[item.size, item.color].filter(Boolean).join(" · ") ||
                            "Standard"}
                        </p>
                        <p className="mt-2 text-sm text-[#E8C96A]">
                          {formatPrice(item.price)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center border border-[#B89542]/40 sm:w-fit">
                      <button
                        onClick={() => updateQuantity(item, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="px-3 py-1.5 text-[#E8C96A] transition hover:bg-[#2A2225] disabled:opacity-30"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="min-w-8 text-center text-sm">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item, item.quantity + 1)}
                        disabled={item.stock ? item.quantity >= item.stock : false}
                        className="px-3 py-1.5 text-[#E8C96A] transition hover:bg-[#2A2225] disabled:opacity-30"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-sm text-[#F1E8EB] sm:text-right">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                    <button
                      onClick={() => removeItem(item)}
                      className="justify-self-start text-[10px] uppercase tracking-[0.18em] text-[#B9AAB1] transition hover:text-[#E2A0A0] sm:justify-self-end"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </section>

              <aside className="h-fit border border-[#B89542]/25 bg-[#19141A] p-6">
                <h2 className="font-serif text-2xl">Order Summary</h2>
                <div className="mt-5 space-y-3 text-sm text-[#C5B6BC]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-[#F1E8EB]">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-[#F1E8EB]">
                      {shipping === 0 ? "Free" : formatPrice(shipping)}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-[10px] leading-5 text-[#9DBF9E]">
                      Add {formatPrice(5000 - subtotal)} more for free delivery.
                    </p>
                  )}
                  <div className="mt-4 flex justify-between border-t border-[#B89542]/25 pt-4 text-base">
                    <span className="uppercase tracking-[0.15em] text-[#E8C96A]">
                      Total
                    </span>
                    <span className="text-[#E8C96A]">{formatPrice(total)}</span>
                  </div>
                </div>
                <Link
                  href="/checkout"
                  className="mt-6 flex w-full items-center justify-center border border-[#E8C96A] bg-[#E8C96A] px-6 py-4 text-[10px] uppercase tracking-[0.2em] text-[#100D11] transition hover:bg-transparent hover:text-[#E8C96A]"
                >
                  Proceed to checkout
                </Link>
                <Link
                  href="/shop"
                  className="mt-3 flex w-full items-center justify-center border border-[#B89542]/40 px-6 py-3.5 text-[10px] uppercase tracking-[0.2em] text-[#B8AEB6] transition hover:border-[#E8C96A] hover:text-[#E8C96A]"
                >
                  Continue shopping
                </Link>
                <p className="mt-5 text-center text-[10px] leading-5 text-[#7D7079]">
                  Cash on Delivery available across Pakistan.
                </p>
              </aside>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
