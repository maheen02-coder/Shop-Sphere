"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Navbar from "../../components/Navbar/Navbar";
import { useCart } from "../../../context/CartContext";
import { useAuth } from "../../../context/AuthContext";
import { apiFetch } from "../../../lib/api";
import { formatPrice } from "../../../lib/format";

export default function ShopProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addItem } = useCart();
  const { user, loading: authLoading } = useAuth();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const [wishlisted, setWishlisted] = useState(false);
  const [wishlistBusy, setWishlistBusy] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    apiFetch(`/products/${id}`)
      .then((data) => {
        if (!active) return;
        setProduct(data.product);
        setSize(data.product.sizes?.[0] || "");
        setColor(data.product.colors?.[0] || "");
      })
      .catch((err) => active && setError(err.message || "Product not found."))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [id]);

  useEffect(() => {
    if (!user) return;
    apiFetch("/users/wishlist")
      .then((data) => {
        setWishlisted(
          (data.wishlist || []).some((item) => item._id === product?._id)
        );
      })
      .catch(() => {});
  }, [user, product?._id]);

  const handleAdd = () => {
    if (!product) return;
    const stock = Number(product.stock) || 0;
    if (stock <= 0) {
      setMessage("This product is currently out of stock.");
      return;
    }
    if (product.sizes?.length > 0 && !size) {
      setMessage("Please select a size.");
      return;
    }
    if (product.colors?.length > 0 && !color) {
      setMessage("Please select a colour.");
      return;
    }
    addItem(
      {
        id: product._id,
        name: product.name,
        image: product.image,
        price: product.salePrice || product.price,
        stock: product.stock,
      },
      { quantity, size, color }
    );
    setMessage("Added to your shopping bag.");
  };

  const toggleWishlist = async () => {
    if (!user) {
      router.push(`/login?redirect=/shop/${id}`);
      return;
    }
    setWishlistBusy(true);
    try {
      if (wishlisted) {
        await apiFetch(`/users/wishlist/${product._id}`, { method: "DELETE" });
        setWishlisted(false);
        setMessage("Removed from your wishlist.");
      } else {
        await apiFetch(`/users/wishlist/${product._id}`, { method: "POST" });
        setWishlisted(true);
        setMessage("Saved to your wishlist.");
      }
    } catch (err) {
      setMessage(err.message || "Unable to update wishlist.");
    } finally {
      setWishlistBusy(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#100D11] px-5 py-12 text-[#F1E8EB] sm:px-8 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/shop"
            className="inline-flex text-[10px] uppercase tracking-[0.22em] text-[#B8AEB6] transition hover:text-[#E8C96A]"
          >
            ← Back to shop
          </Link>

          {loading ? (
            <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2">
              <div className="h-[520px] animate-pulse border border-[#B89542]/15 bg-[#19141A]" />
              <div className="space-y-4">
                <div className="h-4 w-32 animate-pulse bg-[#19141A]" />
                <div className="h-12 w-3/4 animate-pulse bg-[#19141A]" />
                <div className="h-6 w-40 animate-pulse bg-[#19141A]" />
                <div className="h-32 animate-pulse bg-[#19141A]" />
              </div>
            </div>
          ) : error || !product ? (
            <div className="mt-16 border border-[#B89542]/20 bg-[#19141A] px-6 py-16 text-center">
              <h1 className="font-serif text-4xl text-[#E8C96A]">
                Product not found
              </h1>
              <p className="mt-4 text-sm text-[#B8AEB6]">
                {error || "This product is no longer available."}
              </p>
              <Link
                href="/shop"
                className="mt-8 inline-flex border border-[#B89542] px-6 py-3 text-[10px] uppercase tracking-[0.2em] text-[#E8C96A] transition hover:bg-[#E8C96A] hover:text-[#100D11]"
              >
                Browse the shop
              </Link>
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
              <div className="relative overflow-hidden border border-[#B89542]/25 bg-[#181419]">
                {product.label && (
                  <span className="absolute left-5 top-5 z-10 border border-[#E8C96A]/50 bg-[#100D11]/80 px-3 py-1.5 text-[9px] tracking-[0.2em] text-[#E8C96A]">
                    {product.label}
                  </span>
                )}
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-[420px] w-full object-cover sm:h-[560px]"
                />
              </div>

              <div className="flex flex-col justify-center">
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#E8C96A]">
                  {product.brand}
                  {product.subCategory ? ` / ${product.subCategory}` : ""}
                  {product.collectionType ? ` / ${product.collectionType}` : ""}
                </p>
                <h1 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
                  {product.name}
                </h1>
                <div className="mt-5 flex flex-wrap items-center gap-4">
                  <span className="text-2xl text-[#E8C96A]">
                    {formatPrice(product.salePrice || product.price)}
                  </span>
                  {product.stock > 0 ? (
                    <span className="text-[10px] uppercase tracking-[0.18em] text-[#9DBF9E]">
                      In stock · {product.stock} available
                    </span>
                  ) : (
                    <span className="text-[10px] uppercase tracking-[0.18em] text-[#E2A0A0]">
                      Out of stock
                    </span>
                  )}
                </div>

                <p className="mt-7 text-sm leading-8 text-[#B8AEB6] sm:text-base">
                  {product.description}
                </p>

                {product.material && (
                  <p className="mt-5 text-xs text-[#B8AEB6]">
                    <span className="uppercase tracking-[0.2em] text-[#E8C96A]">
                      Material:
                    </span>{" "}
                    {product.material}
                  </p>
                )}
                {product.care && (
                  <p className="mt-2 text-xs text-[#B8AEB6]">
                    <span className="uppercase tracking-[0.2em] text-[#E8C96A]">
                      Care:
                    </span>{" "}
                    {product.care}
                  </p>
                )}

                {product.sizes?.length > 0 && (
                  <div className="mt-7">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-[#B8AEB6]">
                      Select size
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {product.sizes.map((option) => (
                        <button
                          key={option}
                          onClick={() => setSize(option)}
                          className={`border px-4 py-2 text-xs transition ${
                            size === option
                              ? "border-[#E8C96A] bg-[#E8C96A] text-[#100D11]"
                              : "border-[#B89542]/40 text-[#C5B6BC] hover:border-[#E8C96A] hover:text-[#E8C96A]"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {product.colors?.length > 0 && (
                  <div className="mt-5">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-[#B8AEB6]">
                      Colour
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {product.colors.map((option) => (
                        <button
                          key={option}
                          onClick={() => setColor(option)}
                          className={`border px-4 py-2 text-xs transition ${
                            color === option
                              ? "border-[#E8C96A] bg-[#E8C96A] text-[#100D11]"
                              : "border-[#B89542]/40 text-[#C5B6BC] hover:border-[#E8C96A] hover:text-[#E8C96A]"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-7 flex items-center gap-4">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#B8AEB6]">
                    Quantity
                  </span>
                  <div className="flex items-center border border-[#B89542]/50">
                    <button
                      onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                      className="px-4 py-2 text-[#E8C96A] hover:bg-[#2A2225]"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="min-w-8 px-2 text-center text-sm">{quantity}</span>
                    <button
                      onClick={() =>
                        setQuantity((value) =>
                          Math.min(product.stock || 99, value + 1)
                        )
                      }
                      className="px-4 py-2 text-[#E8C96A] hover:bg-[#2A2225]"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    onClick={handleAdd}
                    disabled={product.stock === 0}
                    className="border border-[#E8C96A] bg-[#E8C96A] px-8 py-4 text-[10px] uppercase tracking-[0.2em] text-[#100D11] transition hover:bg-transparent hover:text-[#E8C96A] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Add to shopping bag
                  </button>
                  <button
                    onClick={toggleWishlist}
                    disabled={wishlistBusy || authLoading}
                    className={`border px-6 py-4 text-[10px] uppercase tracking-[0.2em] transition disabled:opacity-50 ${
                      wishlisted
                        ? "border-[#E8C96A] text-[#E8C96A]"
                        : "border-[#B89542]/40 text-[#B8AEB6] hover:border-[#E8C96A] hover:text-[#E8C96A]"
                    }`}
                  >
                    {wishlisted ? "♥ Saved" : "♡ Save for later"}
                  </button>
                  <Link
                    href="/cart"
                    className="border border-[#B89542]/40 px-6 py-4 text-[10px] uppercase tracking-[0.2em] text-[#B8AEB6] transition hover:border-[#E8C96A] hover:text-[#E8C96A]"
                  >
                    View bag
                  </Link>
                </div>

                {message && (
                  <p className="mt-5 border border-[#B89542]/30 bg-[#19141A] px-4 py-3 text-xs text-[#E8C96A]">
                    {message}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
