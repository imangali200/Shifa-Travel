import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tour } from "@/types/tour";
import {
  Calendar,
  MapPin,
  Check,
  Star,
  Clock,
  Bed,
  Plane,
  ShieldCheck,
  Soup,
  Car,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n";

interface TourDetailModalProps {
  tour: Tour | null;
  image?: string;
  isOpen: boolean;
  onClose: () => void;
}

export function TourDetailModal({
  tour,
  image,
  isOpen,
  onClose,
}: TourDetailModalProps) {
  const { t } = useLanguage();

  if (!tour) return null;

  const getWhatsAppLink = () => {
    const message = `Здравствуйте! Мені "${tour.tourName}" туры қызықтырады.\n\nМәліметтер:\n- Күні: ${tour.startDate}\n- Бағасы: ${tour.price} ${tour.currency}`;
    return `https://wa.me/77087563192?text=${encodeURIComponent(message)}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl p-0 gap-0 border-none bg-white">
        {/* Header/Image Section */}
        <div className="relative h-64 sm:h-80">
          <img
            src={
              image ||
              "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=1200"
            }
            alt={tour.tourName}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {tour.typeTour}
              </span>
              <div className="flex items-center text-amber-400">
                {[...Array(tour.hotelCategory)].map((_, i) => (
                  <Star key={i} size={14} className="fill-amber-400" />
                ))}
              </div>
            </div>
            <DialogTitle className="text-3xl font-bold text-white mb-1">
              {tour.tourName}
            </DialogTitle>
            <div className="flex items-center text-white/90 text-sm">
              <MapPin size={16} className="mr-1" />
              {tour.cityFrom} &rarr; {tour.cityTo}
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-50 p-4 rounded-2xl flex flex-col items-center text-center">
              <Clock className="text-primary mb-2" size={20} />
              <span className="text-xs text-muted-foreground uppercase font-semibold">
                Ұзақтығы
              </span>
              <span className="font-bold">{tour.day} күн</span>
            </div>
            <div className="bg-gray-50 p-4 rounded-2xl flex flex-col items-center text-center">
              <Calendar className="text-primary mb-2" size={20} />
              <span className="text-xs text-muted-foreground uppercase font-semibold">
                Күні
              </span>
              <span className="font-bold">{tour.startDate}</span>
            </div>
            <div className="bg-gray-50 p-4 rounded-2xl flex flex-col items-center text-center">
              <Bed className="text-primary mb-2" size={20} />
              <span className="text-xs text-muted-foreground uppercase font-semibold">
                Қонақүй
              </span>
              <span className="font-bold">{tour.hotelDistance} м</span>
            </div>
            <div className="bg-gray-50 p-4 rounded-2xl flex flex-col items-center text-center">
              <Users className="text-primary mb-2" size={20} />
              <span className="text-xs text-muted-foreground uppercase font-semibold">
                Орындар
              </span>
              <span className="font-bold">{tour.availableSeats}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Inclusions Section */}
            <div>
              <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                <ShieldCheck className="text-primary" size={20} />
                {t("modal.included")}
              </h4>
              <ul className="space-y-3">
                {tour.flightIncluded && (
                  <li className="flex items-start gap-3 text-sm text-gray-700">
                    <Plane size={18} className="text-emerald-500 mt-0.5" />
                    <span>{t("modal.flight")}</span>
                  </li>
                )}
                {tour.visaIncluded && (
                  <li className="flex items-start gap-3 text-sm text-gray-700">
                    <Check size={18} className="text-emerald-500 mt-0.5" />
                    <span>{t("modal.visa")}</span>
                  </li>
                )}
                {tour.foodIncluded && (
                  <li className="flex items-start gap-3 text-sm text-gray-700">
                    <Soup size={18} className="text-emerald-500 mt-0.5" />
                    <span>{t("modal.food")}</span>
                  </li>
                )}
                {tour.transferIncluded && (
                  <li className="flex items-start gap-3 text-sm text-gray-700">
                    <Car size={18} className="text-emerald-500 mt-0.5" />
                    <span>{t("modal.transfer")}</span>
                  </li>
                )}
                {tour.ziyarateIncluded && (
                  <li className="flex items-start gap-3 text-sm text-gray-700">
                    <MapPin size={18} className="text-emerald-500 mt-0.5" />
                    <span>{t("modal.ziyarat")}</span>
                  </li>
                )}
                {tour.guideIncluded && (
                  <li className="flex items-start gap-3 text-sm text-gray-700">
                    <Users size={18} className="text-emerald-500 mt-0.5" />
                    <span>{t("modal.guide")}</span>
                  </li>
                )}
              </ul>
            </div>

            {/* Price section */}
            <div className="bg-primary/5 p-6 rounded-3xl border border-primary/10 flex flex-col justify-between">
              <div>
                <span className="text-sm text-primary font-bold uppercase tracking-wider">
                  {t("modal.price")}
                </span>
                <div className="text-4xl font-black text-primary mt-1">
                  {tour.price} {tour.currency}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {t("modal.per_person")}
                </p>
              </div>
              <Button
                onClick={() => window.open(getWhatsAppLink(), "_blank")}
                className="w-full mt-6 bg-primary hover:bg-primary/90 text-white font-bold h-12 rounded-xl text-md"
              >
                {t("modal.book")}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
