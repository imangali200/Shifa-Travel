import { motion } from "framer-motion";
import { SectionTitle } from "./SectionTitle";

import { useLanguage } from "@/lib/i18n";

export function AboutUmrah() {
  const { t } = useLanguage();
  return (
    <section
      id="about"
      className="py-20 md:py-32 bg-white relative overflow-hidden"
    >
      {/* Decorative pattern */}
      <div className="absolute top-0 right-0 w-64 h-64 opacity-5 pointer-events-none">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#D4AF37"
            d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.2,-19.2,95.8,-5.2C93.5,8.9,82,22.1,70.9,33.1C59.8,44.1,49.1,52.9,37.3,60.5C25.5,68.1,12.7,74.5,-1.2,76.6C-15.1,78.7,-29.3,76.5,-41.8,69.5C-54.3,62.5,-65.1,50.7,-73.4,37.3C-81.7,23.9,-87.5,8.9,-85.4,-5.1C-83.3,-19.1,-73.3,-32.1,-62.4,-41.6C-51.5,-51.1,-39.7,-57.1,-27.9,-65.7C-16.1,-74.3,-4.3,-85.5,5.6,-95.2L15.5,-104.9"
            transform="translate(100 100)"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <SectionTitle
              subtitle={t("about.subtitle")}
              title={t("about.title")}
              centered={false}
              className="mb-8"
            />

            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>{t("about.text1")}</p>
              <p>{t("about.text2")}</p>
              <p>{t("about.text3")}</p>
            </div>
          </motion.div>

          {/* Image Grid */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 mt-12">
                {/* Pilgrim praying */}
                <img
                  src="https://pixabay.com/get/g862f945f7db569cb4bd9c958815a0154d5448e7973d92af957fd318166800b3f54e468f52cb46dde6002a90e9b41b5551ebc3454e3a09c8fd3c5dea6e1a14fec_1280.jpg"
                  alt="Praying at Mosque"
                  className="rounded-2xl shadow-xl h-64 w-full object-cover"
                />
                <div className="bg-primary/10 p-6 rounded-2xl border border-primary/20">
                  <h3 className="font-heading font-bold text-xl mb-2 text-primary">
                    Священная Мекка
                  </h3>
                  <p className="text-sm text-foreground/80">
                    Сердце исламского мира, где каждый камень дышит историей.
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-foreground p-6 rounded-2xl text-white shadow-xl">
                  <h3 className="font-heading font-bold text-xl mb-2 text-primary break-all hyphens-auto">
                    Умиротворение
                  </h3>
                  <p className="text-sm text-white/80">
                    Найдите покой в молитвах и поклонении.
                  </p>
                </div>
                {/* Quran */}
                <img
                  src="https://images.unsplash.com/photo-1609599006353-e629aaabfeae?q=80&w=1000&auto=format&fit=crop"
                  alt="Quran"
                  className="rounded-2xl shadow-xl h-80 w-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
