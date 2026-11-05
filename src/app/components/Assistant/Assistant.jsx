"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { apiFetch } from "../../../lib/api";
import { formatPrice } from "../../../lib/format";
import LogoMark from "../LogoMark";

const CATEGORY_RULES = [
  {
    category: "Fragrances",
    terms: ["fragrance", "fragrances", "perfume", "perfumes", "scent", "scents"],
  },
  {
    category: "Watches",
    terms: ["watch", "watches", "timepiece", "timepieces", "smartwatch"],
  },
  {
    category: "Electronics",
    terms: [
      "electronics",
      "electronic",
      "appliance",
      "appliances",
      "fridge",
      "refrigerator",
      "ac",
      "tv",
      "phone",
      "laptop",
      "microwave",
      "stove",
    ],
  },
  {
    category: "Jewelry",
    terms: [
      "jewelry",
      "jewellery",
      "ring",
      "rings",
      "necklace",
      "necklaces",
    ],
  },
  {
    category: "Fashion",
    terms: ["fashion", "clothing", "clothes", "apparel", "shirt", "dress", "shalwar", "kameez"],
  },
];

const GENERIC_TERMS = new Set(CATEGORY_RULES.flatMap((rule) => rule.terms));

const STOP_WORDS = new Set([
  "show", "me", "find", "i", "im", "want", "need", "please", "the", "a", "an",
  "for", "with", "some", "looking", "look", "get", "buy", "under", "below",
  "less", "than", "up", "to", "over", "above", "more", "between", "and", "or",
  "best", "top", "rated", "cheapest", "cheap", "affordable", "expensive",
  "premium", "luxury", "newest", "new", "latest", "price", "rs", "pkr", "k",
  "have", "do", "you", "what", "which", "are", "is", "my", "can", "would",
  "like", "about", "of", "in", "on", "any", "all", "budget", "maximum",
  "minimum", "item", "items", "product", "products",
]);

const SUGGESTIONS = [
  "Perfumes under Rs. 10,000",
  "Best watches",
  "Gold rings",
  "How does delivery work?",
];

const WELCOME = {
  role: "assistant",
  text:
    "Hi, I'm the ShopSphere concierge. Tell me a category, a budget, or a product you're looking for and I'll search the live catalogue.",
};

const amount = (raw, multiplier) => {
  const value = Number(String(raw).replace(/,/g, ""));
  if (!Number.isFinite(value)) return null;
  return value * (multiplier ? 1000 : 1);
};

function parseFilters(message) {
  const lower = message.toLowerCase();

  let category = null;
  for (const rule of CATEGORY_RULES) {
    if (rule.terms.some((term) => new RegExp(`\\b${term}\\b`).test(lower))) {
      category = rule.category;
      break;
    }
  }

  let minPrice;
  let maxPrice;
  const range = lower.match(
    /(?:between\s+)?([\d,]+)\s*(k)?\s*(?:and|to|-)\s*([\d,]+)\s*(k)?/
  );
  const below = lower.match(
    /(?:under|below|less than|up to|upto|max(?:imum)?|within)\s*(?:rs\.?\s*|pkr\s*)?([\d,]+)\s*(k)?/
  );
  const above = lower.match(
    /(?:over|above|more than|min(?:imum)?|from)\s*(?:rs\.?\s*|pkr\s*)?([\d,]+)\s*(k)?/
  );

  if (range) {
    minPrice = amount(range[1], range[2]);
    maxPrice = amount(range[3], range[4]);
  } else if (below) {
    maxPrice = amount(below[1], below[2]);
  } else if (above) {
    minPrice = amount(above[1], above[2]);
  }

  let sortBy = "newest";
  if (/\b(cheapest|affordable|lowest)\b/.test(lower)) sortBy = "price-asc";
  else if (/\b(expensive|premium|luxury|highest)\b/.test(lower)) sortBy = "price-desc";
  else if (/\b(best|top|rated|rating)\b/.test(lower)) sortBy = "rating";

  const tokens = lower
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((token) => token && !/^\d+k?$/.test(token))
    .filter((token) => !GENERIC_TERMS.has(token))
    .filter((token) => !STOP_WORDS.has(token));

  return {
    category,
    minPrice,
    maxPrice,
    sortBy,
    keyword: tokens.join(" ").trim(),
  };
}

