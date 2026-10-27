"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar/Navbar";
import { useAuth } from "../../context/AuthContext";
import { apiFetch } from "../../lib/api";
import { formatDate, formatPrice } from "../../lib/format";

const STATUS_STYLES = {
  Placed: "text-[#E8C96A] border-[#E8C96A]/40",
  Processing: "text-[#D9B8C0] border-[#D9B8C0]/40",
  Shipped: "text-[#A9C7E8] border-[#A9C7E8]/40",
  Delivered: "text-[#9DBF9E] border-[#9DBF9E]/40",
  Cancelled: "text-[#E2A0A0] border-[#E2A0A0]/40",
};

export default function AccountPage() {
  const router = useRouter();
  const { user, loading: authLoading, logout, updateProfile } = useAuth();

  const [tab, setTab] = useState("orders");
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  const [profile, setProfile] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "Pakistan",
  });
  const [savingProfile, setSavingProfile] = useState(false);
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordBusy, setPasswordBusy] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/login?redirect=/account");
    }
  }, [authLoading, user, router]);

  useEffect(() => {
    if (!user) return;
    setProfile({
      name: user.name || "",
      phone: user.phone || "",
      street: user.address?.street || "",
      city: user.address?.city || "",
      state: user.address?.state || "",
      postalCode: user.address?.postalCode || "",
      country: user.address?.country || "Pakistan",
    });
  }, [user]);

  const loadOrders = async () => {
    setOrdersLoading(true);
    try {
      const data = await apiFetch("/orders/my-orders");
      setOrders(data.orders || []);
    } catch (err) {
      setError(err.message || "Unable to load orders.");
    } finally {
      setOrdersLoading(false);
    }
  };

  useEffect(() => {
    if (user) loadOrders();
  }, [user]);

  const cancelOrder = async (order) => {
    if (!window.confirm(`Cancel order ${order.orderNumber}?`)) return;
    setError("");
    try {
      await apiFetch(`/orders/${order._id}/cancel`, {
        method: "PUT",
        body: { reason: "Cancelled by customer from account page" },
      });
      setNotice(`Order ${order.orderNumber} cancelled.`);
      loadOrders();
    } catch (err) {
      setError(err.message || "Unable to cancel order.");
    }
  };

  const saveProfile = async (event) => {
    event.preventDefault();
    setSavingProfile(true);
    setError("");
    setNotice("");
    try {
      await updateProfile({
        name: profile.name,
        phone: profile.phone,
        address: {
          street: profile.street,
          city: profile.city,
          state: profile.state,
          postalCode: profile.postalCode,
          country: profile.country,
        },
      });
      setNotice("Profile updated.");
    } catch (err) {
      setError(err.message || "Unable to update profile.");
    } finally {
      setSavingProfile(false);
    }
  };

  const changePassword = async (event) => {
    event.preventDefault();
    setError("");
    setNotice("");
    if (passwords.newPassword.length < 6) {
      setError("New password must be at least 6 characters.");
      return;
    }
    if (passwords.newPassword !== passwords.confirmPassword) {
      setError("New passwords do not match.");
      return;
    }
    setPasswordBusy(true);
    try {
      await apiFetch("/auth/change-password", {
        method: "PUT",
        body: {
          currentPassword: passwords.currentPassword,
          newPassword: passwords.newPassword,
        },
      });
      setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setNotice("Password changed.");
    } catch (err) {
      setError(err.message || "Unable to change password.");
    } finally {
      setPasswordBusy(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  if (authLoading || !user) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-[#100D11] px-5 py-16">
          <div className="mx-auto h-72 max-w-5xl animate-pulse border border-[#B89542]/15 bg-[#19141A]" />
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#100D11] px-5 py-12 text-[#F1E8EB] sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col justify-between gap-5 border-b border-[#B89542]/25 pb-7 sm:flex-row sm:items-end">
            <div>
              <p className="text-[10px] uppercase tracking-[0.4em] text-[#E8C96A]">
                My Account
              </p>
              <h1 className="mt-3 font-serif text-4xl sm:text-5xl">
                Hello, {user.name.split(" ")[0]}
              </h1>
              <p className="mt-2 text-xs text-[#7D7079]">{user.email}</p>
            </div>
            <div className="flex items-center gap-3">
              {user.role === "admin" && (
                <Link
                  href="/admin"
                  className="border border-[#B89542]/40 px-5 py-2.5 text-[10px] uppercase tracking-[0.18em] text-[#E8C96A] transition hover:border-[#E8C96A]"
                >
                  Admin
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="border border-[#B89542]/30 px-5 py-2.5 text-[10px] uppercase tracking-[0.18em] text-[#B8AEB6] transition hover:border-[#E2A0A0] hover:text-[#E2A0A0]"
              >
                Sign out
              </button>
            </div>
          </div>

          <div className="mt-7 flex gap-2">
            {[
              ["orders", "Orders"],
              ["profile", "Profile"],
            ].map(([value, label]) => (
              <button
                key={value}
                onClick={() => setTab(value)}
                className={`border px-5 py-2.5 text-[10px] uppercase tracking-[0.18em] transition ${
                  tab === value
                    ? "border-[#E8C96A] bg-[#E8C96A] text-[#100D11]"
                    : "border-[#B89542]/30 text-[#C5B6BC] hover:border-[#E8C96A] hover:text-[#E8C96A]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {notice && (
            <p className="mt-5 border border-[#9DBF9E]/40 bg-[#16201A] px-4 py-3 text-xs text-[#B9D8BA]">
              {notice}
            </p>
          )}
          {error && (
            <p className="mt-5 border border-[#E2A0A0]/40 bg-[#2A181C] px-4 py-3 text-xs text-[#F2C4C4]">
              {error}
            </p>
          )}

          {tab === "orders" ? (
            <section className="mt-6 space-y-5">
              {ordersLoading ? (
                <div className="h-48 animate-pulse border border-[#B89542]/15 bg-[#19141A]" />
              ) : orders.length === 0 ? (
                <div className="border border-[#B89542]/20 bg-[#19141A] px-6 py-14 text-center">
                  <p className="font-serif text-2xl">No orders yet</p>
                  <p className="mt-3 text-sm text-[#B8AEB6]">
                    Your placed orders will appear here.
                  </p>
                  <Link
                    href="/shop"
                    className="mt-6 inline-flex border border-[#B89542] px-6 py-3 text-[10px] uppercase tracking-[0.2em] text-[#E8C96A] transition hover:bg-[#E8C96A] hover:text-[#100D11]"
                  >
                    Shop now
                  </Link>
                </div>
              ) : (
                orders.map((order) => (
                  <article
                    key={order._id}
                    className="border border-[#B89542]/20 bg-[#19141A]"
                  >
                    <div className="flex flex-col gap-3 border-b border-[#B89542]/15 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm text-[#E8C96A]">
                          {order.orderNumber}
                        </p>
                        <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-[#7D7079]">
                          Placed {formatDate(order.createdAt)} ·{" "}
                          {order.paymentMethod}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span
                          className={`border px-3 py-1 text-[9px] uppercase tracking-[0.16em] ${
                            STATUS_STYLES[order.orderStatus] ||
                            "border-[#B89542]/40 text-[#E8C96A]"
                          }`}
                        >
                          {order.orderStatus}
                        </span>
                        <span className="text-sm text-[#E8C96A]">
                          {formatPrice(order.totalPrice)}
                        </span>
                      </div>
                    </div>
                    <div className="divide-y divide-[#B89542]/10 px-5">
                      {order.orderItems.map((item) => (
                        <div
                          key={`${item.product}-${item.size}-${item.color}`}
                          className="flex items-center gap-4 py-4"
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
                          <span className="text-xs text-[#B8AEB6]">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col gap-2 border-t border-[#B89542]/15 px-5 py-3 text-[10px] text-[#7D7079] sm:flex-row sm:items-center sm:justify-between">
                      <span>
                        Deliver to: {order.shippingAddress.city},{" "}
                        {order.shippingAddress.state}
                      </span>
                      {order.orderStatus === "Placed" && (
                        <button
                          onClick={() => cancelOrder(order)}
                          className="self-start uppercase tracking-[0.16em] text-[#E2A0A0] underline underline-offset-4"
                        >
                          Cancel order
                        </button>
                      )}
                    </div>
                  </article>
                ))
              )}
            </section>
          ) : (
            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">
              <form
                onSubmit={saveProfile}
                className="border border-[#B89542]/20 bg-[#19141A] p-6"
              >
                <h2 className="font-serif text-2xl">Profile details</h2>
                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {[
                    ["name", "Full name"],
                    ["phone", "Phone"],
                    ["street", "Street address"],
                    ["city", "City"],
                    ["state", "Province / State"],
                    ["postalCode", "Postal code"],
                    ["country", "Country"],
                  ].map(([field, label]) => (
                    <label
                      key={field}
                      className={field === "street" ? "sm:col-span-2" : ""}
                    >
                      <span className="text-[10px] uppercase tracking-[0.18em] text-[#B8AEB6]">
                        {label}
                      </span>
                      <input
                        value={profile[field]}
                        onChange={(event) =>
                          setProfile((current) => ({
                            ...current,
                            [field]: event.target.value,
                          }))
                        }
                        className="mt-2 w-full border border-[#B89542]/40 bg-[#100D11] px-4 py-3 text-sm outline-none focus:border-[#E8C96A]"
                      />
                    </label>
                  ))}
                </div>
                <button
                  type="submit"
                  disabled={savingProfile}
                  className="mt-5 border border-[#E8C96A] bg-[#E8C96A] px-6 py-3 text-[10px] uppercase tracking-[0.18em] text-[#100D11] transition hover:bg-transparent hover:text-[#E8C96A] disabled:opacity-50"
                >
                  {savingProfile ? "Saving…" : "Save profile"}
                </button>
              </form>

              <form
                onSubmit={changePassword}
                className="h-fit border border-[#B89542]/20 bg-[#19141A] p-6"
              >
                <h2 className="font-serif text-2xl">Change password</h2>
                {[
                  ["currentPassword", "Current password"],
                  ["newPassword", "New password"],
                  ["confirmPassword", "Confirm new password"],
                ].map(([field, label]) => (
                  <label key={field} className="mt-4 block">
                    <span className="text-[10px] uppercase tracking-[0.18em] text-[#B8AEB6]">
                      {label}
                    </span>
                    <input
                      type="password"
                      value={passwords[field]}
                      onChange={(event) =>
                        setPasswords((current) => ({
                          ...current,
                          [field]: event.target.value,
                        }))
                      }
                      required
                      className="mt-2 w-full border border-[#B89542]/40 bg-[#100D11] px-4 py-3 text-sm outline-none focus:border-[#E8C96A]"
                    />
                  </label>
                ))}
                <button
                  type="submit"
                  disabled={passwordBusy}
                  className="mt-5 border border-[#B89542]/50 px-6 py-3 text-[10px] uppercase tracking-[0.18em] text-[#E8C96A] transition hover:border-[#E8C96A] disabled:opacity-50"
                >
                  {passwordBusy ? "Updating…" : "Update password"}
                </button>
              </form>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
