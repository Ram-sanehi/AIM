import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { sendContactFormEmail } from "@/api/email";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().trim().min(10, "Phone number must be at least 10 digits").max(15, "Phone number must be less than 15 digits"),
  subject: z.string().trim().min(5, "Subject must be at least 5 characters").max(200, "Subject must be less than 200 characters"),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(1000, "Message must be less than 1000 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const { toast } = useToast();

  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      // Validate form data
      const validatedData = contactSchema.parse(formData);

      // Submit to Supabase
      const { error } = await supabase.from("contact_submissions").insert([
        {
          name: validatedData.name,
          email: validatedData.email,
          phone: validatedData.phone,
          subject: validatedData.subject,
          message: validatedData.message,
        },
      ]);

      if (error) throw error;

      // Send email via Resend
      try {
        await sendContactFormEmail(
          validatedData.name,
          validatedData.email,
          validatedData.phone,
          validatedData.subject,
          validatedData.message
        );
      } catch (emailError) {
        console.error("Email send error:", emailError);
        // Don't fail the form submission if email fails
      }

      setIsSuccess(true);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you soon.",
      });

      // Reset success state after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof ContactFormData] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        toast({
          title: "Error",
          description: "Failed to send message. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-2xl p-6 md:p-8 space-y-6 border border-border/30 bg-gradient-to-b from-slate-900/40 via-slate-950/20 to-slate-950/10 shadow-lg shadow-primary/[0.01] hover:border-primary/20 transition-all duration-300"
      onSubmit={handleSubmit}
    >
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground/80 pl-1">
            Full Name *
          </Label>
          <Input
            id="name"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full bg-[#030712]/50 border-border/30 focus-visible:ring-primary/20 focus-visible:border-primary/45 rounded-xl h-11 text-sm placeholder:text-muted-foreground/45 transition-all duration-300 ${
              errors.name ? "border-destructive focus-visible:ring-destructive/20 focus-visible:border-destructive" : ""
            }`}
            disabled={isSubmitting}
          />
          {errors.name && (
            <p className="text-xs text-destructive flex items-center gap-1.5 pl-1 pt-0.5">
              <AlertCircle className="h-3 w-3" /> {errors.name}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground/80 pl-1">
            Email Address *
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={handleChange}
            className={`w-full bg-[#030712]/50 border-border/30 focus-visible:ring-primary/20 focus-visible:border-primary/45 rounded-xl h-11 text-sm placeholder:text-muted-foreground/45 transition-all duration-300 ${
              errors.email ? "border-destructive focus-visible:ring-destructive/20 focus-visible:border-destructive" : ""
            }`}
            disabled={isSubmitting}
          />
          {errors.email && (
            <p className="text-xs text-destructive flex items-center gap-1.5 pl-1 pt-0.5">
              <AlertCircle className="h-3 w-3" /> {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground/80 pl-1">
            Phone Number *
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="Enter your mobile number"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full bg-[#030712]/50 border-border/30 focus-visible:ring-primary/20 focus-visible:border-primary/45 rounded-xl h-11 text-sm placeholder:text-muted-foreground/45 transition-all duration-300 ${
              errors.phone ? "border-destructive focus-visible:ring-destructive/20 focus-visible:border-destructive" : ""
            }`}
            disabled={isSubmitting}
          />
          {errors.phone && (
            <p className="text-xs text-destructive flex items-center gap-1.5 pl-1 pt-0.5">
              <AlertCircle className="h-3 w-3" /> {errors.phone}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="subject" className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground/80 pl-1">
            Subject *
          </Label>
          <Input
            id="subject"
            name="subject"
            placeholder="How can we help you?"
            value={formData.subject}
            onChange={handleChange}
            className={`w-full bg-[#030712]/50 border-border/30 focus-visible:ring-primary/20 focus-visible:border-primary/45 rounded-xl h-11 text-sm placeholder:text-muted-foreground/45 transition-all duration-300 ${
              errors.subject ? "border-destructive focus-visible:ring-destructive/20 focus-visible:border-destructive" : ""
            }`}
            disabled={isSubmitting}
          />
          {errors.subject && (
            <p className="text-xs text-destructive flex items-center gap-1.5 pl-1 pt-0.5">
              <AlertCircle className="h-3 w-3" /> {errors.subject}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground/80 pl-1">
          Message *
        </Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Tell us about your financial goals or requirements..."
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className={`w-full bg-[#030712]/50 border-border/30 focus-visible:ring-primary/20 focus-visible:border-primary/45 rounded-xl text-sm placeholder:text-muted-foreground/45 transition-all duration-300 ${
            errors.message ? "border-destructive focus-visible:ring-destructive/20 focus-visible:border-destructive" : ""
          }`}
          disabled={isSubmitting}
        />
        {errors.message && (
          <p className="text-xs text-destructive flex items-center gap-1.5 pl-1 pt-0.5">
            <AlertCircle className="h-3 w-3" /> {errors.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full gold-gradient text-primary-foreground hover:opacity-95 font-semibold h-12 rounded-xl shadow-lg shadow-primary/5 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]"
        disabled={isSubmitting || isSuccess}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Sending...
          </>
        ) : isSuccess ? (
          <>
            <CheckCircle className="mr-2 h-5 w-5" />
            Message Sent!
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            Send Message
          </>
        )}
      </Button>
    </motion.form>
  );
}
