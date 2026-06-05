import { MessageCircle, X, Send, Phone, Calendar, Calculator, Check, ArrowRight, ShieldCheck, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  customType?: "sip-calculator" | "lead-gen" | "callback-scheduler" | "thank-you";
  meta?: any;
}

interface QuickAction {
  id: string;
  label: string;
  message: string;
  triggerType?: "sip-calculator" | "lead-gen" | "callback-scheduler" | "insurance-advisor";
}

const quickActions: QuickAction[] = [
  { id: "1", label: "📈 SIP Calculator", message: "Open SIP Wealth Calculator", triggerType: "sip-calculator" },
  { id: "2", label: "💼 Get Advisory Quote", message: "I want to request an advisory quote", triggerType: "lead-gen" },
  { id: "3", label: "🛡️ Insurance Solutions", message: "I want to explore insurance solutions", triggerType: "insurance-advisor" },
  { id: "4", label: "📞 Schedule Callback", message: "Schedule a phone call with advisor", triggerType: "callback-scheduler" },
];

const botResponses: Record<string, string> = {
  greeting: "Hello! 👋 I'm your Alpha Investment Assistant. How can I help secure your financial future today?",
  services: "We provide bespoke wealth solutions:\n• Investment Management\n• Goal-based Financial Planning\n• Strategic Loan Services\n• Insurance & Risk Management\n• Tax Mitigation Strategy\n\nWhich service would you like to explore?",
  fallback: "I couldn't quite find details on that. You can try selecting one of our interactive quick options below, or schedule a callback with our founder.",
  help: "I can assist you with:\n• Projecting returns using our SIP Calculator\n• Getting a custom advisory quote\n• Scheduling a callback with our wealth managers\n• Overview of our registration status\n\nWhat would you like to do?",
};

