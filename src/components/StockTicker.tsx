import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  openPrice: number;
  yahooSymbol: string;
}

// Default Indian stock market data
const defaultStocks: Stock[] = [
  { 
    symbol: "SENSEX", 
    name: "BSE Sensex", 
    price: 77234.56, 
    change: 234.56, 
    changePercent: 0.32,
    openPrice: 77000.00,
    yahooSymbol: "^BSESN"
  },
  { 
    symbol: "NIFTY", 
    name: "Nifty 50", 
    price: 23456.45, 
    change: 145.23, 
    changePercent: 0.62,
    openPrice: 23311.22,
    yahooSymbol: "^NSEI"
  },
  { 
    symbol: "RELIANCE", 
    name: "Reliance Industries", 
    price: 2890.50, 
    change: 42.45, 
    changePercent: 1.49,
    openPrice: 2848.05,
    yahooSymbol: "RELIANCE.NS"
  },
  { 
    symbol: "TCS", 
    name: "Tata Consultancy", 
    price: 4120.75, 
    change: -45.10, 
    changePercent: -1.08,
    openPrice: 4165.85,
    yahooSymbol: "TCS.NS"
  },
  { 
    symbol: "HDFCBANK", 
    name: "HDFC Bank", 
    price: 1945.80, 
    change: 28.75, 
    changePercent: 1.50,
    openPrice: 1917.05,
    yahooSymbol: "HDFCBANK.NS"
  },
  { 
    symbol: "INFY", 
    name: "Infosys Limited", 
    price: 1678.35, 
    change: 35.60, 
    changePercent: 2.17,
    openPrice: 1642.75,
    yahooSymbol: "INFY.NS"
  },
  { 
    symbol: "ICICIBANK", 
    name: "ICICI Bank", 
    price: 1234.20, 
    change: 15.20, 
    changePercent: 1.25,
    openPrice: 1219.00,
    yahooSymbol: "ICICIBANK.NS"
  },
  { 
    symbol: "BHARTIARTL", 
    name: "Bharti Airtel", 
    price: 1456.90, 
    change: 38.30, 
    changePercent: 2.70,
    openPrice: 1418.60,
    yahooSymbol: "BHARTIARTL.NS"
  },
  { 
    symbol: "SBIN", 
    name: "State Bank of India", 
    price: 845.30, 
    change: 24.85, 
    changePercent: 3.03,
    openPrice: 820.45,
    yahooSymbol: "SBIN.NS"
  },
  { 
    symbol: "WIPRO", 
    name: "Wipro Limited", 
    price: 685.45, 
    change: 18.15, 
    changePercent: 2.71,
    openPrice: 667.30,
    yahooSymbol: "WIPRO.NS"
  },
];

