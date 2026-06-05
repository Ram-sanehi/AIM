import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is a SEBI Registered Investment Advisor?",
    answer:
      "A SEBI Registered Investment Advisor (RIA) is a financial professional licensed by the Securities and Exchange Board of India under the SEBI (Investment Advisers) Regulations, 2013. Unlike mutual fund distributors who earn commissions, RIAs are fee-only fiduciaries — legally required to act in your best interest. Alpha Investment Management holds SEBI Registration No. INA000017348.",
  },
  {
    question: "How do you charge for your advisory services?",
    answer:
      "We operate on a transparent, fee-only model. Our advisory fees are charged directly to you — either as a fixed annual retainer or as a percentage of assets under advisory (AUA). We do not earn commissions, trail fees, or referral incentives from any product provider. This eliminates conflicts of interest entirely.",
  },
  {
    question: "What is the minimum investment required to get started?",
    answer:
      "There is no fixed minimum investment for our advisory services. We work with clients at various wealth stages — from first-time investors to high-net-worth families. What matters more is your commitment to a long-term financial plan. We will structure a solution appropriate to your current financial position.",
  },
  {
    question: "How do you manage risk in volatile markets?",
    answer:
      "Risk management is embedded at every layer of our advisory process. We begin with a detailed risk profiling assessment, then construct portfolios with appropriate asset allocation across equity, debt, and liquid instruments. We avoid concentrated positions, use systematic rebalancing, and avoid market-timing speculation. Our goal is consistent, risk-adjusted growth — not maximum short-term returns.",
  },
  {
    question: "Do you assist with tax planning and tax optimization?",
    answer:
      "Yes. Tax efficiency is a core component of our portfolio construction and advisory. We optimize asset location, manage capital gains tax liability through systematic tax-loss harvesting, and plan distributions to minimize your overall tax burden. We also guide HNI clients on tax-efficient succession and estate planning.",
  },
  {
    question: "How is my portfolio monitored after the initial investment?",
    answer:
      "We conduct quarterly portfolio reviews covering performance attribution, risk metrics, goal alignment, and market developments. You receive a written portfolio report each quarter. Additionally, we proactively reach out during significant market events or whenever rebalancing is required. You always have direct access to your advisor.",
  },
  {
    question: "Are you a fiduciary? What does that mean for me?",
    answer:
      "Yes — as a SEBI Registered Investment Advisor, we are legally bound to a fiduciary standard. This means every recommendation we make must be in your best interest, not in the interest of any product manufacturer or distributor. We cannot accept any commission, kickback, or incentive from third parties. Your interest comes first — always.",
  },
  {
    question: "How often will I receive portfolio updates and reports?",
    answer:
      "You receive a comprehensive portfolio report quarterly, including performance analysis, allocation review, and goal progress tracking. For active clients, we also provide monthly summary updates and real-time alerts for significant portfolio events. Annual reviews include a full financial health assessment and strategy recalibration.",
  },
  {
    question: "Is my personal and financial data kept secure?",
    answer:
      "Absolutely. We adhere to strict data confidentiality protocols. Your personal and financial information is never shared with third parties without your explicit consent. We use secure, encrypted communication channels and comply with all applicable data protection regulations. Your privacy is a fundamental part of our fiduciary commitment.",
  },
];

export function FAQSection() {
  return (
    <section className="py-24 bg-card/20 border-t border-border/15" aria-labelledby="faq-heading">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid lg:grid-cols-12 gap-14 items-start">

          {/* Left header — sticky on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4 lg:sticky lg:top-28 space-y-5 text-left"
          >
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-[9px] font-bold tracking-widest uppercase text-primary mb-3">
                <HelpCircle className="h-3 w-3 text-primary" /> Common Questions
              </span>
              <h2 id="faq-heading" className="text-3xl font-display font-bold leading-tight">
                Frequently <span className="gold-text">Asked Questions</span>
              </h2>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed font-light">
              Answers to the questions we hear most often from prospective and existing clients.
              If you have a question not covered here, please{" "}
              <a href="/contact" className="text-primary hover:text-primary/80 transition-colors underline underline-offset-2 font-medium">
                reach out directly
              </a>.
            </p>
          </motion.div>

          {/* Right accordion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-8"
          >
            <Accordion type="single" collapsible className="space-y-0 divide-y divide-border/25">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-0 first:border-t border-border/25 py-1"
                >
                  <AccordionTrigger className="text-left text-sm font-semibold text-foreground hover:text-primary transition-colors duration-200 hover:no-underline py-4 gap-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground/85 leading-relaxed font-light pb-5 pr-8 text-left">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
