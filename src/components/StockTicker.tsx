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
}

// Default Indian stock market data
const defaultStocks: Stock[] = [
  { 
    symbol: "SENSEX", 
    name: "BSE Sensex", 
    price: 77234.56, 
    change: 234.56, 
    changePercent: 0.32,
    openPrice: 77000.00
  },
  { 
    symbol: "NIFTY", 
    name: "Nifty 50", 
    price: 23456.45, 
    change: 145.23, 
    changePercent: 0.62,
    openPrice: 23311.22
  },
  { 
    symbol: "RELIANCE", 
    name: "Reliance Industries", 
    price: 2890.50, 
    change: 42.45, 
    changePercent: 1.49,
    openPrice: 2848.05
  },
  { 
    symbol: "TCS", 
    name: "Tata Consultancy", 
    price: 4120.75, 
    change: -45.10, 
    changePercent: -1.08,
    openPrice: 4165.85
  },
  { 
    symbol: "HDFCBANK", 
    name: "HDFC Bank", 
    price: 1945.80, 
    change: 28.75, 
    changePercent: 1.50,
    openPrice: 1917.05
  },
  { 
    symbol: "INFY", 
    name: "Infosys Limited", 
    price: 1678.35, 
    change: 35.60, 
    changePercent: 2.17,
    openPrice: 1642.75
  },
  { 
    symbol: "ICICIBANK", 
    name: "ICICI Bank", 
    price: 1234.20, 
    change: 15.20, 
    changePercent: 1.25,
    openPrice: 1219.00
  },
  { 
    symbol: "BHARTIARTL", 
    name: "Bharti Airtel", 
    price: 1456.90, 
    change: 38.30, 
    changePercent: 2.70,
    openPrice: 1418.60
  },
  { 
    symbol: "SBIN", 
    name: "State Bank of India", 
    price: 845.30, 
    change: 24.85, 
    changePercent: 3.03,
    openPrice: 820.45
  },
  { 
    symbol: "WIPRO", 
    name: "Wipro Limited", 
    price: 685.45, 
    change: 18.15, 
    changePercent: 2.71,
    openPrice: 667.30
  },
];

// Check if Indian market is currently open (9:15 AM to 3:30 PM IST, Monday-Friday)
function isIndianMarketOpen(): boolean {
  const now = new Date();
  // Convert to IST (UTC+5:30)
  const istTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
  
  const dayOfWeek = istTime.getDay();
  const hours = istTime.getHours();
  const minutes = istTime.getMinutes();
  const totalMinutes = hours * 60 + minutes;
  
  // Market is closed on weekends (0 = Sunday, 6 = Saturday)
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    return false;
  }
  
  // Market hours: 9:15 AM (555 minutes) to 3:30 PM (930 minutes)
  const marketOpenMinutes = 9 * 60 + 15; // 9:15 AM
  const marketCloseMinutes = 15 * 60 + 30; // 3:30 PM
  
  return totalMinutes >= marketOpenMinutes && totalMinutes <= marketCloseMinutes;
}

