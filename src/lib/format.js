export const formatPrice = (value) =>
  `Rs. ${Number(value || 0).toLocaleString("en-PK")}`;

export const parsePrice = (value) => {
  if (typeof value === "number") return Math.round(value);
  const raw = String(value || "0");
  const numeric = Number(raw.replace(/[^0-9]/g, "")) || 0;
  if (raw.includes("$")) return Math.round(numeric * 280);
  return Math.round(numeric);
};

export const formatDate = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export const lineKey = (item) =>
  `${item.id}::${item.size || ""}::${item.color || ""}`;
