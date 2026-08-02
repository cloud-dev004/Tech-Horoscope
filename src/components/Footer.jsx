import { Link } from "react-router-dom";
import { Mail, FileText } from "lucide-react";
import { Github, Linkedin } from "./icons/SocialIcons";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const FooterLink = ({ to, label, isExternal = false }) => {
  const content = (
    <span className="relative group overflow-visible inline-block">
      <span className="text-[var(--text-primary)] group-hover:text-[var(--color-primary)] transition-colors duration-300 font-medium">
        {label}
      </span>
      <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-[var(--color-primary)] transition-all duration-300 group-hover:w-full group-hover:shadow-[0_0_8px_rgba(249,115,22,0.6)]" />
    </span>
  );

  if (isExternal) {
    return (
      <a
        href={to}
        target="_blank"
        rel="noopener noreferrer"
        className="block py-1"
      >
        {content}
      </a>
    );
  }
  return (
    <Link to={to} className="block py-1">
      {content}
    </Link>
  );
};

const SocialIcon = ({ href, icon: Icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="w-10 h-10 rounded-full flex items-center justify-center bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--color-primary)] hover:bg-[rgba(249,115,22,0.1)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_5px_15px_rgba(249,115,22,0.2)]"
  >
    <Icon size={18} />
  </a>
);

const Footer = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <footer
      ref={ref}
      className="relative w-full bg-[#050505] pt-24 pb-8 overflow-hidden z-20 border-t border-[rgba(255,255,255,0.02)]"
    >
      {/* Soft Top Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-[rgba(249,115,22,0.3)] to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-[150px] bg-[rgba(249,115,22,0.03)] blur-[50px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8 mb-16">
          {/* Left: Branding */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-center md:items-start text-center md:text-left space-y-4"
          >
            <Link
              to="/"
              className="text-2xl font-bold font-heading text-[var(--color-primary)] tracking-wide"
            >
             Manikandan
            </Link>
            <p className="text-[var(--text-secondary)] leading-relaxed max-w-xs text-sm">
               Tech Horoscope
            </p>
          </motion.div>

          {/* Middle: Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="flex flex-col items-center md:items-start"
          >
            <h4 className="text-[var(--text-primary)] font-heading font-semibold tracking-wider mb-6 text-sm uppercase">
              Navigation
            </h4>
            <div className="grid grid-cols-2 gap-x-12 gap-y-3">
              <FooterLink to="/about" label="About" />
            
              <FooterLink to="/contact" label="Contact" />
            </div>
          </motion.div>

          {/* Right: Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="flex flex-col items-center md:items-end"
          >
            <h4 className="text-[var(--text-primary)] font-heading font-semibold tracking-wider mb-6 text-sm uppercase">
              Connect
            </h4>
            <div className="flex gap-4">
              <SocialIcon
                href="https://github.com/cloud-dev004"
                icon={Github}
                label="GitHub"
              />
              <SocialIcon
                href="https://www.linkedin.com/in/peratchi-manikandan-672454383/"
                icon={Linkedin}
                label="LinkedIn"
              />
              
              <SocialIcon href="/PERATCHI_MANIKANDAN_M.pdf" icon={FileText} label="Resume" />
            </div>
          </motion.div>
        </div>

        {/* Bottom: Divider & Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="pt-8 border-t border-[rgba(255,255,255,0.06)] flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[var(--text-secondary)] font-medium tracking-wide"
        >
          
          <p>
            Designed &amp; Developed by{" "}
            <span className="text-[var(--text-primary)]">
              Peratchi Manikandan
            </span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
