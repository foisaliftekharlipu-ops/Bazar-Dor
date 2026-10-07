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
  
  // Fallback static categories matching Figma
  return [
    { id: "chal", slug: "chal", nameBn: "চাল", icon: "🍚" },
    { id: "dal", slug: "dal", nameBn: "ডাল", icon: "🫘" },
    { id: "tel", slug: "tel", nameBn: "তেল", icon: "🛢️" },
    { id: "sobji", slug: "sobji", nameBn: "সবজি", icon: "🥬" },
    { id: "mach", slug: "mach", nameBn: "মাছ", icon: "🐟" },
    { id: "mangsho", slug: "mangsho", nameBn: "মাংস", icon: "🍗" },
    { id: "dim-dui", slug: "dim-dui", nameBn: "ডিম-দুধ", icon: "🥛" },
    { id: "mosla", slug: "mosla", nameBn: "মসলা", icon: "🌶️" },
  ];
}

/**
 * Fetch all products
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
