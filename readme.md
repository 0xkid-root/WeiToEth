# ETH Converter Pro

A professional Ethereum (ETH) converter tool built with React, TypeScript, Vite, and Tailwind CSS. Instantly convert between Ethereum units (Wei, Gwei, Finney, ETH) and fiat currencies (USD, EUR, GBP, BTC) with real-time price data and a built-in gas fee calculator.

## Features

- **Ethereum Unit Conversion:** Convert between Wei, Kwei, Mwei, Gwei, Szabo, Finney, and ETH.
- **Fiat Currency Conversion:** Real-time ETH prices in USD, EUR, GBP, and BTC (via CoinGecko API).
- **Gas Fee Calculator:** Estimate transaction costs for different speeds (slow, standard, fast).
- **Copy to Clipboard:** Easily copy any conversion result.
- **SEO Optimized:** Rich meta tags and structured data for search engines.
- **Responsive Design:** Mobile-friendly and accessible UI.

## Project Structure

```
project/
  ├── public/
  │   ├── robots.txt
  │   └── sitemap.xml
  ├── src/
  │   ├── components/
  │   │   └── SEOContent.tsx
  │   ├── App.tsx
  │   ├── index.css
  │   ├── main.tsx
  │   └── vite-env.d.ts
  ├── .gitignore
  ├── eslint.config.js
  ├── index.html
  ├── package.json
  ├── postcss.config.js
  ├── tailwind.config.js
  ├── tsconfig.app.json
  ├── tsconfig.json
  ├── tsconfig.node.json
  └── vite.config.ts
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**
   ```sh
   git clone <your-repo-url>
   cd project
   ```

2. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```

### Development

Start the development server:

```sh
npm run dev
# or
yarn dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

To build for production:

```sh
npm run build
# or
yarn build
```

### Preview Production Build

```sh
npm run preview
# or
yarn preview
```

### Lint

```sh
npm run lint
# or
yarn lint
```

## Configuration

- **Tailwind CSS:** Configured via [tailwind.config.js](tailwind.config.js)
- **Vite:** Configured via [vite.config.ts](vite.config.ts)
- **TypeScript:** Configured via [tsconfig.app.json](tsconfig.app.json) and [tsconfig.json](tsconfig.json)
- **ESLint:** Configured via [eslint.config.js](eslint.config.js)

## License

MIT

---

**ETH Converter Pro** — Free Ethereum unit & price