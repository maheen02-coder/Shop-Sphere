"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "../components/Navbar/Navbar";
import { useAuth } from "../../context/AuthContext";

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/account";
  const { user, loading, register } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      router.replace(redirect);
    }
  }, [loading, user, redirect, router]);

  const update = (field) => (event) =>
    setForm((current) => ({ ...current, [field]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setSubmitting(true);
    try {
      await register({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        password: form.password,
      });
      router.replace(redirect);
    } catch (err) {
      setError(err.message || "Unable to create your account.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md border border-[#B89542]/25 bg-[#19141A] p-7 sm:p-9"
    >
      <p className="text-[10px] uppercase tracking-[0.4em] text-[#E8C96A]">
        Join ShopSphere
      </p>
      <h1 className="mt-3 font-serif text-4xl">Create account</h1>
      <p className="mt-3 text-xs leading-6 text-[#B8AEB6]">
        Track orders, save favourites and check out faster.
      </p>

      {[
        ["name", "Full name", "text", "name"],
        ["email", "Email", "email", "email"],
        ["phone", "Phone (optional)", "tel", "tel"],
        ["password", "Password", "password", "new-password"],
        ["confirmPassword", "Confirm password", "password", "new-password"],
      ].map(([field, label, type, autoComplete]) => (
        <label key={field} className="mt-4 block">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#B8AEB6]">
            {label}
          </span>
          <input
            type={type}
            value={form[field]}
            onChange={update(field)}
            required={field !== "phone"}
            autoComplete={autoComplete}
            className="mt-2 w-full border border-[#B89542]/40 bg-[#100D11] px-4 py-3 text-sm outline-none focus:border-[#E8C96A]"
          />
        </label>
      ))}

      {error && (
        <p className="mt-4 border border-[#E2A0A0]/40 bg-[#2A181C] px-3 py-2 text-xs text-[#F2C4C4]">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="mt-6 w-full border border-[#E8C96A] bg-[#E8C96A] px-6 py-3.5 text-[10px] uppercase tracking-[0.2em] text-[#100D11] transition hover:bg-transparent hover:text-[#E8C96A] disabled:opacity-50"
      >
        {submitting ? "Creating account…" : "Create account"}
      </button>

      <p className="mt-6 text-center text-xs text-[#B8AEB6]">
        Already have an account?{" "}
        <Link
          href={`/login?redirect=${encodeURIComponent(redirect)}`}
          className="text-[#E8C96A] underline underline-offset-4"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}

export default function RegisterPage() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen items-center justify-center bg-[#100D11] px-5 py-14 text-[#F1E8EB]">
        <Suspense
          fallback={
            <div className="h-[34rem] w-full max-w-md animate-pulse border border-[#B89542]/15 bg-[#19141A]" />
          }
        >
          <RegisterForm />
        </Suspense>
      </main>
    </>
  );
}
