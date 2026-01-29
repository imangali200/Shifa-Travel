import { motion } from "framer-motion";

import { useLanguage } from "@/lib/i18n";

export function Hero() {
  const { t } = useLanguage();
  const scrollToTours = () => {
    document.getElementById("tours")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/40 z-10" />
        {/* Kaaba image from Unsplash */}
        <img
          src="/images/hero-mosque.png"
          alt="Kaaba Mecca"
          className="w-full h-full object-cover scale-105 animate-slow-zoom"
          style={{ animation: "zoom 20s infinite alternate" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto space-y-8"
        >
          <span className="inline-block py-1 px-4 rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-sm text-sm tracking-wider uppercase font-medium">
            {t("hero.bismillah")}
          </span>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white leading-tight">
            {t("hero.title")}
          </h1>

          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-light leading-relaxed">
            {t("hero.subtitle")}
          </p>

          <div className="pt-8">
            <button
              onClick={scrollToTours}
              className="px-10 py-4 bg-primary text-white text-lg font-bold rounded-full hover:bg-primary/90 hover:scale-105 transition-all duration-300 shadow-lg shadow-primary/30 border-2 border-primary ring-4 ring-primary/20"
            >
              {t("hero.cta")}
            </button>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white flex flex-col items-center gap-2"
      >
        <span className="text-xs uppercase tracking-widest opacity-70">
          Листайте вниз
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-white to-transparent" />
      </motion.div>
    </div>
  );
}
