import { motion } from "framer-motion";
import { Mail, Smartphone } from "lucide-react";
import ContactForm from "../components/ContactForm.jsx";

const Contact = () => {
  return (
    <div className="max-w-5xl mx-auto py-[clamp(60px,10vw,120px)] px-6 lg:px-8 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-[clamp(40px,8vw,64px)]"
      >
        <h1 className="text-[clamp(32px,5vw,48px)] font-bold mb-4 text-[var(--text-primary)]">
          Let's build something{" "}
          <span className="text-[var(--color-primary)]">together.</span>
        </h1>
        <p className="text-[var(--text-secondary)] text-[clamp(16px,2vw,18px)] max-w-2xl mx-auto px-4">
          I'm currently open for new opportunities. Whether you have a question
          or just want to say hi, I'll try my best to get back to you!
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-10 lg:gap-12 max-w-[700px] lg:max-w-none mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-1 space-y-5 lg:space-y-8 flex flex-col items-center lg:items-start w-full"
        >
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-3 lg:gap-4 p-6 lg:p-0 bg-[var(--surface)] lg:bg-transparent rounded-2xl w-full max-w-[400px] lg:max-w-none mx-auto lg:mx-0 text-center lg:text-left border border-white/5 lg:border-transparent">
            <div className="p-3 bg-[var(--bg)] lg:bg-[var(--surface)] rounded-full text-[var(--color-primary)] shrink-0">
              <Mail size={24} />
            </div>
            <div className="w-full min-w-0">
              <h3 className="font-semibold text-lg mb-1 text-[var(--text-label)]">
                Email
              </h3>
              <p
                className="text-[var(--text-tech)] text-[clamp(14px,3vw,16px)] break-words w-full"
                style={{ wordBreak: "break-word", overflowWrap: "anywhere" }}
              >
                peratchimanikandan7@gmail.com
              </p>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-3 lg:gap-4 p-6 lg:p-0 bg-[var(--surface)] lg:bg-transparent rounded-2xl w-full max-w-[400px] lg:max-w-none mx-auto lg:mx-0 text-center lg:text-left border border-white/5 lg:border-transparent">
            <div className="p-3 bg-[var(--bg)] lg:bg-[var(--surface)] rounded-full text-[var(--color-primary)] shrink-0">
              <Smartphone size={24} />
            </div>
            <div className="w-full min-w-0">
              <h3 className="font-semibold text-lg mb-1 text-[var(--text-label)]">
                Mobile Number
              </h3>
              <p className="text-[var(--text-tech)] text-[clamp(14px,3vw,16px)] break-words">
                +91 8610968634
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 w-full max-w-[450px] lg:max-w-none mx-auto bg-[var(--surface)] p-6 lg:p-8 rounded-2xl border border-white/5"
        >
          <ContactForm />
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
