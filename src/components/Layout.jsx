import { Outlet, Link, useLocation } from "react-router-dom";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import CoverSection from "./CoverSection";
import Footer from "./Footer";

const Layout = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Reset scroll to top on path change (prevents sticky scroll state across pages)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <div className="min-h-screen flex flex-col">
      {isHome && <CoverSection />}

      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-[var(--bg)]/80 border-b border-[var(--surface)] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <Link
              to="/"
              className="text-xl font-bold font-heading text-[var(--color-primary)]"
            >
              Tech Horoscope
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8 items-center">
              <Link
                to="/about"
                className="text-[var(--text-primary)] opacity-90 hover:text-[var(--color-primary)] hover:opacity-100 transition-all"
              >
                About
              </Link>
              
              <Link
                to="/contact"
                className="text-[var(--text-primary)] opacity-90 hover:text-[var(--color-primary)] hover:opacity-100 transition-all"
              >
                Contact
              </Link>
             
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-[var(--surface)] hover:text-[var(--color-orange)] transition-colors"
                aria-label="Toggle theme"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-[var(--text-primary)]"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-[var(--surface)] absolute w-full left-0 border-b border-white/10">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                to="/about"
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-[var(--text-primary)] opacity-90 hover:bg-[var(--bg)] hover:text-[var(--color-primary)] hover:opacity-100 transition-all"
              >
                About
              </Link>
              <Link
                to="/projects"
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-[var(--text-primary)] opacity-90 hover:bg-[var(--bg)] hover:text-[var(--color-primary)] hover:opacity-100 transition-all"
              >
                Projects
              </Link>
              <Link
                to="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-[var(--text-primary)] opacity-90 hover:bg-[var(--bg)] hover:text-[var(--color-primary)] hover:opacity-100 transition-all"
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content — no max-width, sections handle their own layout */}
      <main className="flex-grow w-full">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