export function StockTicker() {
  const [stocks, setStocks] = useState<Stock[]>(defaultStocks);
  const [loading, setLoading] = useState(false);
  const [marketOpen, setMarketOpen] = useState(isIndianMarketOpen());
  const [lastUpdated, setLastUpdated] = useState<Record<string, "up" | "down" | null>>({});
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>();
  const reconnectAttemptsRef = useRef(0);
  const maxReconnectAttempts = 3;

  useEffect(() => {
    // Check market status every minute
    const marketStatusInterval = setInterval(() => {
      setMarketOpen(isIndianMarketOpen());
    }, 60000);

    // Simulation/Ticking loop to guarantee continuous live updates at all times
    const simulationInterval = setInterval(() => {
      // Don't simulate if WebSocket is active and receiving live updates (to prevent overlapping ticks)
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN && isIndianMarketOpen()) {
        return;
      }

      // Randomly update 2 stocks at a time to create a realistic trading floor speed
      const indicesToUpdate = new Set<number>();
      while (indicesToUpdate.size < 2) {
        indicesToUpdate.add(Math.floor(Math.random() * defaultStocks.length));
      }

      setStocks((prevStocks) => {
        const nextStocks = [...prevStocks];
        const newUpdates: Record<string, "up" | "down" | null> = {};

        indicesToUpdate.forEach((idx) => {
          const stock = nextStocks[idx];
          // Tiny realistic fluctuation (-0.12% to +0.15%)
          const changePct = (Math.random() * 0.27) - 0.12;
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

        // Clear highlight flash after 800ms
        setTimeout(() => {
          setLastUpdated((prev) => {
            const cleared = { ...prev };
            Object.keys(newUpdates).forEach((sym) => {
              cleared[sym] = null;
            });
            return cleared;
          });
        }, 800);

        return nextStocks;
      });
    }, 2000);

    const connectWebSocket = () => {
      // Only connect if market is open
      if (!isIndianMarketOpen()) {
        console.log("Indian market is closed. Ticker running simulation mode.");
        setLoading(false);
        reconnectAttemptsRef.current = 0;
        return;
      }

      const finnhubApiKey = import.meta.env.VITE_FINNHUB_API_KEY;
      
      if (!finnhubApiKey) {
        console.log("Finnhub API key not configured. Ticker running simulation mode.");
        setLoading(false);
        return;
      }

      // Limit reconnection attempts
      if (reconnectAttemptsRef.current >= maxReconnectAttempts) {
        console.warn("Max reconnection attempts reached. Ticker running simulation mode.");
        setLoading(false);
        return;
      }

      try {
        const ws = new WebSocket(`wss://ws.finnhub.io?token=${finnhubApiKey}`);
        wsRef.current = ws;
        
        // Set timeout for connection
        const connectionTimeout = setTimeout(() => {
          if (ws.readyState === WebSocket.CONNECTING) {
            console.warn("WebSocket connection timeout. Ticker running simulation mode.");
            ws.close();
            setLoading(false);
          }
        }, 5000);

        ws.onopen = () => {
          clearTimeout(connectionTimeout);
          console.log("WebSocket connected to Finnhub");
          setLoading(false);
          reconnectAttemptsRef.current = 0;
          
          // Subscribe to US equivalents of Indian majors
          const symbols = ["RELIANCE", "TCS", "HDBK", "INFY", "ICICIBANK", "BHARTI", "SBIN", "WIT"];
          symbols.forEach(symbol => {
            try {
              ws.send(JSON.stringify({ type: "subscribe", symbol: symbol }));
            } catch (error) {
              console.warn(`Failed to subscribe to ${symbol}:`, error);
            }
          });
        };

        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            
            // Handle trade data only if market is open
            if (data.type === "trade" && data.data && isIndianMarketOpen()) {
              data.data.forEach((trade: any) => {
                const symbol = trade.s;
                const price = trade.p;
                
                if (symbol && price) {
                  setStocks((prevStocks) => {
                    return prevStocks.map((stock) => {
                      if (stock.symbol === symbol) {
                        const change = price - stock.openPrice;
                        const changePercent = (change / stock.openPrice) * 100;
                        const oldPrice = stock.price;
                        
                        setLastUpdated((prev) => ({
                          ...prev,
                          [symbol]: price >= oldPrice ? "up" : "down",
                        }));

                        setTimeout(() => {
                          setLastUpdated((prev) => ({ ...prev, [symbol]: null }));
                        }, 800);

                        return {
                          ...stock,
                          price: Math.round(price * 100) / 100,
                          change: Math.round(change * 100) / 100,
                          changePercent: Math.round(changePercent * 100) / 100,
                        };
                      }
                      return stock;
                    });
                  });
                }
              });
            }
          } catch (error) {
            console.warn("Error parsing WebSocket message:", error);
          }
        };

        ws.onerror = (error) => {
          console.warn("WebSocket error - using simulation fallback:", error);
          setLoading(false);
        };

        ws.onclose = () => {
          console.log("WebSocket disconnected.");
          // Only attempt to reconnect if market is open and under max attempts
          if (isIndianMarketOpen() && reconnectAttemptsRef.current < maxReconnectAttempts) {
            reconnectAttemptsRef.current++;
            console.log(`Reconnection attempt ${reconnectAttemptsRef.current}/${maxReconnectAttempts}`);
            reconnectTimeoutRef.current = setTimeout(() => {
              connectWebSocket();
            }, 3000);
          } else {
            setLoading(false);
          }
        };
      } catch (error) {
        console.warn("Failed to create WebSocket:", error);
        setLoading(false);
      }
    };

    // Start connection
    connectWebSocket();

    return () => {
      clearInterval(marketStatusInterval);
      clearInterval(simulationInterval);
      if (wsRef.current) {
        wsRef.current.close();
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#020B22]/95 backdrop-blur-xl border-t border-[#D4AF37]/15 overflow-hidden py-2.5 shadow-2xl z-40">
      {/* Edge gradient fade masks */}
      <div className="absolute left-0 top-0 bottom-0 w-28 bg-gradient-to-r from-[#020B22] to-transparent pointer-events-none z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-28 bg-gradient-to-l from-[#020B22] to-transparent pointer-events-none z-10" />

      {loading && (
        <div className="px-6 text-slate-500 text-xs tracking-wider uppercase font-light">Loading live financial feeds...</div>
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
