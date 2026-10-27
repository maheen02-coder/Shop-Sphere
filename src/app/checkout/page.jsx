"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar/Navbar";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { apiFetch } from "../../lib/api";
import { formatPrice } from "../../lib/format";

const emptyAddress = {
  fullName: "",
  phone: "",
  street: "",
  city: "",
  state: "",
  postalCode: "",
  country: "Pakistan",
};

export default function CheckoutPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { items, hydrated, subtotal, shipping, total, clearCart } = useCart();

  const [address, setAddress] = useState(emptyAddress);
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [placedOrder, setPlacedOrder] = useState(null);

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/login?redirect=/checkout");
    }
  }, [authLoading, user, router]);

  useEffect(() => {
    if (!user) return;
    setAddress({
      fullName: user.name || "",
      phone: user.phone || "",
      street: user.address?.street || "",
      city: user.address?.city || "",
      state: user.address?.state || "",
      postalCode: user.address?.postalCode || "",
      country: user.address?.country || "Pakistan",
    });
  }, [user]);

  const updateField = (field) => (event) => {
    setAddress((current) => ({ ...current, [field]: event.target.value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    setError("");

    if (items.length === 0) {
      setError("Your bag is empty.");
      return;
    }

    const required = ["fullName", "phone", "street", "city", "state", "postalCode"];
    const missing = required.find((field) => !address[field].trim());
    if (missing) {
      setError("Please complete all required shipping fields.");
      return;
    }

    setSubmitting(true);
    try {
      const data = await apiFetch("/orders", {
        method: "POST",
        body: {
          orderItems: items.map((item) => ({
            productId: item.id,
            name: item.name,
            image: item.image,
            price: item.price,
            quantity: item.quantity,
            size: item.size,
            color: item.color,
          })),
          shippingAddress: address,
          notes,
        },
      });
      clearCart();
      setPlacedOrder(data.order);
    } catch (err) {
      if (err.status === 401) {
        router.replace("/login?redirect=/checkout");
        return;
      }
      setError(err.message || "Unable to place your order.");
    } finally {
      setSubmitting(false);
    }
  };

  if (placedOrder) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-[#100D11] px-5 py-16 text-[#F1E8EB] sm:px-8">
          <div className="mx-auto max-w-2xl border border-[#B89542]/30 bg-[#19141A] p-8 text-center sm:p-12">
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#E8C96A]">
              Order Confirmed
            </p>
            <h1 className="mt-4 font-serif text-4xl">
              Thank you{user ? `, ${user.name.split(" ")[0]}` : ""}.
            </h1>
            <p className="mt-4 text-sm leading-7 text-[#B8AEB6]">
              Your Cash on Delivery order has been placed. Our team will contact
              you on {placedOrder.shippingAddress.phone} to confirm delivery.
            </p>
            <div className="mt-8 border-y border-[#B89542]/20 py-5 text-left text-sm">
              <div className="flex justify-between py-1">
                <span className="text-[#7D7079]">Order number</span>
                <span className="text-[#E8C96A]">{placedOrder.orderNumber}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#7D7079]">Items</span>
                <span>{placedOrder.orderItems.length}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#7D7079]">Payment</span>
                <span>{placedOrder.paymentMethod}</span>
              </div>
              <div className="flex justify-between py-1 text-base">
                <span className="text-[#7D7079]">Total</span>
                <span className="text-[#E8C96A]">
                  {formatPrice(placedOrder.totalPrice)}
                </span>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/account"
                className="border border-[#E8C96A] bg-[#E8C96A] px-6 py-3.5 text-[10px] uppercase tracking-[0.2em] text-[#100D11] transition hover:bg-transparent hover:text-[#E8C96A]"
              >
                View my orders
              </Link>
              <Link
                href="/shop"
                className="border border-[#B89542]/40 px-6 py-3.5 text-[10px] uppercase tracking-[0.2em] text-[#B8AEB6] transition hover:border-[#E8C96A] hover:text-[#E8C96A]"
              >
                Continue shopping
              </Link>
            </div>
          </div>
        </main>
      </>
    );
  }

  if (authLoading || !hydrated) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-[#100D11] px-5 py-16">
          <div className="mx-auto h-64 max-w-4xl animate-pulse border border-[#B89542]/15 bg-[#19141A]" />
        </main>
      </>
    );
  }

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-[#100D11] px-5 py-16 text-center text-[#F1E8EB]">
          <h1 className="font-serif text-4xl text-[#E8C96A]">Your bag is empty</h1>
          <Link
            href="/shop"
            className="mt-8 inline-flex border border-[#B89542] px-7 py-3.5 text-[10px] uppercase tracking-[0.2em] text-[#E8C96A] transition hover:bg-[#E8C96A] hover:text-[#100D11]"
          >
            Start shopping
          </Link>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#100D11] px-5 py-12 text-[#F1E8EB] sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/cart"
            className="text-[10px] uppercase tracking-[0.2em] text-[#B8AEB6] transition hover:text-[#E8C96A]"
          >
            ← Back to bag
          </Link>
          <h1 className="mt-4 font-serif text-4xl sm:text-5xl">
            Check<span className="italic text-[#E8C96A]">out</span>
          </h1>

          <form
            onSubmit={placeOrder}
            className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1.6fr_1fr]"
          >
            <section className="border border-[#B89542]/25 bg-[#19141A] p-6">
              <h2 className="font-serif text-2xl">Shipping details</h2>
              <p className="mt-2 text-xs text-[#7D7079]">
                All fields are required. Delivery across Pakistan.
              </p>
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="block sm:col-span-2">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#B8AEB6]">
                    Full name
                  </span>
                  <input
                    value={address.fullName}
                    onChange={updateField("fullName")}
                    required
                    className="mt-2 w-full border border-[#B89542]/40 bg-[#100D11] px-4 py-3 text-sm outline-none focus:border-[#E8C96A]"
                  />
                </label>
                <label className="block">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#B8AEB6]">
                    Phone
                  </span>
                  <input
                    value={address.phone}
                    onChange={updateField("phone")}
                    required
                    placeholder="03xx xxxxxxx"
                    className="mt-2 w-full border border-[#B89542]/40 bg-[#100D11] px-4 py-3 text-sm outline-none focus:border-[#E8C96A]"
                  />
                </label>
                <label className="block">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#B8AEB6]">
                    Postal code
                  </span>
                  <input
                    value={address.postalCode}
                    onChange={updateField("postalCode")}
                    required
                    className="mt-2 w-full border border-[#B89542]/40 bg-[#100D11] px-4 py-3 text-sm outline-none focus:border-[#E8C96A]"
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#B8AEB6]">
                    Street address
                  </span>
                  <input
                    value={address.street}
                    onChange={updateField("street")}
                    required
                    className="mt-2 w-full border border-[#B89542]/40 bg-[#100D11] px-4 py-3 text-sm outline-none focus:border-[#E8C96A]"
                  />
                </label>
                <label className="block">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#B8AEB6]">
                    City
                  </span>
                  <input
                    value={address.city}
                    onChange={updateField("city")}
                    required
                    className="mt-2 w-full border border-[#B89542]/40 bg-[#100D11] px-4 py-3 text-sm outline-none focus:border-[#E8C96A]"
                  />
                </label>
                <label className="block">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#B8AEB6]">
                    Province / State
                  </span>
                  <input
                    value={address.state}
                    onChange={updateField("state")}
                    required
                    className="mt-2 w-full border border-[#B89542]/40 bg-[#100D11] px-4 py-3 text-sm outline-none focus:border-[#E8C96A]"
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#B8AEB6]">
                    Order notes (optional)
                  </span>
                  <textarea
                    value={notes}
                    onChange={(event) => setNotes(event.target.value)}
                    rows={3}
                    maxLength={500}
                    className="mt-2 w-full border border-[#B89542]/40 bg-[#100D11] px-4 py-3 text-sm outline-none focus:border-[#E8C96A]"
                  />
                </label>
              </div>

              <div className="mt-6 border border-[#B89542]/20 bg-[#100D11] px-4 py-3 text-xs text-[#B8AEB6]">
                Payment method: <span className="text-[#E8C96A]">Cash on Delivery</span>.
                You will pay when your order arrives.
              </div>
            </section>

            <aside className="h-fit border border-[#B89542]/25 bg-[#19141A] p-6">
              <h2 className="font-serif text-2xl">Your order</h2>
              <div className="mt-5 space-y-4">
                {items.map((item) => (
                  <div
                    key={`${item.id}-${item.size}-${item.color}`}
                    className="flex items-center gap-3"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-16 w-14 object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm">{item.name}</p>
                      <p className="text-[10px] uppercase tracking-[0.14em] text-[#7D7079]">
                        {[item.size, item.color].filter(Boolean).join(" · ") ||
                          "Standard"}{" "}
                        × {item.quantity}
                      </p>
                    </div>
                    <span className="text-xs text-[#E8C96A]">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-6 space-y-2 border-t border-[#B89542]/20 pt-4 text-sm text-[#C5B6BC]">
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
                <div className="flex justify-between border-t border-[#B89542]/20 pt-3 text-base">
                  <span className="uppercase tracking-[0.15em] text-[#E8C96A]">
                    Total
                  </span>
                  <span className="text-[#E8C96A]">{formatPrice(total)}</span>
                </div>
              </div>

              {error && (
                <p className="mt-4 border border-[#E2A0A0]/40 bg-[#2A181C] px-3 py-2 text-xs text-[#F2C4C4]">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="mt-5 w-full border border-[#E8C96A] bg-[#E8C96A] px-6 py-4 text-[10px] uppercase tracking-[0.2em] text-[#100D11] transition hover:bg-transparent hover:text-[#E8C96A] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {submitting ? "Placing order…" : "Place order"}
              </button>
            </aside>
          </form>
        </div>
      </main>
    </>
  );
}
