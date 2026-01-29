import { motion } from "framer-motion";
import { SectionTitle } from "./SectionTitle";
import { Calendar, MapPin, Check, Loader2 } from "lucide-react";
import { useTours } from "@/hooks/useTours";
import { TourDetailModal } from "./TourDetailModal";
import { Tour } from "@/types/tour";
import { useState } from "react";

const DEFAULT_IMAGES = [
  "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=1000", // Medina
  "https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=1000", // Luxury hotel
  "https://images.unsplash.com/photo-1542354257-2364c7e47a94?q=80&w=1000", // Kaaba
  "https://images.unsplash.com/photo-1565552629477-cd2210870932?q=80&w=1000", // Mosque interior
  "https://images.unsplash.com/photo-1580418827493-f2b22c4385be?q=80&w=1000", // Night view
  "https://images.unsplash.com/photo-1564769662533-4f00a87b4056?q=80&w=1000", // Kaaba 2
];

import { useLanguage } from "@/lib/i18n";

export function Tours() {
  const { t } = useLanguage();
  const { data: tours, isLoading, isError } = useTours();
  const [selectedTour, setSelectedTour] = useState<{
    tour: Tour;
    image: string;
  } | null>(null);
  const [showAll, setShowAll] = useState(false);

  const activeTours =
    tours
      ?.filter((t) => t.isActive)
      .sort((a, b) => (a.priority || 0) - (b.priority || 0)) || [];

  const visibleTours = showAll ? activeTours : activeTours.slice(0, 6);

  return (
    <section id="tours" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <SectionTitle subtitle={t("tours.subtitle")} title={t("tours.title")} />

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">{t("tours.loading")}</p>
          </div>
        ) : isError ? (
          <div className="text-center py-20 text-red-500">
            <p>{t("tours.error")}</p>
          </div>
        ) : activeTours.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <p>{t("tours.no_tours")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleTours.map((tour, index) => (
              <motion.div
                key={tour.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group bg-card rounded-2xl overflow-hidden shadow-lg shadow-black/5 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 border border-border/50"
              >
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10" />
                  <img
                    src={
                      tour.imageUrl ||
                      DEFAULT_IMAGES[index % DEFAULT_IMAGES.length]
                    }
                    alt={tour.tourName}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-bold text-foreground shadow-sm">
                    {tour.price} {tour.currency}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-heading font-bold mb-3 group-hover:text-primary transition-colors">
                    {tour.tourName}
                  </h3>

                  <div className="flex flex-col gap-2 mb-6 text-muted-foreground text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-primary" />
                      <span>
                        {tour.day} дней ({tour.startDate})
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-primary" />
                      <span>
                        {tour.cityFrom} - {tour.cityTo}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check size={16} className="text-primary" />
                      <span>
                        {[
                          tour.flightIncluded && "Перелет",
                          tour.visaIncluded && "Виза",
                          tour.foodIncluded && "Питание",
                          tour.transferIncluded && "Трансфер",
                        ]
                          .filter(Boolean)
                          .join(", ")}{" "}
                        включены
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      setSelectedTour({
                        tour,
                        image:
                          tour.imageUrl ||
                          DEFAULT_IMAGES[index % DEFAULT_IMAGES.length],
                      })
                    }
                    className="w-full py-3 rounded-xl border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-all duration-300 uppercase tracking-wide text-sm"
                  >
                    {t("tours.details")}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Show More Button */}
        {!isLoading && !isError && activeTours.length > 6 && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-3 bg-white border-2 border-primary text-primary font-bold rounded-full hover:bg-primary hover:text-white transition-all duration-300 shadow-lg shadow-primary/10"
            >
              {showAll ? t("tours.show_less") : t("tours.show_more")}
            </button>
          </div>
        )}
      </div>

      <TourDetailModal
        tour={selectedTour?.tour || null}
        image={selectedTour?.image}
        isOpen={!!selectedTour}
        onClose={() => setSelectedTour(null)}
      />
    </section>
  );
}
