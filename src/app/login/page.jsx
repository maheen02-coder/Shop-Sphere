"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "../components/Navbar/Navbar";
import { useAuth } from "../../context/AuthContext";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/account";
  const { user, loading, login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      router.replace(redirect);
    }
  }, [loading, user, redirect, router]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(email.trim(), password);
      router.replace(redirect);
    } catch (err) {
      setError(err.message || "Unable to sign in.");
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
        Welcome Back
      </p>
      <h1 className="mt-3 font-serif text-4xl">Sign in</h1>
      <p className="mt-3 text-xs leading-6 text-[#B8AEB6]">
        Access your orders, wishlist and saved details.
      </p>

      <label className="mt-7 block">
        <span className="text-[10px] uppercase tracking-[0.2em] text-[#B8AEB6]">
          Email
        </span>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          autoComplete="email"
          className="mt-2 w-full border border-[#B89542]/40 bg-[#100D11] px-4 py-3 text-sm outline-none focus:border-[#E8C96A]"
        />
      </label>
      <label className="mt-4 block">
        <span className="text-[10px] uppercase tracking-[0.2em] text-[#B8AEB6]">
          Password
        </span>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          autoComplete="current-password"
          className="mt-2 w-full border border-[#B89542]/40 bg-[#100D11] px-4 py-3 text-sm outline-none focus:border-[#E8C96A]"
        />
      </label>

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
        {submitting ? "Signing in…" : "Sign in"}
      </button>

      <p className="mt-6 text-center text-xs text-[#B8AEB6]">
        New to ShopSphere?{" "}
        <Link
          href={`/register?redirect=${encodeURIComponent(redirect)}`}
          className="text-[#E8C96A] underline underline-offset-4"
        >
          Create an account
        </Link>
      </p>
      <div className="mt-5 border-t border-[#B89542]/15 pt-4 text-center text-[10px] leading-5 text-[#7D7079]">
        Demo account: demo@shopsphere.com / Demo@123
      </div>
    </form>
  );
}

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen items-center justify-center bg-[#100D11] px-5 py-14 text-[#F1E8EB]">
        <Suspense
          fallback={
            <div className="h-96 w-full max-w-md animate-pulse border border-[#B89542]/15 bg-[#19141A]" />
          }
        >
          <LoginForm />
        </Suspense>
      </main>
    </>
  );
}
