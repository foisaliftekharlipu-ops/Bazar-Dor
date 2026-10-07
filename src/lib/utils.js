// Bengali digits lookup
const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

/**
 * Converts English numbers/strings to Bengali numeral string.
 * Supports decimal numbers and formatting with commas.
 */
export function toBengaliNumber(number, { decimals = null, useComma = true } = {}) {
  if (number === null || number === undefined || isNaN(Number(number))) {
    return "০";
  }

  let num = Number(number);
  if (decimals !== null) {
    num = Number(num.toFixed(decimals));
  }

  const parts = num.toString().split(".");
  let integerPart = parts[0];
  const decimalPart = parts[1];

  if (useComma && integerPart.length > 3) {
    integerPart = Number(integerPart).toLocaleString("en-US");
  }

  const convertStr = (str) =>
    str.replace(/[0-9]/g, (digit) => bengaliDigits[parseInt(digit, 10)]);

  let result = convertStr(integerPart);
  if (decimalPart !== undefined) {
    result += "." + convertStr(decimalPart);
  }
  return result;
}

/**
 * Maps API unit string to localized Bengali unit phrase (e.g. প্রতি কেজি)
 */
export function getBengaliUnit(unit) {
  if (!unit) return "প্রতি একক";
  const normalized = unit.toLowerCase().trim();
  switch (normalized) {
    case "kg":
    case "কেজি":
      return "প্রতি কেজি";
    case "litre":
    case "liter":
    case "লিটার":
      return "প্রতি লিটার";
    case "dozen":
    case "ডজন":
      return "প্রতি ডজন";
    case "piece":
    case "পিস":
    case "টি":
      return "প্রতি পিস";
    case "gm":
    case "গ্রাম":
      return "প্রতি ২৫০ গ্রাম";
    default:
      return `প্রতি ${unit}`;
  }
}

/**
 * Maps API unit string to short unit (e.g. কেজি, লিটার)
 */
export function getShortBengaliUnit(unit) {
  if (!unit) return "একক";
  const normalized = unit.toLowerCase().trim();
  switch (normalized) {
    case "kg":
    case "কেজি":
      return "কেজি";
    case "litre":
    case "liter":
    case "লিটার":
      return "লিটার";
    case "dozen":
    case "ডজন":
      return "ডজন";
    case "piece":
    case "পিস":
    case "টি":
      return "পিস";
    case "gm":
    case "গ্রাম":
      return "গ্রাম";
    default:
      return unit;
  }
}

/**
 * Generates formatted dynamic Bangla date matching Figma: "মঙ্গলবার, ৬ অক্টোবর, ২০২৬"
 */
export function getBanglaDate(date = new Date()) {
  const days = [
    "রবিবার",
    "সোমবার",
    "মঙ্গলবার",
    "বুধবার",
    "বৃহস্পতিবার",
    "শুক্রবার",
    "শনিবার",
  ];
  const months = [
    "জানুয়ারি",
    "ফেব্রুয়ারি",
    "মার্চ",
    "এপ্রিল",
    "মে",
    "জুন",
    "জুলাই",
    "আগস্ট",
    "সেপ্টেম্বর",
    "অক্টোবর",
    "নভেম্বর",
    "ডিসেম্বর",
  ];

  const dayName = days[date.getDay()];
  const day = toBengaliNumber(date.getDate(), { useComma: false });
  const monthName = months[date.getMonth()];
  const year = toBengaliNumber(date.getFullYear(), { useComma: false });

  return `${dayName}, ${day} ${monthName}, ${year}`;
}

/**
 * Calculates min, max, and avg price from markets data
 */
export function calculatePriceStats(markets = [], fallbackPrice = 0) {
  if (!markets || markets.length === 0) {
    return {
      min: fallbackPrice,
      max: fallbackPrice,
      avg: fallbackPrice,
    };
  }

  let minPrice = Infinity;
  let maxPrice = -Infinity;
  let totalAvg = 0;

  markets.forEach((m) => {
    const marketMin = m.min || fallbackPrice;
    const marketMax = m.max || fallbackPrice;
    if (marketMin < minPrice) minPrice = marketMin;
    if (marketMax > maxPrice) maxPrice = marketMax;
    totalAvg += (marketMin + marketMax) / 2;
  });

  const avgPrice = Math.round(totalAvg / markets.length);

  return {
    min: minPrice === Infinity ? fallbackPrice : minPrice,
    max: maxPrice === -Infinity ? fallbackPrice : maxPrice,
    avg: avgPrice || fallbackPrice,
  };
}
