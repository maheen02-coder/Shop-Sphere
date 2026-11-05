const fs = require("fs");
const path = require("path");

const frontendRoot = path.resolve(__dirname, "../../shopsphere/src");
const outDir = path.resolve(__dirname, "../data");
const outFile = path.join(outDir, "products.json");

const electronics = [
  ["app/electronics/apple/phones/page.jsx", "products", "Phones", "Apple"],
  ["app/electronics/apple/watches/page.jsx", "products", "Watches", "Apple"],
  ["app/electronics/dawlance/refrigerators/page.jsx", "refrigerators", "Refrigerators", "Dawlance"],
  ["app/electronics/haier/washing-machines/page.jsx", "washingMachines", "Washing Machines", "Haier"],
  ["app/electronics/kenwood/microwaves/page.jsx", "microwaves", "Microwaves", "Kenwood"],
  ["app/electronics/kenwood/stoves/page.jsx", "stoves", "Stoves", "Kenwood"],
  ["app/electronics/orient/air-conditioners/page.jsx", "products", "Air Conditioners", "Orient"],
  ["app/electronics/orient/refrigerators/page.jsx", "products", "Refrigerators", "Orient"],
  ["app/electronics/samsung/phones/page.jsx", "phones", "Phones", "Samsung"],
  ["app/electronics/samsung/tvs/page.jsx", "tvs", "TVs", "Samsung"],
  ["app/electronics/samsung/watches/page.jsx", "watches", "Watches", "Samsung"],
];

const jewelry = [
  ["app/jewelry/womens/rings/page.jsx", "rings", "Women", "Rings"],
  ["app/jewelry/womens/necklace/page.jsx", "necklaces", "Women", "Necklaces"],
  ["app/jewelry/mens/rings/page.jsx", "rings", "Men", "Rings"],
  ["app/jewelry/mens/necklace/page.jsx", "necklaces", "Men", "Necklaces"],
];

const read = (relative) => fs.readFileSync(path.join(frontendRoot, relative), "utf8");

const extractArrayText = (source, variableName) => {
  const pattern = new RegExp(`const\\s+${variableName}\\s*=\\s*\\[`);
  const match = pattern.exec(source);
  if (!match) {
    throw new Error(`Could not find array '${variableName}'`);
  }

  const start = source.indexOf("[", match.index);
  let depth = 0;
  let quote = null;
  let escaped = false;

  for (let i = start; i < source.length; i += 1) {
    const char = source[i];

    if (quote) {
      if (escaped) {
        escaped = false;
      } else if (char === "\\") {
        escaped = true;
      } else if (char === quote) {
        quote = null;
      }
      continue;
    }

    if (char === '"' || char === "'" || char === "`") {
      quote = char;
      continue;
    }

    if (char === "[") depth += 1;
    if (char === "]") {
      depth -= 1;
      if (depth === 0) {
        return source.slice(start, i + 1);
      }
    }
  }

  throw new Error(`Unbalanced array for '${variableName}'`);
};

const evaluateArray = (text) => new Function(`return (${text});`)();

const parsePrice = (value) => {
  if (typeof value === "number") return Math.round(value);
  const raw = String(value || "0");
  const numeric = Number(raw.replace(/[^0-9]/g, "")) || 0;
  if (raw.includes("$")) {
    return Math.round(numeric * 280);
  }
  return Math.round(numeric);
};

const normalize = (raw, meta, index) => {
  const name = raw.name || meta.brand;
  const price = parsePrice(raw.price);
  const stock = 8 + ((index * 7) % 30);
  const rating = Number((4.3 + ((index * 3) % 7) / 10).toFixed(1));

  return {
    name,
    category: meta.category,
    subCategory: meta.subCategory,
    collectionType: meta.collectionType || "",
    brand: meta.brand,
    price,
    salePrice: null,
    image: raw.image,
    images: [],
    description:
      raw.description ||
      `${name} from the ${meta.brand} collection, selected for the ShopSphere catalogue.`,
    material: raw.material || meta.material || "",
    sizes: Array.isArray(raw.sizes) ? raw.sizes : [],
    colors: Array.isArray(raw.colors) ? raw.colors : [],
    care: raw.care || "",
    stock,
    rating,
    numReviews: 4 + ((index * 5) % 40),
    isFeatured: index % 11 === 0,
    label: raw.label || raw.type || "",
  };
};

