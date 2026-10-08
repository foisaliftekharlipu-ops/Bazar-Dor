/**
 * Universal cross-platform emoji map for all 33 products.
 * Replaces Unicode 14/15 characters (🫚, 🫘, 🫙) with universally supported emojis
 * so that no Windows/Android/iOS device displays a missing glyph square box.
 */
export const universalProductEmojis = {
  "sorno-machi-chal": "🍚",
  "miniket-chal": "🍚",
  "nazir-chal": "🍚",
  "batam-size-chal": "🍚",
  "mosur-dal": "🥜",
  "mug-dal": "🥜",
  "chola-dal": "🥜",
  "aman-dal-khosasila": "🥜",
  "sorishar-tel": "🥫",
  "pam-tel": "🛢️",
  "ghani-banga-sorishar-tel": "🥫",
  "alu": "🥔",
  "peyaj": "🧅",
  "kaccha-moric": "🌶️",
  "begun": "🍆",
  "dhenders": "🥒",
  "rui-mach": "🐟",
  "telapiya-mach": "🐟",
  "ilish-mach": "🐠",
  "katla-mach": "🐠",
  "chingri-mach": "🦐",
  "murgi-r-mangsho": "🍗",
  "goru-r-mangsho": "🥩",
  "khasir-mangsho": "🍖",
  "hanser-mangsho": "🦆",
  "dim": "🥚",
  "dui-dudh": "🥛",
  "doi": "🥣",
  "mokhhan": "🧈",
  "ada": "🌿",
  "roshun": "🧄",
  "morich-gunda": "🌶️",
  "dhanepata-gunda": "🍃",
};

/**
 * Returns a guaranteed universal emoji for any product
 */
export function getProductEmoji(product) {
  if (!product) return "🛒";
  const slug = product.slug || "";
  
  if (universalProductEmojis[slug]) {
    return universalProductEmojis[slug];
  }

  // Check name match for fallbacks
  const name = product.nameBn || "";
  if (name.includes("আদা")) return "🌿";
  if (name.includes("ডাল") || name.includes("ছোলা")) return "🥜";
  if (name.includes("তেল")) return "🥫";
  if (name.includes("চাল")) return "🍚";

  // Check if API image is a broken unicode character
  const rawImage = product.image;
  if (rawImage === "🫚") return "🌿";
  if (rawImage === "🫘") return "🥜";
  if (rawImage === "🫙") return "🥫";

  return rawImage || product.categoryIcon || "🛒";
}