function toQuery(filters) {
  const params = new URLSearchParams({ limit: "4", sortBy: filters.sortBy });
  if (filters.category) params.set("category", filters.category);
  if (filters.keyword) params.set("keyword", filters.keyword);
  if (filters.minPrice !== undefined) params.set("minPrice", String(filters.minPrice));
  if (filters.maxPrice !== undefined) params.set("maxPrice", String(filters.maxPrice));
  return params.toString();
}

async function searchProducts(filters) {
  return apiFetch(`/products?${toQuery(filters)}`, { cacheMs: 30_000 });
}

async function answer(message) {
  const lower = message.toLowerCase();

  if (/^(hi|hello|hey|salam|assalam)/.test(lower)) {
    return {
      role: "assistant",
      text:
        "Hello. I can search Fragrances, Watches, Fashion, Electronics and Jewelry by name, category or budget. What are you shopping for?",
    };
  }

  if (/\b(delivery|shipping)\b/.test(lower)) {
    return {
      role: "assistant",
      text:
        "Delivery is free on orders over Rs. 5,000; smaller orders have a Rs. 200 shipping fee. You can review it at checkout.",
    };
  }

  if (/\b(return|refund)\b/.test(lower)) {
    return {
      role: "assistant",
      text:
        "I can help with catalogue questions, but returns and refunds need our support team. Please use the Contact page and include your order number.",
    };
  }

  if (/\b(help|what can you do|how do you work)\b/.test(lower)) {
    return {
      role: "assistant",
      text:
        "Ask me things like “perfumes under Rs. 10,000”, “best watches”, “gold rings” or “black dresses”, and I'll search the live ShopSphere catalogue.",
    };
  }

  const filters = parseFilters(message);

  let data;
  try {
    data = await searchProducts(filters);

    // Natural-language phrases rarely match product names exactly. Retry with
    // the strongest words, then relax the keyword while keeping category/budget.
    if (!(data?.products || []).length && filters.keyword) {
      const words = [
        ...new Set(filters.keyword.split(/\s+/).filter(Boolean)),
      ].sort((a, b) => b.length - a.length);

      for (const word of words.slice(0, 2)) {
        const singular = word.length > 3 ? word.replace(/s$/, "") : word;
        data = await searchProducts({ ...filters, keyword: singular });
        if ((data?.products || []).length) break;
      }
    }

    if (!(data?.products || []).length && filters.keyword) {
      data = await searchProducts({ ...filters, keyword: "" });
    }
  } catch {
    return {
      role: "assistant",
      text:
        "I can't reach the ShopSphere catalogue right now. Please try again in a moment.",
    };
  }

  const products = data?.products || [];
  if (products.length === 0) {
    return {
      role: "assistant",
      text:
        "I couldn't find a matching product. Try a category such as Fragrances, Watches, Fashion, Electronics or Jewelry, or a budget like “under Rs. 5,000”.",
    };
  }

  const label = filters.category ? filters.category.toLowerCase() : "products";
  const total = data.totalCount || products.length;
  const budget = filters.maxPrice ? ` under ${formatPrice(filters.maxPrice)}` : "";

  return {
    role: "assistant",
    text:
      total > products.length
        ? `I found ${total} ${label}${budget}. Here are the closest matches:`
        : `Here ${products.length === 1 ? "is" : "are"} ${products.length} ${label}${budget}:`,
    products,
  };
}

