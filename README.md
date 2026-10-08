# 🛒 বাজার দর (Bazar Dor) — Daily Grocery Market Price Tracker

**বাজার দর (Bazar Dor)** is a modern, responsive full-stack web application designed to track and visualize daily essential commodity market prices across Bangladesh. It provides real-time market insights, daily price fluctuations (risers and fallers), multi-market price comparisons, category filtering, price sorting, and secure user authentication.

---

## 🌐 Live Application
- **Live URL:** [https://bazar-dor.vercel.app](https://bazar-dor.vercel.app) *(or your deployed Vercel URL)*

---

## 🚀 Key Features

1. **📊 Real-time Price Ticker & Dynamic Hero Section**
   - Infinite smooth scrolling marquee strip displaying live price changes and percentage fluctuations for all essential commodities.
   - Dynamic Bangla calendar date integration (বঙ্গাব্দ) matching official Bengali date calculations.
   - Smooth anchor navigation scrolling to the `#সব-পণ্য` catalog with responsive offsets.

2. **⚖️ Market Risers & Fallers Intelligence**
   - **আজ দাম বেড়েছে ▲:** Top 6 commodities experiencing highest price increments.
   - **আজ দাম কমেছে ▼:** Top 6 commodities with largest price drops.
   - Clear visual indicators (emerald for price decrease, crimson for price surge, neutral for steady rates) with Bengali digits formatting.

3. **🔍 Category Navigation & Smart Price Sorting (Challenge C1)**
   - Dynamic category bar with active tab highlighting and smooth route switching.
   - Real-time client-side price sorting: **ডিফল্ট (Default)**, **কম দাম আগে (Low to High)**, and **বেশি দাম আগে (High to Low)**.
   - Cross-platform universal emoji integration ensuring consistent visual rendering on all operating systems.

4. **🛡️ Protected Multi-Market Product Details Page**
   - Authentication-guarded detailed view (`/product/[slug]`) ensuring authorized user access with automated callback redirection.
   - Comprehensive market summary: Lowest price, Highest price, Average price, and market locations.
   - Detailed division-wise and market-by-market breakdown table with minimum, maximum, and average calculations.

5. **👤 Complete Authentication & Profile Management (Challenge C3)**
   - Secure authentication powered by BetterAuth with MongoDB database persistence.
   - Email/Password registration & login with client-side form validation and interactive toast notifications.
   - User Profile Dashboard (`/profile`) and Profile Update interface (`/profile/update`) for modifying user information with real-time UI state synchronization.

---

## 🛠️ Technology Stack

- **Framework:** Next.js 16 (App Router)
- **Library:** React 19
- **Styling:** Tailwind CSS v4 & DaisyUI
- **Authentication:** BetterAuth (Email/Password & Social OAuth ready)
- **Database:** MongoDB
- **Icons:** React Icons (`react-icons/fi`, `react-icons/fc`, `react-icons/fa`)
- **Notifications:** React Hot Toast
- **Deployment:** Vercel

---

## 📂 Project Structure

```text
bazar-dor/
├── public/                 # Static assets & illustrations
├── src/
│   ├── app/
│   │   ├── api/auth/       # BetterAuth API handler endpoint
│   │   ├── category/[slug] # Category product listing page
│   │   ├── product/[slug]  # Protected product details page
│   │   ├── profile/        # User profile & update pages
│   │   ├── signin/         # User Sign In page
│   │   ├── signup/         # User Sign Up page
│   │   ├── layout.js       # Root application layout & Toast provider
│   │   ├── not-found.jsx   # Custom 404 error page
│   │   └── page.js         # Home page with Hero, Risers, Fallers, All Products
│   ├── components/         # Reusable UI components (Navbar, Footer, Cards, etc.)
│   └── lib/                # API helpers, auth configuration, utils, and emoji map
├── .env.example            # Environment variables template
├── package.json
└── README.md
```

---

## ⚙️ Getting Started & Local Installation

### 1. Clone the repository
```bash
git clone https://github.com/your-username/bazar-dor.git
cd bazar-dor
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env.local` file in the root directory and add the following:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/bazardor?retryWrites=true&w=majority
MONGODB_DB_NAME=bazardor

# BetterAuth Secrets & Configuration
BETTER_AUTH_SECRET=your_32_character_random_secret_string
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Optional Social OAuth (Google / GitHub)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

### 4. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 🧪 Production Build Verification
To ensure error-free compilation and type check before deployment:
```bash
npm run build
```

---

## 📄 License
This project is developed for educational and demonstration purposes.
