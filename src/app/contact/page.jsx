"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar/Navbar";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const update = (field) => (event) =>
    setForm((current) => ({ ...current, [field]: event.target.value }));

  const handleSubmit = (event) => {
    event.preventDefault();
    const subject = encodeURIComponent(form.subject || "ShopSphere enquiry");
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    );
    window.location.href = `mailto:support@shopsphere.pk?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#100D11] px-5 py-14 text-[#F1E8EB] sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#E8C96A]">
              Contact
            </p>
            <h1 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
              Let&apos;s talk <span className="italic text-[#E8C96A]">shop.</span>
            </h1>
            <p className="mt-5 max-w-md text-sm leading-8 text-[#C5B6BC]">
              Questions about an order, a product or delivery? Send a note and
              we will get back to you within one working day.
            </p>

            <div className="mt-9 space-y-5 text-sm">
              <div className="border-l border-[#B89542]/50 pl-5">
                <p className="text-[9px] uppercase tracking-[0.25em] text-[#7D7079]">
                  Email
                </p>
                <a
                  href="mailto:support@shopsphere.pk"
                  className="mt-1 block text-[#E8C96A] hover:underline"
                >
                  support@shopsphere.pk
                </a>
              </div>
              <div className="border-l border-[#B89542]/50 pl-5">
                <p className="text-[9px] uppercase tracking-[0.25em] text-[#7D7079]">
                  Phone / WhatsApp
                </p>
                <a
                  href="tel:+923001234567"
                  className="mt-1 block text-[#E8C96A] hover:underline"
                >
                  +92 300 123 4567
                </a>
              </div>
              <div className="border-l border-[#B89542]/50 pl-5">
                <p className="text-[9px] uppercase tracking-[0.25em] text-[#7D7079]">
                  Hours
                </p>
                <p className="mt-1 text-[#B8AEB6]">Mon–Sat, 10:00–19:00 PKT</p>
              </div>
            </div>

            <div className="mt-9 border border-[#B89542]/20 bg-[#19141A] p-5 text-xs leading-6 text-[#B8AEB6]">
              Looking for order updates? Open{" "}
              <Link href="/account" className="text-[#E8C96A] underline underline-offset-4">
                My Account
              </Link>{" "}
              to see live status and tracking details.
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="h-fit border border-[#B89542]/25 bg-[#19141A] p-6 sm:p-8"
          >
            <h2 className="font-serif text-2xl">Send a message</h2>
            {[
              ["name", "Your name", "text"],
              ["email", "Email", "email"],
              ["subject", "Subject", "text"],
            ].map(([field, label, type]) => (
              <label key={field} className="mt-4 block">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#B8AEB6]">
                  {label}
                </span>
                <input
                  type={type}
                  value={form[field]}
                  onChange={update(field)}
                  required
                  className="mt-2 w-full border border-[#B89542]/40 bg-[#100D11] px-4 py-3 text-sm outline-none focus:border-[#E8C96A]"
                />
              </label>
            ))}
            <label className="mt-4 block">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#B8AEB6]">
                Message
              </span>
              <textarea
                value={form.message}
                onChange={update("message")}
                required
                rows={6}
                className="mt-2 w-full border border-[#B89542]/40 bg-[#100D11] px-4 py-3 text-sm outline-none focus:border-[#E8C96A]"
              />
            </label>
            <button
              type="submit"
              className="mt-5 w-full border border-[#E8C96A] bg-[#E8C96A] px-6 py-3.5 text-[10px] uppercase tracking-[0.2em] text-[#100D11] transition hover:bg-transparent hover:text-[#E8C96A]"
            >
              Open email draft
            </button>
            {sent && (
              <p className="mt-4 border border-[#9DBF9E]/40 bg-[#16201A] px-3 py-2 text-xs text-[#B9D8BA]">
                Your email draft has been opened. Send it from your mail app to
                reach us.
              </p>
            )}
            <p className="mt-4 text-[10px] leading-5 text-[#7D7079]">
              The form opens a pre-filled message in your email app so your note
              reaches us directly.
            </p>
          </form>
        </div>
      </main>
    </>
  );
}
