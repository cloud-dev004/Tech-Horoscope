import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Send, Loader2, CheckCircle2 } from "lucide-react";
import { useContactForm } from "../hooks/useContactForm";

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    submitStatus,
    toastMessage,
  } = useContactForm();
  const prefersReducedMotion = useReducedMotion();
  const [showSuccessText, setShowSuccessText] = useState(false);

  useEffect(() => {
    if (submitStatus === "success") {
      setShowSuccessText(true);
      const timer = setTimeout(() => setShowSuccessText(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  return (
    <div className="relative w-full">
      <form onSubmit={handleSubmit} className="space-y-[20px] w-full">
        {/* Anti-spam Honeypot */}
        <div style={{ display: "none" }} aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input
            {...register("website")}
            id="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="grid sm:grid-cols-2 grid-cols-1 gap-[20px]">
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="text-sm font-medium text-[var(--text-label)]"
            >
              Name
            </label>
            <input
              {...register("name")}
              id="name"
              type="text"
              autoComplete="name"
              aria-label="Name"
              aria-required="true"
              aria-invalid={!!errors.name}
              className="w-full bg-[var(--bg)] border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50 transition-shadow min-h-[48px] placeholder:text-[var(--text-muted)] text-[clamp(14px,2.5vw,16px)] text-[var(--text-primary)]"
              placeholder="Your Name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-[var(--text-label)]"
            >
              Email
            </label>
            <input
              {...register("email")}
              id="email"
              type="email"
              autoComplete="email"
              aria-label="Email"
              aria-required="true"
              aria-invalid={!!errors.email}
              className="w-full bg-[var(--bg)] border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50 transition-shadow min-h-[48px] placeholder:text-[var(--text-muted)] text-[clamp(14px,2.5vw,16px)] text-[var(--text-primary)]"
              placeholder="Your Email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-2 flex flex-col">
          <label
            htmlFor="message"
            className="text-sm font-medium text-[var(--text-label)]"
          >
            Message
          </label>
          <textarea
            {...register("message")}
            id="message"
            autoComplete="off"
            aria-label="Message"
            aria-required="true"
            aria-invalid={!!errors.message}
            className="w-full bg-[var(--bg)] border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50 transition-shadow resize-y min-h-[150px] sm:min-h-[180px] lg:min-h-[220px] placeholder:text-[var(--text-muted)] text-[clamp(14px,2.5vw,16px)] text-[var(--text-primary)] block"
            placeholder="Tell me about your project..."
          />
          {errors.message && (
            <p className="text-red-500 text-sm">{errors.message.message}</p>
          )}
        </div>

        <motion.button
          type="submit"
          disabled={isSubmitting || showSuccessText}
          whileHover={
            prefersReducedMotion || isSubmitting || showSuccessText
              ? {}
              : { y: -2 }
          }
          whileTap={
            prefersReducedMotion || isSubmitting || showSuccessText
              ? {}
              : { scale: 0.98 }
          }
          transition={{ duration: 0.2 }}
          className={`w-full flex items-center justify-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white h-[54px] rounded-lg font-medium transition-colors text-[clamp(16px,2.5vw,18px)] ${
            isSubmitting
              ? "cursor-wait opacity-70"
              : showSuccessText
                ? "bg-green-600 hover:bg-green-600 cursor-default"
                : ""
          }`}
        >
          {isSubmitting ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              <span>Sending...</span>
            </>
          ) : showSuccessText ? (
            <>
              <span>Message Sent ✓</span>
            </>
          ) : (
            <>
              <span>Send Message</span>
              <Send size={18} />
            </>
          )}
        </motion.button>
      </form>

      {/* Premium Toast Notification */}
      <AnimatePresence>
        {submitStatus && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className={`fixed bottom-6 right-6 z-50 px-6 py-4 rounded-xl shadow-2xl backdrop-blur-md border font-medium text-sm flex items-start gap-3 whitespace-pre-line max-w-[calc(100vw-3rem)] ${
              submitStatus === "success"
                ? "bg-green-500/10 border-green-500/20 text-green-400"
                : "bg-red-500/10 border-red-500/20 text-red-400"
            }`}
          >
            {submitStatus === "success" ? (
              <CheckCircle2 size={20} className="mt-0.5 shrink-0" />
            ) : (
              <span className="text-lg leading-none mt-0.5 shrink-0">!</span>
            )}
            <div>{toastMessage}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactForm;
