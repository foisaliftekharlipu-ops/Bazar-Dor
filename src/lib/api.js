const BASE_URL_1 = "https://api.api-store.workers.dev/api/bazardor";
const BASE_URL_2 = "https://api.abcz.workers.dev/api/bazardor";

/**
 * Resilient fetch helper that tries BASE_URL_1 first and falls back to BASE_URL_2
 */
async function fetchWithFallback(endpoint, options = {}) {
  const fetchOptions = {
    next: { revalidate: 60 },
    ...options,
  };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);
    const res = await fetch(`${BASE_URL_1}${endpoint}`, {
      ...fetchOptions,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn(`[API] BASE_URL_1 failed for ${endpoint}:`, err.message);
  }

  // Fallback to BASE_URL_2
  try {
    const res = await fetch(`${BASE_URL_2}${endpoint}`, fetchOptions);
    if (res.ok) {
      return await res.json();
    }
    throw new Error(`API responded with status: ${res.status}`);
  } catch (err) {
    console.error(`[API] All base URLs failed for ${endpoint}:`, err.message);
    return [];
  }
}

/**
 * Fetch all categories
 */
export async function getCategories() {
  try {
    const data = await fetchWithFallback("/categories");
    if (Array.isArray(data) && data.length > 0) return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
  }

  // Fallback static categories
  return [
    { id: "chal", slug: "chal", nameBn: "চাল", icon: "🍚" },
    { id: "dal", slug: "dal", nameBn: "ডাল", icon: "🥜" },
    { id: "tel", slug: "tel", nameBn: "তেল", icon: "🥫" },
    { id: "sobji", slug: "sobji", nameBn: "সবজি", icon: "🥒" },
    { id: "mach", slug: "mach", nameBn: "মাছ", icon: "🐟" },
    { id: "mangsho", slug: "mangsho", nameBn: "মাংস", icon: "🍗" },
    { id: "dim-dui", slug: "dim-dui", nameBn: "ডিম-দুধ", icon: "🥛" },
    { id: "mosla", slug: "mosla", nameBn: "মসলা", icon: "🌶️" },
  ];
}

/**
 * Fetch single category by slug/id
 */
export async function getCategoryBySlug(slug) {
  try {
    const data = await fetchWithFallback(`/categories/${slug}`);
    if (data && !data.error) return data;
  } catch (err) {
    const categories = await getCategories();
    return categories.find((c) => c.slug === slug || c.id === slug) || null;
  }
}

/**
 * Fetch all products, optionally filtered by category
 */
export async function getProducts(category = null) {
  try {
    const endpoint = category
      ? `/products?category=${encodeURIComponent(category)}`
      : "/products";
    const data = await fetchWithFallback(endpoint);
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

/**
 * Fetch a single product by unique slug
 */
export async function getProductBySlug(slug) {
  try {
    const allProducts = await getProducts();
    const product = allProducts.find((p) => p.slug === slug);
    if (product) return product;

    if (!isNaN(Number(slug))) {
      const byId = await fetchWithFallback(`/products/${slug}`);
      if (byId && !byId.error) return byId;
    }

    return null;
  } catch (error) {
    console.error(`Error fetching product with slug "${slug}":`, error);
    return null;
  }
}

/**
 * Fetch top risers (Section A: "আজ দাম বেড়েছে ▲")
 * Top 6 products with change.dir === 'up' sorted by pct magnitude descending
 */
export async function getTopRisers(limit = 6) {
  try {
    const products = await getProducts();
    return products
      .filter((p) => p.change && p.change.dir === "up")
      .sort((a, b) => Math.abs(b.change?.pct || 0) - Math.abs(a.change?.pct || 0))
      .slice(0, limit);
  } catch (error) {
    console.error("Error getting top risers:", error);
    return [];
  }
}

/**
 * Fetch top fallers (Section B: "আজ দাম কমেছে ▼")
 * Top 6 products with change.dir === 'down' sorted by pct magnitude descending
 */
export async function getTopFallers(limit = 6) {
  try {
    const products = await getProducts();
    return products
      .filter((p) => p.change && p.change.dir === "down")
      .sort((a, b) => Math.abs(b.change?.pct || 0) - Math.abs(a.change?.pct || 0))
      .slice(0, limit);
  } catch (error) {
    console.error("Error getting top fallers:", error);
    return [];
  }
}
