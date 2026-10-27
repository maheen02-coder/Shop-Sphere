"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar/Navbar";
import { useAuth } from "../../context/AuthContext";
import { apiFetch } from "../../lib/api";
import { formatDate, formatPrice } from "../../lib/format";

const ORDER_STATUSES = ["Placed", "Processing", "Shipped", "Delivered", "Cancelled"];
const PAYMENT_STATUSES = ["PENDING", "PAID", "FAILED"];

const emptyProduct = {
  name: "",
  category: "Fashion",
  subCategory: "",
  brand: "ShopSphere",
  price: "",
  stock: "20",
  image: "/fashion.jfif",
  description: "",
};

export default function AdminPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  const [tab, setTab] = useState("overview");
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [orderFilters, setOrderFilters] = useState({ orderStatus: "All", paymentStatus: "All" });
  const [stockDrafts, setStockDrafts] = useState({});
  const [showProductForm, setShowProductForm] = useState(false);
  const [newProduct, setNewProduct] = useState(emptyProduct);

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/login?redirect=/admin");
    }
  }, [authLoading, user, router]);

  const loadStats = async () => {
    const data = await apiFetch("/admin/stats");
    setStats(data.stats);
    setRecentOrders(data.recentOrders || []);
  };

  const loadOrders = async () => {
    const params = new URLSearchParams({ limit: "50" });
    if (orderFilters.orderStatus !== "All") params.set("orderStatus", orderFilters.orderStatus);
    if (orderFilters.paymentStatus !== "All") params.set("paymentStatus", orderFilters.paymentStatus);
    const data = await apiFetch(`/orders?${params.toString()}`);
    setOrders(data.orders || []);
  };

  const loadProducts = async () => {
    const first = await apiFetch("/products?page=1&limit=100&sortBy=newest");
    const all = [...(first.products || [])];
    for (let nextPage = 2; nextPage <= (first.totalPages || 1); nextPage += 1) {
      const next = await apiFetch(`/products?page=${nextPage}&limit=100&sortBy=newest`);
      all.push(...(next.products || []));
    }
    setProducts(all);
    setStockDrafts(Object.fromEntries(all.map((product) => [product._id, product.stock])));
  };

  const loadUsers = async () => {
    const data = await apiFetch("/admin/users?limit=100");
    setUsers(data.users || []);
  };

  useEffect(() => {
    if (!user || user.role !== "admin") return;
    let active = true;
    setLoading(true);
    setError("");

    const load = async () => {
      try {
        if (tab === "overview") await loadStats();
        if (tab === "orders") await loadOrders();
        if (tab === "products") await loadProducts();
        if (tab === "users") await loadUsers();
      } catch (err) {
        if (active) setError(err.message || "Unable to load dashboard data.");
      } finally {
        if (active) setLoading(false);
      }
    };

    load();
    return () => {
      active = false;
    };
  }, [user, tab, orderFilters]);

  const flash = (message) => {
    setNotice(message);
    setError("");
    window.setTimeout(() => setNotice(""), 3000);
  };

  const updateOrder = async (order, field, value) => {
    try {
      const path =
        field === "orderStatus"
          ? `/orders/${order._id}/status`
          : `/orders/${order._id}/payment`;
      await apiFetch(path, {
        method: "PUT",
        body: field === "orderStatus" ? { orderStatus: value } : { paymentStatus: value },
      });
      setOrders((current) =>
        current.map((item) =>
          item._id === order._id ? { ...item, [field]: value } : item
        )
      );
      if (tab === "overview") await loadStats();
      flash(`Order ${order.orderNumber} updated.`);
    } catch (err) {
      setError(err.message || "Unable to update order.");
    }
  };

  const saveStock = async (product) => {
    const value = Number(stockDrafts[product._id]);
    try {
      await apiFetch(`/products/${product._id}/stock`, {
        method: "PATCH",
        body: { stock: value },
      });
      setProducts((current) =>
        current.map((item) =>
          item._id === product._id ? { ...item, stock: value } : item
        )
      );
      flash(`Stock updated for ${product.name}.`);
    } catch (err) {
      setError(err.message || "Unable to update stock.");
    }
  };

  const deleteProduct = async (product) => {
    if (!window.confirm(`Delete product "${product.name}"?`)) return;
    try {
      await apiFetch(`/products/${product._id}`, { method: "DELETE" });
      setProducts((current) => current.filter((item) => item._id !== product._id));
      flash("Product deleted.");
    } catch (err) {
      setError(err.message || "Unable to delete product.");
    }
  };

  const createProduct = async (event) => {
    event.preventDefault();
    try {
      await apiFetch("/products", {
        method: "POST",
        body: {
          ...newProduct,
          price: Number(newProduct.price),
          stock: Number(newProduct.stock),
        },
      });
      setNewProduct(emptyProduct);
      setShowProductForm(false);
      await loadProducts();
      flash("Product created.");
    } catch (err) {
      setError(err.message || "Unable to create product.");
    }
  };

  const updateUserRole = async (targetUser, role) => {
    try {
      await apiFetch(`/admin/users/${targetUser._id}/role`, {
        method: "PUT",
        body: { role },
      });
      setUsers((current) =>
        current.map((item) =>
          item._id === targetUser._id ? { ...item, role } : item
        )
      );
      flash(`${targetUser.name} is now ${role}.`);
    } catch (err) {
      setError(err.message || "Unable to update role.");
    }
  };

  const deleteUser = async (targetUser) => {
    if (!window.confirm(`Delete user "${targetUser.name}"?`)) return;
    try {
      await apiFetch(`/admin/users/${targetUser._id}`, { method: "DELETE" });
      setUsers((current) => current.filter((item) => item._id !== targetUser._id));
      flash("User deleted.");
    } catch (err) {
      setError(err.message || "Unable to delete user.");
    }
  };

  if (authLoading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-[#100D11] px-5 py-16">
          <div className="mx-auto h-72 max-w-6xl animate-pulse border border-[#B89542]/15 bg-[#19141A]" />
        </main>
      </>
    );
  }

  if (!user) return null;

  if (user.role !== "admin") {
    return (
      <>
        <Navbar />
        <main className="flex min-h-screen items-center justify-center bg-[#100D11] px-5 text-center text-[#F1E8EB]">
          <div>
            <h1 className="font-serif text-4xl text-[#E8C96A]">Admins only</h1>
            <p className="mt-3 text-sm text-[#B8AEB6]">
              Your account does not have access to the dashboard.
            </p>
            <Link
              href="/account"
              className="mt-7 inline-flex border border-[#B89542] px-6 py-3 text-[10px] uppercase tracking-[0.2em] text-[#E8C96A]"
            >
              Go to my account
            </Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#100D11] px-5 py-12 text-[#F1E8EB] sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-4 border-b border-[#B89542]/25 pb-7 sm:flex-row sm:items-end">
            <div>
              <p className="text-[10px] uppercase tracking-[0.4em] text-[#E8C96A]">
                ShopSphere Control
              </p>
              <h1 className="mt-3 font-serif text-4xl sm:text-5xl">
                Admin <span className="italic text-[#E8C96A]">Dashboard</span>
              </h1>
            </div>
            <Link
              href="/shop"
              className="text-[10px] uppercase tracking-[0.18em] text-[#B8AEB6] hover:text-[#E8C96A]"
            >
              View storefront ↗
            </Link>
          </div>

          <div className="mt-7 flex flex-wrap gap-2">
            {[
              ["overview", "Overview"],
              ["orders", "Orders"],
              ["products", "Products"],
              ["users", "Users"],
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

          {loading && (
            <div className="mt-6 h-40 animate-pulse border border-[#B89542]/15 bg-[#19141A]" />
          )}

          {tab === "overview" && stats && !loading && (
            <div className="mt-6 space-y-7">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  ["Revenue", formatPrice(stats.totalRevenue)],
                  ["Collected", formatPrice(stats.totalCollected)],
                  ["Pending payment", formatPrice(stats.totalPending)],
                  ["Orders", stats.totalOrders],
                  ["Products", stats.totalProducts],
                  ["Low stock", stats.lowStockProducts],
                  ["Customers", stats.totalUsers],
                  ["Processing", stats.statusCounts.processing],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="border border-[#B89542]/20 bg-[#19141A] px-5 py-4"
                  >
                    <p className="text-[9px] uppercase tracking-[0.22em] text-[#7D7079]">
                      {label}
                    </p>
                    <p className="mt-2 font-serif text-2xl text-[#E8C96A]">
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <div className="border border-[#B89542]/20 bg-[#19141A] p-5">
                  <h2 className="font-serif text-xl">Order pipeline</h2>
                  <div className="mt-4 space-y-3 text-sm">
                    {Object.entries(stats.statusCounts).map(([status, count]) => (
                      <div key={status} className="flex items-center justify-between">
                        <span className="capitalize text-[#B8AEB6]">{status}</span>
                        <span className="text-[#E8C96A]">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="border border-[#B89542]/20 bg-[#19141A] p-5">
                  <h2 className="font-serif text-xl">Payments</h2>
                  <div className="mt-4 space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[#B8AEB6]">Pending (COD)</span>
                      <span className="text-[#E8C96A]">
                        {stats.paymentCounts.pending}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#B8AEB6]">Paid</span>
                      <span className="text-[#E8C96A]">
                        {stats.paymentCounts.paid}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#B8AEB6]">Low stock products</span>
                      <span className="text-[#E8C96A]">{stats.lowStockProducts}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border border-[#B89542]/20 bg-[#19141A]">
                <h2 className="border-b border-[#B89542]/15 px-5 py-4 font-serif text-xl">
                  Recent orders
                </h2>
                {recentOrders.length === 0 ? (
                  <p className="px-5 py-8 text-sm text-[#7D7079]">No orders yet.</p>
                ) : (
                  recentOrders.map((order) => (
                    <div
                      key={order._id}
                      className="flex flex-col gap-2 border-b border-[#B89542]/10 px-5 py-3 text-xs last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <span className="text-[#E8C96A]">{order.orderNumber}</span>
                      <span className="text-[#B8AEB6]">
                        {order.user?.name || "Customer"}
                      </span>
                      <span className="text-[#B8AEB6]">
                        {formatDate(order.createdAt)}
                      </span>
                      <span className="text-[#E8C96A]">
                        {formatPrice(order.totalPrice)}
                      </span>
                      <span className="uppercase tracking-[0.14em] text-[#9DBF9E]">
                        {order.orderStatus}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {tab === "orders" && !loading && (
            <div className="mt-6">
              <div className="flex flex-wrap gap-3">
                {[
                  ["orderStatus", ORDER_STATUSES],
                  ["paymentStatus", PAYMENT_STATUSES],
                ].map(([field, options]) => (
                  <select
                    key={field}
                    value={orderFilters[field]}
                    onChange={(event) => {
                      setOrderFilters((current) => ({
                        ...current,
                        [field]: event.target.value,
                      }));
                    }}
                    className="border border-[#B89542]/40 bg-[#19141A] px-3 py-2 text-xs text-[#E8C96A] outline-none focus:border-[#E8C96A]"
                  >
                    <option value="All">
                      {field === "orderStatus" ? "All order statuses" : "All payments"}
                    </option>
                    {options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ))}
              </div>

              <div className="mt-5 overflow-x-auto border border-[#B89542]/20 bg-[#19141A]">
                <table className="min-w-full text-left text-xs">
                  <thead className="border-b border-[#B89542]/20 text-[9px] uppercase tracking-[0.18em] text-[#7D7079]">
                    <tr>
                      <th className="px-4 py-3">Order</th>
                      <th className="px-4 py-3">Customer</th>
                      <th className="px-4 py-3">Total</th>
                      <th className="px-4 py-3">Placed</th>
                      <th className="px-4 py-3">Order status</th>
                      <th className="px-4 py-3">Payment</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-4 py-10 text-center text-[#7D7079]">
                          No orders match these filters.
                        </td>
                      </tr>
                    ) : (
                      orders.map((order) => (
                        <tr key={order._id} className="border-b border-[#B89542]/10">
                          <td className="px-4 py-3 text-[#E8C96A]">
                            {order.orderNumber}
                          </td>
                          <td className="px-4 py-3 text-[#C5B6BC]">
                            <p>{order.user?.name || "Customer"}</p>
                            <p className="text-[10px] text-[#7D7079]">
                              {order.user?.email}
                            </p>
                          </td>
                          <td className="px-4 py-3 text-[#F1E8EB]">
                            {formatPrice(order.totalPrice)}
                          </td>
                          <td className="px-4 py-3 text-[#B8AEB6]">
                            {formatDate(order.createdAt)}
                          </td>
                          <td className="px-4 py-3">
                            <select
                              value={order.orderStatus}
                              onChange={(event) =>
                                updateOrder(order, "orderStatus", event.target.value)
                              }
                              className="border border-[#B89542]/40 bg-[#100D11] px-2 py-1.5 text-[10px] text-[#E8C96A]"
                            >
                              {ORDER_STATUSES.map((status) => (
                                <option key={status} value={status}>
                                  {status}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="px-4 py-3">
                            <select
                              value={order.paymentStatus}
                              onChange={(event) =>
                                updateOrder(order, "paymentStatus", event.target.value)
                              }
                              className="border border-[#B89542]/40 bg-[#100D11] px-2 py-1.5 text-[10px] text-[#E8C96A]"
                            >
                              {PAYMENT_STATUSES.map((status) => (
                                <option key={status} value={status}>
                                  {status}
                                </option>
                              ))}
                            </select>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {tab === "products" && !loading && (
            <div className="mt-6">
              <div className="flex justify-between">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#7D7079]">
                  {products.length} products in catalogue
                </p>
                <button
                  onClick={() => setShowProductForm((current) => !current)}
                  className="border border-[#B89542]/50 px-4 py-2 text-[10px] uppercase tracking-[0.16em] text-[#E8C96A] hover:border-[#E8C96A]"
                >
                  {showProductForm ? "Close form" : "Add product"}
                </button>
              </div>

              {showProductForm && (
                <form
                  onSubmit={createProduct}
                  className="mt-4 grid grid-cols-1 gap-3 border border-[#B89542]/20 bg-[#19141A] p-5 sm:grid-cols-2 lg:grid-cols-4"
                >
                  {[
                    ["name", "Name", "text"],
                    ["category", "Category", "text"],
                    ["subCategory", "Sub-category", "text"],
                    ["brand", "Brand", "text"],
                    ["price", "Price (PKR)", "number"],
                    ["stock", "Stock", "number"],
                    ["image", "Image path", "text"],
                  ].map(([field, label, type]) => (
                    <label key={field}>
                      <span className="text-[9px] uppercase tracking-[0.16em] text-[#7D7079]">
                        {label}
                      </span>
                      <input
                        type={type}
                        value={newProduct[field]}
                        onChange={(event) =>
                          setNewProduct((current) => ({
                            ...current,
                            [field]: event.target.value,
                          }))
                        }
                        required={field !== "subCategory"}
                        className="mt-1 w-full border border-[#B89542]/40 bg-[#100D11] px-3 py-2 text-xs outline-none focus:border-[#E8C96A]"
                      />
                    </label>
                  ))}
                  <label className="sm:col-span-2 lg:col-span-4">
                    <span className="text-[9px] uppercase tracking-[0.16em] text-[#7D7079]">
                      Description
                    </span>
                    <textarea
                      value={newProduct.description}
                      onChange={(event) =>
                        setNewProduct((current) => ({
                          ...current,
                          description: event.target.value,
                        }))
                      }
                      required
                      rows={2}
                      className="mt-1 w-full border border-[#B89542]/40 bg-[#100D11] px-3 py-2 text-xs outline-none focus:border-[#E8C96A]"
                    />
                  </label>
                  <button
                    type="submit"
                    className="justify-self-start border border-[#E8C96A] bg-[#E8C96A] px-5 py-2.5 text-[10px] uppercase tracking-[0.16em] text-[#100D11] sm:col-span-2 lg:col-span-4"
                  >
                    Create product
                  </button>
                </form>
              )}

              <div className="mt-5 overflow-x-auto border border-[#B89542]/20 bg-[#19141A]">
                <table className="min-w-full text-left text-xs">
                  <thead className="border-b border-[#B89542]/20 text-[9px] uppercase tracking-[0.18em] text-[#7D7079]">
                    <tr>
                      <th className="px-4 py-3">Product</th>
                      <th className="px-4 py-3">Category</th>
                      <th className="px-4 py-3">Price</th>
                      <th className="px-4 py-3">Stock</th>
                      <th className="px-4 py-3" />
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product._id} className="border-b border-[#B89542]/10">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="h-12 w-10 object-cover"
                            />
                            <div>
                              <p className="text-[#F1E8EB]">{product.name}</p>
                              <p className="text-[10px] text-[#7D7079]">
                                {product.brand}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-[#B8AEB6]">
                          {product.category}
                          {product.subCategory ? ` / ${product.subCategory}` : ""}
                        </td>
                        <td className="px-4 py-3 text-[#E8C96A]">
                          {formatPrice(product.price)}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              min="0"
                              value={stockDrafts[product._id] ?? product.stock}
                              onChange={(event) =>
                                setStockDrafts((current) => ({
                                  ...current,
                                  [product._id]: event.target.value,
                                }))
                              }
                              className="w-20 border border-[#B89542]/40 bg-[#100D11] px-2 py-1.5 text-xs text-[#F1E8EB]"
                            />
                            <button
                              onClick={() => saveStock(product)}
                              className="text-[9px] uppercase tracking-[0.14em] text-[#E8C96A] underline underline-offset-4"
                            >
                              Save
                            </button>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => deleteProduct(product)}
                            className="text-[9px] uppercase tracking-[0.14em] text-[#E2A0A0] underline underline-offset-4"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {tab === "users" && !loading && (
            <div className="mt-6 overflow-x-auto border border-[#B89542]/20 bg-[#19141A]">
              <table className="min-w-full text-left text-xs">
                <thead className="border-b border-[#B89542]/20 text-[9px] uppercase tracking-[0.18em] text-[#7D7079]">
                  <tr>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Orders</th>
                    <th className="px-4 py-3">Role</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {users.map((item) => (
                    <tr key={item._id} className="border-b border-[#B89542]/10">
                      <td className="px-4 py-3 text-[#F1E8EB]">{item.name}</td>
                      <td className="px-4 py-3 text-[#B8AEB6]">{item.email}</td>
                      <td className="px-4 py-3 text-[#B8AEB6]">{item.orderCount}</td>
                      <td className="px-4 py-3">
                        <select
                          value={item.role}
                          onChange={(event) => updateUserRole(item, event.target.value)}
                          className="border border-[#B89542]/40 bg-[#100D11] px-2 py-1.5 text-[10px] text-[#E8C96A]"
                        >
                          <option value="user">user</option>
                          <option value="admin">admin</option>
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        {item._id !== user._id && (
                          <button
                            onClick={() => deleteUser(item)}
                            className="text-[9px] uppercase tracking-[0.14em] text-[#E2A0A0] underline underline-offset-4"
                          >
                            Delete
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
