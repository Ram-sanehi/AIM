import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  openPrice: number;
  binanceSymbol?: string;
}

// Initial placeholder data (will be immediately replaced by live real-time feeds)
const initialStocks: Stock[] = [
  {
    symbol: "GOLD",
    name: "Gold Spot (XAU/INR)",
    price: 205420.50,
    change: 1245.50,
    changePercent: 0.61,
    openPrice: 204175.00,
    binanceSymbol: "PAXGUSDT" // PAX Gold tracks 1 troy ounce of gold in real-time
  },
  {
    symbol: "BTC",
    name: "Bitcoin (BTC/INR)",
    price: 5854200.00,
    change: 145600.00,
    changePercent: 2.55,
    openPrice: 5708600.00,
    binanceSymbol: "BTCUSDT"
  },
  {
    symbol: "ETH",
    name: "Ethereum (ETH/INR)",
    price: 310500.00,
    change: -2450.00,
    changePercent: -0.78,
    openPrice: 312950.00,
    binanceSymbol: "ETHUSDT"
  },
  {
    symbol: "SOL",
    name: "Solana (SOL/INR)",
    price: 14250.00,
    change: 540.00,
    changePercent: 3.94,
    openPrice: 13710.00,
    binanceSymbol: "SOLUSDT"
  },
  {
    symbol: "USD/INR",
    name: "US Dollar / Indian Rupee",
    price: 83.45,
    change: 0.05,
    changePercent: 0.06,
    openPrice: 83.40,
    binanceSymbol: "USDINR"
  },
  {
    symbol: "EUR/INR",
    name: "Euro / Indian Rupee",
    price: 90.62,
    change: -0.12,
    changePercent: -0.13,
    openPrice: 90.74,
    binanceSymbol: "EURINR"
  }
];

export function StockTicker() {
  const [stocks, setStocks] = useState<Stock[]>(initialStocks);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Record<string, "up" | "down" | null>>({});
  const wsRef = useRef<WebSocket | null>(null);
  const usdInrRateRef = useRef<number>(83.50); // Default fallback rate

  useEffect(() => {
    // Fetch live currency conversion rate (USD/INR)
    const fetchExchangeRates = async () => {
      try {
        const response = await fetch("https://open.er-api.com/v6/latest/USD");
        if (!response.ok) throw new Error("Failed to fetch exchange rates");
        const data = await response.json();
        
        if (data && data.rates && data.rates.INR) {
          const inrRate = data.rates.INR;
          const eurRate = data.rates.EUR ? inrRate / data.rates.EUR : 90.50;
          usdInrRateRef.current = inrRate;

          // Update fiat currency rates in state
          setStocks((prevStocks) =>
            prevStocks.map((stock) => {
              if (stock.symbol === "USD/INR") {
                const currentPrice = inrRate;
                const change = currentPrice - stock.openPrice;
                const changePercent = (change / stock.openPrice) * 100;
                return {
                  ...stock,
                  price: Math.round(currentPrice * 100) / 100,
                  change: Math.round(change * 100) / 100,
                  changePercent: Math.round(changePercent * 100) / 100,
                };
              }
              if (stock.symbol === "EUR/INR") {
                const currentPrice = eurRate;
                const change = currentPrice - stock.openPrice;
                const changePercent = (change / stock.openPrice) * 100;
                return {
                  ...stock,
                  price: Math.round(currentPrice * 100) / 100,
                  change: Math.round(change * 100) / 100,
                  changePercent: Math.round(changePercent * 100) / 100,
                };
              }
              return stock;
            })
          );
        }
      } catch (error) {
        console.warn("Could not retrieve latest exchange rates, using fallback USD/INR = 83.50", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExchangeRates();

    // Connect to Binance Free Public WebSocket (no key needed, feeds real-time prices)
    const connectBinanceWebSocket = () => {
      try {
        const ws = new WebSocket(
          "wss://stream.binance.com:9443/stream?streams=btcusdt@ticker/ethusdt@ticker/paxgusdt@ticker/solusdt@ticker"
        );
        wsRef.current = ws;

        ws.onopen = () => {
          console.log("Connected to Binance Live Market Stream");
        };

        ws.onmessage = (event) => {
          try {
            const message = JSON.parse(event.data);
            
            // Binance stream payload wrapper checks
            if (message && message.stream && message.data) {
              const ticker = message.data;
              const binanceSymbol = ticker.s; // e.g. "BTCUSDT"
              const usdPrice = parseFloat(ticker.c); // Last price
              const priceChangeUsd = parseFloat(ticker.p); // 24h change
              const priceChangePct = parseFloat(ticker.P); // 24h change pct

              if (binanceSymbol && !isNaN(usdPrice)) {
                setStocks((prevStocks) => {
                  return prevStocks.map((stock) => {
                    if (stock.binanceSymbol === binanceSymbol) {
                      const inrRate = usdInrRateRef.current;
                      const inrPrice = usdPrice * inrRate;
                      const inrChange = priceChangeUsd * inrRate;
                      
                      const oldPrice = stock.price;

                      // Highlight flash triggers
                      setLastUpdated((prev) => ({
                        ...prev,
                        [stock.symbol]: inrPrice >= oldPrice ? "up" : "down"
                      }));

                      // Clear highlight after 700ms
                      setTimeout(() => {
                        setLastUpdated((prev) => ({
                          ...prev,
                          [stock.symbol]: null
                        }));
                      }, 700);

                      return {
                        ...stock,
                        price: Math.round(inrPrice * 100) / 100,
                        change: Math.round(inrChange * 100) / 100,
                        changePercent: Math.round(priceChangePct * 100) / 100,
                      };
                    }
                    return stock;
                  });
                });
              }
            }
          } catch (err) {
            // Silently absorb parse errors
          }
        };

        ws.onerror = (error) => {
          console.warn("Binance stream error:", error);
        };

        ws.onclose = () => {
          console.log("Binance stream closed. Reconnecting in 5s...");
          setTimeout(() => {
            connectBinanceWebSocket();
          }, 5000);
        };
      } catch (error) {
        console.warn("WebSocket creation failed:", error);
      }
    };

    connectBinanceWebSocket();

    // Periodically update currency exchange rate every 5 minutes
    const exchangeRateInterval = setInterval(fetchExchangeRates, 300000);

    return () => {
      clearInterval(exchangeRateInterval);
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#020B22]/95 backdrop-blur-xl border-t border-[#D4AF37]/15 overflow-hidden py-2.5 shadow-2xl z-40">
      {/* Edge gradient fade masks */}
      <div className="absolute left-0 top-0 bottom-0 w-28 bg-gradient-to-r from-[#020B22] to-transparent pointer-events-none z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-28 bg-gradient-to-l from-[#020B22] to-transparent pointer-events-none z-10" />

      {loading && (
        <div className="px-6 text-slate-500 text-xs tracking-wider uppercase font-light">Connecting to live global markets...</div>
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