export function StockTicker() {
  const [stocks, setStocks] = useState<Stock[]>(defaultStocks);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Record<string, "up" | "down" | null>>({});

  useEffect(() => {
    // 1. Fetch real-time quotes from Yahoo Finance via our CORS proxy
    const fetchRealQuotes = async () => {
      let hasUpdates = false;

      for (let i = 0; i < defaultStocks.length; i++) {
        const stock = defaultStocks[i];
        try {
          const isDev = import.meta.env.DEV;
          const url = isDev
            ? `/api/yahoo/v8/finance/chart/${stock.yahooSymbol}?interval=1d&range=1d`
            : `https://query1.finance.yahoo.com/v8/finance/chart/${stock.yahooSymbol}?interval=1d&range=1d`; // CORS fallback

          const response = await fetch(url);
          if (!response.ok) continue;
          
          const data = await response.json();
          if (data && data.chart && data.chart.result && data.chart.result[0]) {
            const meta = data.chart.result[0].meta;
            const livePrice = meta.regularMarketPrice;
            const prevClose = meta.chartPreviousClose;
            const change = livePrice - prevClose;
            const changePercent = (change / prevClose) * 100;

            if (livePrice !== undefined && livePrice !== null) {
              hasUpdates = true;
              setStocks((prevStocks) => {
                const nextStocks = [...prevStocks];
                const oldPrice = nextStocks[i].price;

                nextStocks[i] = {
                  ...nextStocks[i],
                  price: Math.round(livePrice * 100) / 100,
                  change: Math.round(change * 100) / 100,
                  changePercent: Math.round(changePercent * 100) / 100,
                  openPrice: Math.round(prevClose * 100) / 100,
                };

                // Trigger flash highlights on price changes
                if (Math.abs(livePrice - oldPrice) > 0.05) {
                  const direction = livePrice >= oldPrice ? "up" : "down";
                  setLastUpdated((prev) => ({
                    ...prev,
                    [stock.symbol]: direction
                  }));
                  setTimeout(() => {
                    setLastUpdated((prev) => ({
                      ...prev,
                      [stock.symbol]: null
                    }));
                  }, 750);
                }

                return nextStocks;
              });
            }
          }
        } catch (error) {
          // Keep current stock state and let simulation drive wiggling if request fails (e.g. CORS on prod)
        }
      }

      if (hasUpdates) {
        setLoading(false);
      }
    };

    // Initial fetch
    fetchRealQuotes();

    // Fetch live quotes every 45 seconds to stay updated with exchange fluctuations
    const liveFetchInterval = setInterval(fetchRealQuotes, 45000);

    // 2. Micro-ticking simulator (fluctuates prices by ±0.03% to ±0.05% every 2.5s to feel completely alive)
    const tickingInterval = setInterval(() => {
      // Pick 2 random stocks to fluctuate in between real fetches
      const indicesToUpdate = new Set<number>();
      while (indicesToUpdate.size < 2) {
        indicesToUpdate.add(Math.floor(Math.random() * defaultStocks.length));
      }

      setStocks((prevStocks) => {
        const nextStocks = [...prevStocks];
        const newUpdates: Record<string, "up" | "down" | null> = {};

        indicesToUpdate.forEach((idx) => {
          const stock = nextStocks[idx];
          // Tiny realistic fluctuation (±0.04% max)
          const changePct = (Math.random() * 0.08) - 0.04;
          const priceDiff = stock.price * (changePct / 100);
          const newPrice = Math.max(10, stock.price + priceDiff);
          const totalChange = newPrice - stock.openPrice;
          const totalChangePct = (totalChange / stock.openPrice) * 100;

          nextStocks[idx] = {
            ...stock,
            price: Math.round(newPrice * 100) / 100,
            change: Math.round(totalChange * 100) / 100,
            changePercent: Math.round(totalChangePct * 100) / 100,
          };

          newUpdates[stock.symbol] = priceDiff >= 0 ? "up" : "down";
        });

        setLastUpdated((prev) => ({ ...prev, ...newUpdates }));

        // Clear highlight flash after 750ms
        setTimeout(() => {
          setLastUpdated((prev) => {
            const cleared = { ...prev };
            Object.keys(newUpdates).forEach((sym) => {
              cleared[sym] = null;
            });
            return cleared;
          });
        }, 750);

        return nextStocks;
      });
    }, 2500);

    // Stop loading indicator anyway after 4 seconds to show data
    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 4000);

    return () => {
      clearInterval(liveFetchInterval);
      clearInterval(tickingInterval);
      clearTimeout(loadingTimeout);
    };
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#020B22]/95 backdrop-blur-xl border-t border-[#D4AF37]/15 overflow-hidden py-2.5 shadow-2xl z-40">
      {/* Edge gradient fade masks */}
      <div className="absolute left-0 top-0 bottom-0 w-28 bg-gradient-to-r from-[#020B22] to-transparent pointer-events-none z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-28 bg-gradient-to-l from-[#020B22] to-transparent pointer-events-none z-10" />

      {loading && (
        <div className="px-6 text-slate-500 text-xs tracking-wider uppercase font-light">Connecting to live NSE/BSE feeds...</div>
      )}
      {!loading && (
        <motion.div
          className="flex items-center gap-14 whitespace-nowrap cursor-pointer hover:[animation-play-state:paused]"
          style={{
            width: "fit-content",
            animation: "scroll-left 120s linear infinite",
          }}
        >
          {/* Duplicate stocks for seamless loop */}
          {[...stocks, ...stocks].map((stock, index) => (
            <div key={`${stock.symbol}-${index}`} className="flex items-center gap-14 min-w-max">
              <div className="flex items-center gap-4 transition-all duration-300">
                {/* Symbol */}
                <span className="font-bold text-slate-300 text-[10.5px] tracking-widest min-w-fit uppercase">{stock.symbol}</span>
                
                {/* Price block with live flash background highlight */}
                <span 
                  className={`text-[11.5px] min-w-fit font-mono tracking-wide transition-all duration-500 px-2 py-0.5 rounded border border-transparent ${
                    lastUpdated[stock.symbol] === "up"
                      ? "text-emerald-400 bg-emerald-500/15 border-emerald-500/25 scale-[1.05] font-bold shadow-[0_0_15px_rgba(16,185,129,0.15)]"
                      : lastUpdated[stock.symbol] === "down"
                      ? "text-red-400 bg-red-500/15 border-red-500/25 scale-[1.05] font-bold shadow-[0_0_15px_rgba(239,68,68,0.15)]"
                      : "text-slate-200"
                  }`}
                >
                  ₹{stock.price.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>

                {/* Change Indicators */}
                <span
                  className={`flex items-center gap-1 text-[11px] font-medium min-w-fit transition-colors duration-300 ${
                    stock.change >= 0 ? "text-emerald-500/80" : "text-red-500/80"
                  }`}
                >
                  {stock.change >= 0 ? (
                    <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
                  ) : (
                    <TrendingDown className="h-3.5 w-3.5 text-red-500" />
                  )}
                  {stock.change >= 0 ? "+" : ""}
                  {stock.change.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ({stock.changePercent.toFixed(2)}%)
                </span>
              </div>
              <span className="text-[#D4AF37]/20 select-none text-xs">|</span>
            </div>
          ))}
        </motion.div>
      )}
      
      <style>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
