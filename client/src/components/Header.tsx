import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

import { useLanguage } from "@/lib/i18n";
import { Globe } from "lucide-react";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { t, language, setLanguage } = useLanguage();

  const NAV_ITEMS = [
    { label: t("nav.home"), href: "/" },
    { label: t("nav.umrah"), href: "/#umrah" },
    { label: t("nav.tours"), href: "/#tours" },
    { label: t("nav.about"), href: "/#about" },
    { label: t("nav.contacts"), href: "/#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    if (location !== "/") {
      window.location.href = `/${id}`;
      return;
    }

    // Remove the leading # or /#
    const elementId = id.replace(/^#/, "").replace(/^\/#/, "");
    if (!elementId) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md py-3"
          : "bg-transparent py-6",
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            {/* Simple Text Logo for elegance if no image provided */}
            <div className="flex flex-col">
              <span
                className={cn(
                  "font-heading font-bold text-2xl tracking-tight transition-colors",
                  isScrolled ? "text-primary" : "text-white",
                )}
              >
                SHIFA
              </span>
              <span
                className={cn(
                  "text-xs tracking-[0.3em] uppercase transition-colors",
                  isScrolled ? "text-foreground" : "text-white/80",
                )}
              >
                Travel
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                onClick={() =>
                  scrollToSection(item.href.split("/").pop() || "")
                }
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary relative group",
                  isScrolled ? "text-foreground" : "text-white",
                )}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* Language Switcher (Desktop) */}
          <button
            onClick={() => setLanguage(language === "ru" ? "kz" : "ru")}
            className={cn(
              "hidden md:flex items-center gap-2 px-3 py-1 rounded-full font-medium transition-colors",
              isScrolled
                ? "text-foreground hover:bg-black/5"
                : "text-white hover:bg-white/10",
            )}
          >
            <Globe size={18} />
            <span className="text-sm">{language === "ru" ? "RU" : "KZ"}</span>
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className={cn(
              "hidden md:block px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300",
              isScrolled
                ? "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20"
                : "bg-white text-primary hover:bg-white/90",
            )}
          >
            {language === "ru" ? "Связаться" : "Байланыс"}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-primary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className={isScrolled ? "text-foreground" : "text-white"} />
            ) : (
              <Menu className={isScrolled ? "text-foreground" : "text-white"} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white shadow-xl md:hidden border-t"
          >
            <nav className="flex flex-col p-4">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.label}
                  onClick={() =>
                    scrollToSection(item.href.split("/").pop() || "")
                  }
                  className="py-3 text-left text-foreground hover:text-primary font-medium border-b border-gray-100 last:border-0"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => scrollToSection("contact")}
                className="mt-4 w-full py-3 bg-primary text-white rounded-lg font-semibold"
              >
                {language === "ru" ? "Связаться" : "Байланыс"}
              </button>

              {/* Language Switcher (Mobile) */}
              <button
                onClick={() => setLanguage(language === "ru" ? "kz" : "ru")}
                className="mt-4 w-full py-3 border border-gray-200 text-foreground rounded-lg font-semibold flex items-center justify-center gap-2"
              >
                <Globe size={18} />
                <span>{language === "ru" ? "Русский" : "Қазақша"}</span>
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