const products = [];

// Fashion catalogue (already normalized data)
const fashionSource = read("app/fashion/data/product.js")
  .replace(/export\s+const/g, "const");
const fashionModule = new Function(
  `${fashionSource}\nreturn { products };`
)();

fashionModule.products.forEach((item, index) => {
  products.push(
    normalize(
      item,
      {
        category: "Fashion",
        subCategory: item.category,
        collectionType: item.collection,
        brand: "Velvetty Thorns",
        material: "Premium fabric",
      },
      index
    )
  );
});

// Electronics catalogue
electronics.forEach(([file, variableName, subCategory, brand], groupIndex) => {
  const items = evaluateArray(extractArrayText(read(file), variableName));
  items.forEach((item, index) => {
    products.push(
      normalize(
        item,
        {
          category: "Electronics",
          subCategory,
          brand,
        },
        100 + groupIndex * 10 + index
      )
    );
  });
});

// Jewelry catalogue
jewelry.forEach(([file, variableName, collectionType, subCategory], groupIndex) => {
  const items = evaluateArray(extractArrayText(read(file), variableName));
  items.forEach((item, index) => {
    products.push(
      normalize(
        { ...item, material: "Gold-toned premium alloy" },
        {
          category: "Jewelry",
          subCategory,
          collectionType,
          brand: "ShopSphere",
          material: "Gold-toned premium alloy",
        },
        200 + groupIndex * 10 + index
      )
    );
  });
});

// Fragrance and watch showcase entries for the home page categories
const extras = [
  {
    name: "Velvet Rose Eau de Parfum",
    price: 8500,
    image: "/perfume.jfif",
    description: "A rich floral signature with rose, amber and a soft woody finish.",
    label: "SIGNATURE",
  },
  {
    name: "Midnight Oud",
    price: 12500,
    image: "/perfume.jfif",
    description: "A deep oud accord layered with spice and warm vanilla.",
    label: "EXCLUSIVE",
  },
  {
    name: "Citrus Bloom",
    price: 4500,
    image: "/perfume.jfif",
    description: "A bright everyday scent built on citrus, jasmine and musk.",
    label: "NEW ARRIVAL",
  },
  {
    name: "Apple Watch Series 9",
    price: 129999,
    image: "/apple-watch-1.jfif",
    description: "A refined smartwatch with a bright display and everyday health tracking.",
    label: "FEATURED",
  },
  {
    name: "Apple Watch SE",
    price: 89999,
    image: "/apple-watch-2.jfif",
    description: "The essentials of Apple Watch in a lightweight aluminium case.",
    label: "",
  },
  {
    name: "Samsung Galaxy Watch",
    price: 74999,
    image: "/samsung-watch-1.jfif",
    description: "A modern smartwatch with fitness tracking and a crisp AMOLED display.",
    label: "BESTSELLER",
  },
  {
    name: "Samsung Watch Classic",
    price: 94999,
    image: "/samsung-watch-2.jfif",
    description: "A classic round-faced smartwatch with premium finishing.",
    label: "",
  },
];

extras.forEach((item, index) => {
  const isWatch = item.name.toLowerCase().includes("watch");
  products.push(
    normalize(
      item,
      {
        category: isWatch ? "Watches" : "Fragrances",
        subCategory: isWatch ? "Smart Watches" : "Perfumes",
        brand: isWatch ? (item.name.startsWith("Apple") ? "Apple" : "Samsung") : "Velvetty Thorns",
      },
      300 + index
    )
  );
});

// Guard against duplicate names, which would break name-based cart lookups
const seen = new Set();
const uniqueProducts = products.filter((product) => {
  const key = product.name.trim().toLowerCase();
  if (seen.has(key)) return false;
  seen.add(key);
  return true;
});

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outFile, JSON.stringify(uniqueProducts, null, 2));

console.log(`Wrote ${uniqueProducts.length} products to ${outFile}`);