export default function Assistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState([WELCOME]);
  const inputRef = useRef(null);
  const endRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    if (open) endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, open, busy]);

  const send = async (raw) => {
    const text = raw.trim().slice(0, 300);
    if (!text || busy) return;

    setMessages((current) => [...current, { role: "user", text }]);
    setInput("");
    setBusy(true);

    try {
      const reply = await answer(text);
      setMessages((current) => [...current, reply]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          text: "Something went wrong while searching. Please try again.",
        },
      ]);
    } finally {
      setBusy(false);
      inputRef.current?.focus();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    send(input);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? "Close ShopSphere assistant" : "Open ShopSphere assistant"}
        aria-expanded={open}
        aria-controls="shopsphere-assistant"
        className="fixed bottom-5 right-5 z-[60] flex h-14 w-14 items-center justify-center rounded-full border border-[#E8C96A]/70 bg-[#B89542] text-[#100D11] shadow-[0_12px_40px_rgba(0,0,0,0.45)] transition duration-300 hover:scale-105 hover:bg-[#E8C96A]"
      >
        {open ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeWidth="1.8" d="m6 6 12 12M18 6 6 18" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.7"
              d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7a2.5 2.5 0 0 1-2.5 2.5H10l-5 4v-4H6.5A2.5 2.5 0 0 1 4 13.5v-7Z"
            />
            <path strokeLinecap="round" strokeWidth="1.7" d="M8.5 9h7M8.5 12h4" />
          </svg>
        )}
      </button>

      {open && (
        <section
          id="shopsphere-assistant"
          role="dialog"
          aria-label="ShopSphere shopping assistant"
          className="fixed bottom-24 right-5 z-[60] flex h-[520px] max-h-[72vh] w-[calc(100vw-2.5rem)] max-w-[380px] flex-col border border-[#B89542]/40 bg-[#151017] text-[#F1E8EB] shadow-[0_24px_70px_rgba(0,0,0,0.55)]"
        >
          <header className="flex items-center gap-3 border-b border-[#B89542]/25 px-4 py-3">
            <LogoMark className="h-9 w-9 shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="font-serif text-lg leading-tight text-[#E8C96A]">
                ShopSphere Concierge
              </p>
              <p className="text-[9px] uppercase tracking-[0.22em] text-[#B8AEB6]">
                Live catalogue assistant
              </p>
            </div>
          </header>

          <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={message.role === "user" ? "flex justify-end" : "flex justify-start"}
              >
                <div
                  className={
                    message.role === "user"
                      ? "max-w-[85%] bg-[#E8C96A] px-3 py-2 text-sm leading-6 text-[#100D11]"
                      : "max-w-[92%] bg-[#1E1820] px-3 py-2 text-sm leading-6 text-[#E7DDE1]"
                  }
                >
                  <p>{message.text}</p>
                  {message.products?.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {message.products.map((product) => (
                        <Link
                          key={product._id}
                          href={`/shop/${product._id}`}
                          className="flex gap-3 border border-[#B89542]/25 bg-[#100D11] p-2 transition hover:border-[#E8C96A]/60"
                        >
                          <Image
                            src={product.image}
                            alt={product.name}
                            width={56}
                            height={56}
                            sizes="56px"
                            className="h-14 w-14 shrink-0 object-cover"
                          />
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-xs text-[#F1E8EB]">
                              {product.name}
                            </span>
                            <span className="mt-1 block text-[10px] uppercase tracking-[0.14em] text-[#B8AEB6]">
                              {product.brand}
                            </span>
                            <span className="mt-1 block text-xs text-[#E8C96A]">
                              {formatPrice(product.salePrice || product.price)}
                            </span>
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {busy && (
              <div className="flex justify-start">
                <div className="bg-[#1E1820] px-3 py-2 text-xs text-[#B8AEB6]">
                  Searching the catalogue…
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {messages.length === 1 && (
            <div className="flex flex-wrap gap-2 border-t border-[#B89542]/15 px-4 py-3">
              {SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => send(suggestion)}
                  className="border border-[#B89542]/35 px-2.5 py-1.5 text-left text-[10px] leading-4 text-[#C5B6BC] transition hover:border-[#E8C96A] hover:text-[#E8C96A]"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 border-t border-[#B89542]/25 p-3"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              maxLength={300}
              placeholder="Ask about products or budgets…"
              aria-label="Message the ShopSphere assistant"
              className="min-w-0 flex-1 border border-[#B89542]/35 bg-[#100D11] px-3 py-2 text-sm text-[#F1E8EB] outline-none placeholder:text-[#7D7079] focus:border-[#E8C96A]"
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              className="shrink-0 border border-[#B89542] bg-[#B89542] px-3 py-2 text-[10px] uppercase tracking-[0.16em] text-[#100D11] transition hover:bg-[#E8C96A] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Send
            </button>
          </form>
        </section>
      )}
    </>
  );
}
