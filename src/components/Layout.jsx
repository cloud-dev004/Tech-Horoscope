import { Outlet, Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import Footer from "./Footer";

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  // Reset scroll to top on path change (prevents sticky scroll state across pages)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden w-full relative z-10">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[var(--bg)]/80 border-b border-[var(--color-primary)] shadow-[0_4px_20px_rgba(197, 163, 255,0.5),0_1px_8px_rgba(197, 163, 255,0.8)] transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <Link
              to="/"
              className="text-xl font-bold font-heading text-[var(--color-primary)]"
            >
              Manikandan.Dev
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8 items-center">
              <Link
                to="/about"
                className={`transition-colors font-medium text-sm ${location.pathname === "/about" ? "text-[var(--color-primary)]" : "text-[var(--text-primary)] opacity-90 hover:text-[var(--color-primary)] hover:opacity-100"}`}
              >
                About
              </Link>
              
              <Link
                to="/projects"
                className={`transition-colors font-medium text-sm ${location.pathname.startsWith("/projects") ? "text-[var(--color-primary)]" : "text-[var(--text-primary)] opacity-90 hover:text-[var(--color-primary)] hover:opacity-100"}`}
              >
                Projects
              </Link>

              <Link
                to="/contact"
                className={`transition-colors font-medium text-sm ${location.pathname === "/contact" ? "text-[var(--color-primary)]" : "text-[var(--text-primary)] opacity-90 hover:text-[var(--color-primary)] hover:opacity-100"}`}
              >
                Contact
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-3">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-[var(--text-primary)] cursor-pointer"
                aria-label="Toggle navigation menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-[var(--surface)] absolute w-full left-0 border-b border-white/10 shadow-lg">
            <div className="px-3 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                to="/about"
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 rounded-md transition-all ${location.pathname === "/about" ? "bg-[var(--bg)] text-[var(--color-primary)] font-medium" : "text-[var(--text-primary)] opacity-90 hover:bg-[var(--bg)] hover:text-[var(--color-primary)]"}`}
              >
                About
              </Link>
              <Link
                to="/projects"
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 rounded-md transition-all ${location.pathname.startsWith("/projects") ? "bg-[var(--bg)] text-[var(--color-primary)] font-medium" : "text-[var(--text-primary)] opacity-90 hover:bg-[var(--bg)] hover:text-[var(--color-primary)]"}`}
              >
                Projects
              </Link>
              <Link
                to="/contact"
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 rounded-md transition-all ${location.pathname === "/contact" ? "bg-[var(--bg)] text-[var(--color-primary)] font-medium" : "text-[var(--text-primary)] opacity-90 hover:bg-[var(--bg)] hover:text-[var(--color-primary)]"}`}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content — offset by navbar height (pt-16) */}
      <main className="flex-grow w-full pt-16">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
