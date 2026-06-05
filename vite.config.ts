import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import https from "https";

// In-memory cache for crawled Indian stock data
let scrapedStocksCache: any[] = [
  { symbol: "SENSEX", name: "BSE Sensex", price: 77234.56, change: 234.56, changePercent: 0.32, openPrice: 77000.00, yahooSymbol: "^BSESN" },
  { symbol: "NIFTY", name: "Nifty 50", price: 23456.45, change: 145.23, changePercent: 0.62, openPrice: 23311.22, yahooSymbol: "^NSEI" },
  { symbol: "RELIANCE", name: "Reliance Industries", price: 2890.50, change: 42.45, changePercent: 1.49, openPrice: 2848.05, yahooSymbol: "RELIANCE.NS" },
  { symbol: "TCS", name: "Tata Consultancy", price: 4120.75, change: -45.10, changePercent: -1.08, openPrice: 4165.85, yahooSymbol: "TCS.NS" },
  { symbol: "HDFCBANK", name: "HDFC Bank", price: 1945.80, change: 28.75, changePercent: 1.50, openPrice: 1917.05, yahooSymbol: "HDFCBANK.NS" },
  { symbol: "INFY", name: "Infosys Limited", price: 1678.35, change: 35.60, changePercent: 2.17, openPrice: 1642.75, yahooSymbol: "INFY.NS" },
  { symbol: "ICICIBANK", name: "ICICI Bank", price: 1234.20, change: 15.20, changePercent: 1.25, openPrice: 1219.00, yahooSymbol: "ICICIBANK.NS" },
  { symbol: "BHARTIARTL", name: "Bharti Airtel", price: 1456.90, change: 38.30, changePercent: 2.70, openPrice: 1418.60, yahooSymbol: "BHARTIARTL.NS" },
  { symbol: "SBIN", name: "State Bank of India", price: 845.30, change: 24.85, changePercent: 3.03, openPrice: 820.45, yahooSymbol: "SBIN.NS" },
  { symbol: "WIPRO", name: "Wipro Limited", price: 685.45, change: 18.15, changePercent: 2.71, openPrice: 667.30, yahooSymbol: "WIPRO.NS" }
];

// Helper to query Yahoo Finance server-side
const fetchJson = (url: string, headers: Record<string, string>): Promise<any> => {
  return new Promise((resolve, reject) => {
    https.get(url, { headers }, (res) => {
      let data = "";
      res.on("data", (chunk) => { data += chunk; });
      res.on("end", () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on("error", (err) => reject(err));
  });
};

// Start background crawler worker (loops through symbols one-by-one every 1.5 seconds)
let currentScrapeIndex = 0;
const startScraperWorker = () => {
  const runNextScrape = async () => {
    const stock = scrapedStocksCache[currentScrapeIndex];
    if (stock) {
      try {
        const url = `https://query1.finance.yahoo.com/v8/finance/chart/${stock.yahooSymbol}?interval=1d&range=1d`;
        const headers = {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
        };
        const data = await fetchJson(url, headers);
        
        if (data && data.chart && data.chart.result && data.chart.result[0]) {
          const meta = data.chart.result[0].meta;
          const price = meta.regularMarketPrice;
          const prevClose = meta.chartPreviousClose;
          
          if (price !== undefined && price !== null) {
            const change = price - prevClose;
            const changePercent = (change / prevClose) * 100;
            
            scrapedStocksCache[currentScrapeIndex] = {
              ...stock,
              price: Math.round(price * 100) / 100,
              change: Math.round(change * 100) / 100,
              changePercent: Math.round(changePercent * 100) / 100,
              openPrice: Math.round(prevClose * 100) / 100
            };
          }
        }
      } catch (err) {
        // Ignore single failures
      }
    }
    
    currentScrapeIndex = (currentScrapeIndex + 1) % scrapedStocksCache.length;
    setTimeout(runNextScrape, 1500); // safe interval
  };
  
  runNextScrape();
};

// Start background crawling
startScraperWorker();

// Custom Vite plugin to serve the cached stock quotes
const customScraperPlugin = () => ({
  name: "custom-scraper-plugin",
  configureServer(server: any) {
    server.middlewares.use("/api/live-indian-stocks", (req: any, res: any) => {
      res.setHeader("Content-Type", "application/json");
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.end(JSON.stringify(scrapedStocksCache));
    });
  }
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
    proxy: {
      "/api/yahoo": {
        target: "https://query1.finance.yahoo.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/yahoo/, ""),
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
        }
      }
    }
  },
  plugins: [react(), mode === "development" && componentTagger(), customScraperPlugin()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "ES2020",
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: mode === "production",
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          framer: ["framer-motion"],
          ui: ["lucide-react"],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: false,
  },
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "framer-motion",
      "lucide-react",
    ],
  },
}));
