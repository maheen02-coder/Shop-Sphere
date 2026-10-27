"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar/Navbar";
import ProductCard from "../components/ProductCard";
import { apiFetch } from "../../lib/api";

const SORT_OPTIONS = [
  { value: "newest", label: "Newest arrivals" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "rating", label: "Top rated" },
  { value: "name-asc", label: "Name: A to Z" },
];

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [meta, setMeta] = useState({ totalCount: 0, totalPages: 0, currentPage: 1 });
  const [keyword, setKeyword] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    apiFetch("/products/categories")
      .then((data) => setCategories(data.categories || []))
      .catch(() => setCategories([]));
  }, []);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({ page: String(page), limit: "12", sortBy });
      if (searchTerm.trim()) params.set("keyword", searchTerm.trim());
      if (category !== "All") params.set("category", category);
      const data = await apiFetch(`/products?${params.toString()}`);
      setProducts(data.products || []);
      setMeta({
        totalCount: data.totalCount || 0,
        totalPages: data.totalPages || 0,
        currentPage: data.currentPage || 1,
      });
    } catch (err) {
      setError(err.message || "Unable to load products.");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [category, page, searchTerm, sortBy]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const submitSearch = (event) => {
    event.preventDefault();
    setPage(1);
    setSearchTerm(keyword);
  };

  const chooseCategory = (name) => {
    setCategory(name);
    setPage(1);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#100D11] px-5 py-12 text-[#F1E8EB] sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1400px]">
          <div className="border-b border-[#B89542]/25 pb-9">
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#E8C96A]">
              The ShopSphere Edit
            </p>
            <div className="mt-4 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div>
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl">
                  Shop <span className="italic text-[#E8C96A]">Everything</span>
                </h1>
                <p className="mt-4 max-w-xl text-sm leading-7 text-[#C5B6BC]">
                  Fashion, electronics, fine jewellery, fragrances and watches —
                  curated in one place.
                </p>
              </div>
              <form onSubmit={submitSearch} className="flex w-full max-w-md">
                <input
                  type="search"
                  value={keyword}
                  onChange={(event) => setKeyword(event.target.value)}
                  placeholder="Search products, brands, categories"
                  className="w-full border border-[#B89542]/40 bg-[#19141A] px-4 py-3 text-sm text-[#F1E8EB] outline-none placeholder:text-[#7D7079] focus:border-[#E8C96A]"
                />
                <button
                  type="submit"
                  className="shrink-0 border border-l-0 border-[#B89542] bg-[#B89542] px-5 text-[10px] uppercase tracking-[0.2em] text-[#100D11] transition hover:bg-[#E8C96A]"
                >
                  Search
                </button>
              </form>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-5 border-b border-[#B89542]/15 pb-7 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              {["All", ...categories.map((item) => item.name)].map((name) => (
                <button
                  key={name}
                  onClick={() => chooseCategory(name)}
                  className={`border px-4 py-2 text-[10px] uppercase tracking-[0.16em] transition ${
                    category === name
                      ? "border-[#E8C96A] bg-[#E8C96A] text-[#100D11]"
                      : "border-[#B89542]/30 text-[#C5B6BC] hover:border-[#E8C96A] hover:text-[#E8C96A]"
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#7D7079]">
                Sort
              </span>
              <select
                value={sortBy}
                onChange={(event) => {
                  setSortBy(event.target.value);
                  setPage(1);
                }}
                className="border border-[#B89542]/40 bg-[#19141A] px-3 py-2 text-xs text-[#E8C96A] outline-none focus:border-[#E8C96A]"
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-7 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-[#7D7079]">
            <span>
              {loading ? "Loading catalogue…" : `${meta.totalCount} products`}
              {searchTerm ? ` · “${searchTerm}”` : ""}
              {category !== "All" ? ` · ${category}` : ""}
            </span>
            <Link href="/collections" className="text-[#E8C96A] hover:text-[#F5DFA0]">
              Browse collections ↗
            </Link>
          </div>

          {error && (
            <div className="mt-8 border border-[#E2A0A0]/40 bg-[#2A181C] px-5 py-4 text-sm text-[#F2C4C4]">
              {error}. Make sure the ShopSphere API is running on port 5000.
              <button
                onClick={loadProducts}
                className="ml-3 underline underline-offset-4 hover:text-white"
              >
                Retry
              </button>
            </div>
          )}

          {loading ? (
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="h-[470px] animate-pulse border border-[#B89542]/15 bg-[#19141A]"
                />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="mt-16 border border-[#B89542]/20 bg-[#19141A] px-6 py-16 text-center">
              <h2 className="font-serif text-3xl">No products found</h2>
              <p className="mt-3 text-sm text-[#B9AAB1]">
                Try a different search or category.
              </p>
              <button
                onClick={() => {
                  setKeyword("");
                  setSearchTerm("");
                  setCategory("All");
                  setPage(1);
                }}
                className="mt-7 border border-[#B89542] px-6 py-3 text-[10px] uppercase tracking-[0.2em] text-[#E8C96A] transition hover:bg-[#E8C96A] hover:text-[#100D11]"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}

          {meta.totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-4">
              <button
                onClick={() => setPage((current) => Math.max(1, current - 1))}
                disabled={meta.currentPage <= 1}
                className="border border-[#B89542]/40 px-5 py-2.5 text-[10px] uppercase tracking-[0.18em] text-[#E8C96A] transition hover:border-[#E8C96A] disabled:cursor-not-allowed disabled:opacity-30"
              >
                ← Previous
              </button>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#B9AAB1]">
                Page {meta.currentPage} of {meta.totalPages}
              </span>
              <button
                onClick={() =>
                  setPage((current) => Math.min(meta.totalPages, current + 1))
                }
                disabled={meta.currentPage >= meta.totalPages}
                className="border border-[#B89542]/40 px-5 py-2.5 text-[10px] uppercase tracking-[0.18em] text-[#E8C96A] transition hover:border-[#E8C96A] disabled:cursor-not-allowed disabled:opacity-30"
              >
                Next →
              </button>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