export function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      text: botResponses.greeting,
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Lead Gen State
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [leadTarget, setLeadTarget] = useState("");
  const [leadStep, setLeadStep] = useState(1); // 1: Name, 2: Email, 3: Phone, 4: Target, 5: Done
  const [leadCategory, setLeadCategory] = useState<"advisory" | "insurance">("advisory");

  // Callback State
  const [callName, setCallName] = useState("");
  const [callPhone, setCallPhone] = useState("");
  const [callDate, setCallDate] = useState("");
  const [callSlot, setCallSlot] = useState("10:00 AM - 12:00 PM");
  const [callStep, setCallStep] = useState(1); // 1: Info & Date, 2: Done

  // SIP Calculator State
  const [monthlyInvestment, setMonthlyInvestment] = useState(10000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [timePeriod, setTimePeriod] = useState(15);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, leadStep, callStep, monthlyInvestment, expectedReturn, timePeriod]);

  const addBotMessage = (text: string, customType?: "sip-calculator" | "lead-gen" | "callback-scheduler" | "thank-you", meta?: any) => {
    const botMsg: Message = {
      id: Date.now().toString() + "-bot",
      text,
      sender: "bot",
      timestamp: new Date(),
      customType,
      meta,
    };
    setMessages((prev) => [...prev, botMsg]);
  };

  const processUserMessage = (text: string, triggerType?: "sip-calculator" | "lead-gen" | "callback-scheduler" | "insurance-advisor") => {
    const userMsg: Message = {
      id: Date.now().toString(),
      text,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setHasInteracted(true);
    setIsLoading(true);

    setTimeout(() => {
      const lower = text.toLowerCase();
      
      // Determine response type
      if (triggerType === "sip-calculator" || /sip|calc|calculate|compound|grow|returns/i.test(lower)) {
        addBotMessage("Estimate your portfolio growth dynamically using our interactive SIP Wealth Calculator:", "sip-calculator");
      } else if (triggerType === "lead-gen" || /consult|quote|advisory|apply|register|invest/i.test(lower)) {
        setLeadCategory("advisory");
        setLeadStep(1);
        addBotMessage("Let's gather some details to connect you with Nageshwar Prasad or a senior wealth advisor:", "lead-gen");
      } else if (triggerType === "insurance-advisor" || /insurance|protect|policy|health|life|pension/i.test(lower)) {
        setLeadCategory("insurance");
        setLeadStep(1);
        addBotMessage("Let's gather some details to customize the best insurance policies and coverage strategies for you:", "lead-gen");
      } else if (triggerType === "callback-scheduler" || /call|schedule|phone|callback|talk|human/i.test(lower)) {
        setCallStep(1);
        addBotMessage("Please choose your preferred time slot for a callback consultation:", "callback-scheduler");
      } else if (/service|offer|provide|what do you do/i.test(lower)) {
        addBotMessage(botResponses.services);
      } else if (/help|can you|what can you do/i.test(lower)) {
        addBotMessage(botResponses.help);
      } else {
        addBotMessage(botResponses.fallback);
      }
      setIsLoading(false);
    }, 700);
  };

  const handleQuickAction = (action: QuickAction) => {
    processUserMessage(action.message, action.triggerType);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;
    processUserMessage(inputValue.trim());
  };

  // SIP Calculator calculation
  const calculateSIP = () => {
    const P = monthlyInvestment;
    const r = expectedReturn / 12 / 100;
    const n = timePeriod * 12;
    
    const totalInvested = P * n;
    const futureValue = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    const estimatedReturns = futureValue - totalInvested;

    return {
      totalInvested: Math.round(totalInvested),
      estimatedReturns: Math.round(estimatedReturns),
      totalValue: Math.round(futureValue),
    };
  };

  const sipResults = calculateSIP();

  // Format currency in Indian standard
  const formatINR = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Helper to submit lead to database
  const submitLeadToDatabase = async (targetValue: string) => {
    setIsLoading(true);
    try {
      const isInsurance = leadCategory === "insurance";
      const { error } = await supabase.from("contact_submissions").insert([
        {
          name: leadName.trim(),
          email: leadEmail.trim(),
          phone: leadPhone.trim(),
          subject: isInsurance ? "Insurance Advisory (Chatbot)" : "Advisory Lead (Chatbot)",
          message: isInsurance 
            ? `Requested Insurance Segment: ${targetValue}\nSource: Floating AI Chatbot` 
            : `Target Investment Capacity: ${targetValue}\nSource: Floating AI Chatbot`,
          status: "new"
        },
      ]);

      if (error) throw error;

      setLeadStep(5);
      toast.success(isInsurance ? "Insurance Inquiry Submitted!" : "Advisory Request Submitted!", {
        description: `Thank you ${leadName}. Nageshwar Prasad will review your parameters.`,
      });
      // push a final thank you message
      setTimeout(() => {
        addBotMessage(
          isInsurance
            ? `Perfect! We have recorded your parameters:\n\n• Name: ${leadName}\n• Coverage Needed: ${targetValue}\n• Contact: ${leadPhone}\n\nOur advisory team will analyze the best insurance quotes and contact you in 1-2 hours. 🛡️`
            : `Perfect! We have recorded your parameters:\n\n• Name: ${leadName}\n• Target Range: ${targetValue}\n• Contact: ${leadPhone}\n\nOur team is drafting a preliminary asset allocation strategy. We'll contact you in 1-2 hours. 🚀`,
          "thank-you"
        );
      }, 500);
    } catch (err) {
      console.error("Error submitting lead:", err);
      toast.error("Failed to submit inquiry. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Submit Lead Gen Form (steps 1-3)
  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (leadStep === 1 && leadName.trim()) {
      setLeadStep(2);
    } else if (leadStep === 2 && leadEmail.trim() && /\S+@\S+\.\S+/.test(leadEmail)) {
      setLeadStep(3);
    } else if (leadStep === 3 && leadPhone.trim() && /^\d{10}$/.test(leadPhone)) {
      setLeadStep(4);
    }
  };

  // Submit Callback Request
  const handleCallbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (callName.trim() && /^\d{10}$/.test(callPhone) && callDate) {
      setIsLoading(true);
      try {
        const { error } = await supabase.from("contact_submissions").insert([
          {
            name: callName.trim(),
            email: "scheduled-via-chat@alphaaim.in",
            phone: callPhone.trim(),
            subject: "Callback Scheduled (Chatbot)",
            message: `Scheduled Date: ${callDate}\nPreferred Time Slot: ${callSlot}\nSource: Floating AI Chatbot`,
            status: "new"
          },
        ]);

        if (error) throw error;

        setCallStep(2);
        toast.success("Callback Scheduled!", {
          description: `Confirmed for ${callDate} at ${callSlot}.`,
        });
        setTimeout(() => {
          addBotMessage(`Your callback has been locked in! 🗓️\n\n• Date: ${callDate}\n• Time Slot: ${callSlot}\n• Client: ${callName}\n\nWe will call you at ${callPhone}. Talk to you soon!`, "thank-you");
        }, 500);
      } catch (err) {
        console.error("Error scheduling callback:", err);
        toast.error("Failed to schedule callback. Please try again.");
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error("Please fill in all details with a valid 10-digit phone number.");
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="fixed bottom-24 sm:bottom-28 right-4 sm:right-6 w-[calc(100%-2rem)] sm:w-[400px] h-[min(85vh,620px)] bg-[#030712]/95 backdrop-blur-xl rounded-2xl shadow-2xl flex flex-col z-50 border border-white/10 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-amber-500 to-yellow-600 p-4 flex justify-between items-center shadow-lg border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-950/80 flex items-center justify-center border border-[#d4af37]/35 shadow-inner">
                  <ShieldCheck className="h-5.5 w-5.5 text-[#fbbf24]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[15px] text-white tracking-wide leading-none">Alpha Fiduciary Assistant</h3>
                  <p className="text-[10px] text-white/80 mt-1 font-medium tracking-wide flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                    SEBI Registered Advisory Chat
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Close Chat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-[#030712]/80 to-slate-950/90 scrollbar-thin scrollbar-thumb-slate-800">
              {messages.map((msg) => (
                <div key={msg.id} className="space-y-3">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] px-4 py-3 rounded-2xl text-[13px] leading-relaxed whitespace-pre-wrap ${
                        msg.sender === "user"
                          ? "bg-gradient-to-tr from-amber-500 to-yellow-600 text-white rounded-br-none shadow-md font-semibold"
                          : "bg-slate-900/90 text-slate-100 rounded-bl-none border border-white/5 shadow-inner"
                      }`}
                    >
                      {msg.text}
                      <div className="text-[9px] opacity-40 mt-1 text-right font-mono">
                        {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </div>
                    </div>
                  </motion.div>

                  {/* CUSTOM RENDER TYPE: SIP Calculator */}
                  {msg.sender === "bot" && msg.customType === "sip-calculator" && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-slate-900/95 border border-amber-500/20 rounded-xl p-4 space-y-4 shadow-xl"
                    >
                      <div className="flex items-center gap-2 border-b border-white/5 pb-2">
                        <Calculator className="h-4 w-4 text-[#fbbf24]" />
                        <span className="text-xs font-bold text-slate-200">SIP Returns Calculator</span>
                      </div>
                      
                      {/* Monthly Investment */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[11px]">
                          <span className="text-slate-400">Monthly Amount</span>
                          <span className="text-[#fbbf24] font-bold">{formatINR(monthlyInvestment)}</span>
                        </div>
                        <input
                          type="range"
                          min="500"
                          max="100000"
                          step="500"
                          value={monthlyInvestment}
                          onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                          className="w-full accent-amber-500 bg-slate-850 h-1 rounded-lg cursor-pointer"
                        />
                      </div>

                      {/* Expected Return Rate */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[11px]">
                          <span className="text-slate-400">Expected Annual Return</span>
                          <span className="text-[#fbbf24] font-bold">{expectedReturn}%</span>
                        </div>
                        <input
                          type="range"
                          min="5"
                          max="30"
                          step="0.5"
                          value={expectedReturn}
                          onChange={(e) => setExpectedReturn(Number(e.target.value))}
                          className="w-full accent-amber-500 bg-slate-850 h-1 rounded-lg cursor-pointer"
                        />
                      </div>

                      {/* Time Period */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[11px]">
                          <span className="text-slate-400">Time Period</span>
                          <span className="text-[#fbbf24] font-bold">{timePeriod} Years</span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="40"
                          step="1"
                          value={timePeriod}
                          onChange={(e) => setTimePeriod(Number(e.target.value))}
                          className="w-full accent-amber-500 bg-slate-850 h-1 rounded-lg cursor-pointer"
                        />
                      </div>

                      {/* Output results */}
                      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/5 text-center">
                        <div className="bg-slate-950/40 p-2 rounded-lg">
                          <div className="text-[9px] text-slate-400 font-medium">Invested</div>
                          <div className="text-[11px] font-bold text-slate-300 mt-0.5">{formatINR(sipResults.totalInvested)}</div>
                        </div>
                        <div className="bg-slate-950/40 p-2 rounded-lg">
                          <div className="text-[9px] text-slate-400 font-medium">Returns</div>
                          <div className="text-[11px] font-bold text-emerald-500 mt-0.5">{formatINR(sipResults.estimatedReturns)}</div>
                        </div>
                        <div className="bg-slate-950/40 p-2 rounded-lg border border-[#d4af37]/20">
                          <div className="text-[9px] text-slate-400 font-medium">Total Value</div>
                          <div className="text-[11px] font-bold text-[#fbbf24] mt-0.5">{formatINR(sipResults.totalValue)}</div>
                        </div>
                      </div>

                      <button
                        onClick={() => processUserMessage("Start Advisory Quote Setup", "lead-gen")}
                        className="w-full bg-[#d4af37]/15 hover:bg-[#d4af37]/25 text-[#fbbf24] hover:text-white font-bold py-2 px-3 rounded-lg text-xs transition-all flex items-center justify-center gap-1.5 border border-[#d4af37]/25"
                      >
                        Plan Advisory Strategy with Nageshwar
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    </motion.div>
                  )}

                  {/* CUSTOM RENDER TYPE: Lead Generation wizard */}
                  {msg.sender === "bot" && msg.customType === "lead-gen" && leadStep <= 4 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-slate-900/95 border border-amber-500/20 rounded-xl p-4 space-y-4 shadow-xl"
                    >
                      <div className="flex justify-between items-center border-b border-white/5 pb-2">
                        <span className="text-xs font-bold text-slate-200">Advisory Strategy Plan ({leadStep}/4)</span>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4].map((s) => (
                            <div key={s} className={`w-1.5 h-1.5 rounded-full ${s <= leadStep ? "bg-amber-500" : "bg-slate-700"}`} />
                          ))}
                        </div>
                      </div>

                      <form onSubmit={handleLeadSubmit} className="space-y-3">
                        {leadStep === 1 && (
                          <div className="space-y-2">
                            <label className="text-[10px] text-slate-400 font-semibold uppercase block">What is your Name?</label>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={leadName}
                                onChange={(e) => setLeadName(e.target.value)}
                                placeholder="Your full name"
                                className="flex-1 px-3 py-2 bg-slate-950 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-amber-500"
                                required
                                autoFocus
                              />
                              <button type="submit" className="bg-amber-500 text-slate-900 px-3.5 rounded-lg text-xs font-bold hover:bg-amber-400 transition-colors">
                                Next
                              </button>
                            </div>
                          </div>
                        )}

                        {leadStep === 2 && (
                          <div className="space-y-2">
                            <label className="text-[10px] text-slate-400 font-semibold uppercase block">Hi {leadName}, what is your Email?</label>
                            <div className="flex gap-2">
                              <input
                                type="email"
                                value={leadEmail}
                                onChange={(e) => setLeadEmail(e.target.value)}
                                placeholder="name@company.com"
                                className="flex-1 px-3 py-2 bg-slate-950 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-amber-500"
                                required
                                autoFocus
                              />
                              <button type="submit" className="bg-amber-500 text-slate-900 px-3.5 rounded-lg text-xs font-bold hover:bg-amber-400 transition-colors">
                                Next
                              </button>
                            </div>
                          </div>
                        )}

                        {leadStep === 3 && (
                          <div className="space-y-2">
                            <label className="text-[10px] text-slate-400 font-semibold uppercase block">Your Phone Number for security checks?</label>
                            <div className="flex gap-2">
                              <input
                                type="tel"
                                value={leadPhone}
                                onChange={(e) => setLeadPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                                placeholder="10-digit number"
                                className="flex-1 px-3 py-2 bg-slate-950 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                                required
                                autoFocus
                              />
                              <button type="submit" className="bg-amber-500 text-slate-900 px-3.5 rounded-lg text-xs font-bold hover:bg-amber-400 transition-colors">
                                Next
                              </button>
                            </div>
                          </div>
                        )}

                        {leadStep === 4 && (
                          <div className="space-y-2.5">
                            <label className="text-[10px] text-slate-400 font-semibold uppercase block">
                              {leadCategory === "insurance" ? "Select the Insurance Type you need:" : "Select your Target Investment Capacity:"}
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                              {(leadCategory === "insurance" 
                                ? ["🏥 Health Insurance", "🛡️ Term & Life Cover", "🚗 Motor & Fleet Cover", "🏢 Property & Industrial", "💰 Pension & Retirement", "✈️ Travel Insurance"]
                                : ["Under ₹10 Lakhs", "₹10L - ₹50 Lakhs", "₹50L - ₹1 Crore", "Above ₹1 Crore"]
                              ).map((opt) => (
                                <button
                                  type="button"
                                  key={opt}
                                  onClick={() => {
                                    setLeadTarget(opt);
                                    // Submit to database directly
                                    setTimeout(() => {
                                      submitLeadToDatabase(opt);
                                    }, 200);
                                  }}
                                  className="py-2.5 px-3 bg-slate-950 hover:bg-amber-500/20 text-slate-200 border border-white/10 rounded-lg text-left text-xs transition-colors hover:border-[#d4af37]/40"
                                >
                                  {opt}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </form>
                    </motion.div>
                  )}

                  {/* CUSTOM RENDER TYPE: Callback Scheduler */}
                  {msg.sender === "bot" && msg.customType === "callback-scheduler" && callStep === 1 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-slate-900/95 border border-amber-500/20 rounded-xl p-4 space-y-4 shadow-xl"
                    >
                      <div className="flex items-center gap-2 border-b border-white/5 pb-2">
                        <Calendar className="h-4 w-4 text-[#fbbf24]" />
                        <span className="text-xs font-bold text-slate-200">Schedule Callback Call</span>
                      </div>

                      <form onSubmit={handleCallbackSubmit} className="space-y-3">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <label className="text-[9px] text-slate-400 font-semibold uppercase">Your Name</label>
                            <input
                              type="text"
                              value={callName}
                              onChange={(e) => setCallName(e.target.value)}
                              placeholder="Name"
                              className="w-full px-2.5 py-1.5 bg-slate-950 border border-white/10 rounded-lg text-[11px] text-white focus:outline-none focus:border-amber-500"
                              required
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[9px] text-slate-400 font-semibold uppercase">Phone Number</label>
                            <input
                              type="tel"
                              value={callPhone}
                              onChange={(e) => setCallPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                              placeholder="10-digits"
                              className="w-full px-2.5 py-1.5 bg-slate-950 border border-white/10 rounded-lg text-[11px] text-white focus:outline-none focus:border-amber-500 font-mono"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9px] text-slate-400 font-semibold uppercase block">Select Date</label>
                          <input
                            type="date"
                            value={callDate}
                            onChange={(e) => setCallDate(e.target.value)}
                            min={new Date().toISOString().split("T")[0]}
                            className="w-full px-2.5 py-1.5 bg-slate-950 border border-white/10 rounded-lg text-[11px] text-white focus:outline-none focus:border-amber-500"
                            required
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9px] text-slate-400 font-semibold uppercase block">Preferred Time Slot</label>
                          <select
                            value={callSlot}
                            onChange={(e) => setCallSlot(e.target.value)}
                            className="w-full px-2.5 py-1.5 bg-slate-950 border border-white/10 rounded-lg text-[11px] text-white focus:outline-none focus:border-amber-500 cursor-pointer"
                          >
                            <option>10:00 AM - 12:00 PM</option>
                            <option>12:00 PM - 02:00 PM</option>
                            <option>02:00 PM - 04:00 PM</option>
                            <option>04:00 PM - 06:00 PM</option>
                          </select>
                        </div>

                        <button
                          type="submit"
                          className="w-full bg-[#fbbf24] hover:bg-amber-500 text-slate-950 font-bold py-2 rounded-lg text-xs transition-colors flex items-center justify-center gap-1.5 shadow-md mt-1"
                        >
                          Confirm Callback Appointment
                          <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                        </button>
                      </form>
                    </motion.div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-slate-900/90 px-4 py-3 rounded-2xl rounded-bl-none border border-white/5 shadow-inner">
                    <div className="flex gap-1.5 items-center">
                      <span className="w-1.5 h-1.5 bg-[#fbbf24] rounded-full animate-bounce" />
                      <span className="w-1.5 h-1.5 bg-[#fbbf24] rounded-full animate-bounce [animation-delay:0.15s]" />
                      <span className="w-1.5 h-1.5 bg-[#fbbf24] rounded-full animate-bounce [animation-delay:0.3s]" />
                    </div>
                  </div>
                </div>
              )}

              {/* Dynamic Quick Actions */}
              {!isLoading && (
                <div className="mt-6 space-y-2 px-1 pt-2">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2">Interactive Options</p>
                  <div className="grid grid-cols-2 gap-2">
                    {quickActions.map((action) => (
                      <button
                        key={action.id}
                        onClick={() => handleQuickAction(action)}
                        className="text-left px-3 py-2.5 bg-slate-900/80 hover:bg-slate-850 hover:border-[#d4af37]/30 text-slate-200 rounded-xl transition-all text-xs font-semibold border border-white/5 shadow-sm"
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <form onSubmit={handleSendMessage} className="p-4 bg-slate-950 border-t border-white/10 flex gap-2 items-center">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about wealth, SIP, empanelment..."
                disabled={isLoading}
                className="flex-1 px-4 py-2.5 bg-slate-900 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/40 transition-all disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="bg-[#fbbf24] hover:bg-amber-500 disabled:opacity-50 disabled:cursor-not-allowed text-slate-900 p-2.5 rounded-xl transition-colors flex items-center justify-center shrink-0 shadow-md"
              >
                <Send className="h-4 w-4" strokeWidth={2.5} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating WhatsApp button */}
      <motion.a
        href="https://wa.me/919607509586"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 280, damping: 20 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        className="fixed bottom-[104px] right-6 w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 shadow-xl flex items-center justify-center z-50 text-white hover:shadow-2xl transition-all border border-white/10 shadow-emerald-500/20"
        aria-label="Contact on WhatsApp"
      >
        <svg className="h-6.5 w-6.5 fill-current text-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.528 2.025 14.07 1 11.478 1 6.04 1 1.62 5.37 1.616 10.8c-.001 1.708.452 3.376 1.312 4.86l-.37 1.353-.984 3.595 3.69-.968.423-.226c1.554.914 3.055 1.393 4.57 1.393zm11.027-7.502c-.26-.13-1.54-.76-1.78-.85-.24-.09-.415-.13-.59.13-.175.26-.68.85-.83.99-.15.15-.3.17-.56.04-.26-.13-1.1-.405-2.096-1.292-.777-.69-1.302-1.543-1.455-1.802-.153-.26-.015-.4.12-.53.125-.118.26-.3.39-.45.13-.15.175-.26.26-.43.09-.17.045-.33-.02-.46-.067-.13-.59-1.42-.81-1.95-.215-.52-.43-.45-.59-.45-.15 0-.325-.02-.5-.02-.175 0-.46.06-.7.33-.24.26-.92.9-1.22 1.66-.02.05-.05.1-.07.15l-.01.03c-.22.56-.37 1.16-.44 1.77-.18 1.65.62 3.2 1.75 4.3l.03.03c1.23 1.21 2.76 2.06 4.4 2.47.61.15 1.24.22 1.87.21.6-.01 1.2-.09 1.78-.24.78-.2 1.4-.69 1.67-1.34.27-.65.27-1.21.19-1.33-.08-.12-.3-.19-.56-.32z"/>
        </svg>
      </motion.a>

      {/* Floating trigger button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 280, damping: 20 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 shadow-xl flex items-center justify-center z-50 text-white hover:shadow-2xl transition-all border border-white/10 shadow-amber-500/20"
        aria-label="Open AI Assistant"
      >
        <MessageCircle className="h-6.5 w-6.5 text-white" strokeWidth={2.2} />
      </motion.button>
    </>
  );
}