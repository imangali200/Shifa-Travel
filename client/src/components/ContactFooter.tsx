import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertInquirySchema, type InsertInquiry } from "@shared/schema";
import { useCreateInquiry } from "@/hooks/use-inquiries";
import { SectionTitle } from "./SectionTitle";
import { MapPin, Phone, Instagram, Facebook, Send } from "lucide-react";
import { motion } from "framer-motion";

import { useLanguage } from "@/lib/i18n";

export function ContactFooter() {
  const { t } = useLanguage();
  const { mutate, isPending } = useCreateInquiry();

  const form = useForm<InsertInquiry>({
    resolver: zodResolver(insertInquirySchema),
    defaultValues: {
      name: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = (data: InsertInquiry) => {
    mutate(data, {
      onSuccess: () => {
        const message = `Жаңа өтінім сайтыннан!\nАты: ${data.name}\nТелефон: ${data.phone}\nХабарлама: ${data.message || "Жоқ"}`;
        const whatsappUrl = `https://wa.me/77087563192?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, "_blank");
        form.reset();
      },
    });
  };

  return (
    <footer
      id="contact"
      className="bg-foreground text-white pt-24 pb-12 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <SectionTitle
              subtitle={t("footer.title")}
              title={t("footer.title")}
              className="text-white mb-8"
              centered={false}
            />

            <div className="space-y-8 text-white/80">
              <p className="text-lg leading-relaxed">{t("footer.rights")}</p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/20 rounded-lg text-primary">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Наш адрес</h4>
                    <p>
                      г. Ташкент, Миробадский район,
                      <br />
                      улица Амира Темура, дом 43, квартира 41.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/20 rounded-lg text-primary">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">
                      {t("form.phone")}
                    </h4>
                    <a
                      href="tel:+77087563192"
                      className="hover:text-primary transition-colors text-lg"
                    >
                      +7 708 756 31 92
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-sm">
                  {t("footer.socials")}
                </h4>
                <div className="flex gap-4">
                  <a
                    href="https://www.instagram.com/shifa_travel/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors duration-300"
                  >
                    <Instagram size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-3xl p-8 md:p-12 text-foreground shadow-2xl">
            <h3 className="text-2xl font-heading font-bold mb-6">
              {t("form.title")}
            </h3>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-muted-foreground">
                  {t("form.name")}
                </label>
                <input
                  {...form.register("name")}
                  className="w-full px-4 py-3 rounded-xl bg-secondary border-2 border-transparent focus:bg-white focus:border-primary focus:outline-none transition-all duration-200"
                  placeholder="Абдуллах"
                />
                {form.formState.errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {form.formState.errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-muted-foreground">
                  {t("form.phone")}
                </label>
                <input
                  {...form.register("phone")}
                  className="w-full px-4 py-3 rounded-xl bg-secondary border-2 border-transparent focus:bg-white focus:border-primary focus:outline-none transition-all duration-200"
                  placeholder="+998 90 123 45 67"
                />
                {form.formState.errors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {form.formState.errors.phone.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-muted-foreground">
                  {t("form.message")}
                </label>
                <textarea
                  {...form.register("message")}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-secondary border-2 border-transparent focus:bg-white focus:border-primary focus:outline-none transition-all duration-200 resize-none"
                  placeholder="Я хочу узнать больше о туре..."
                />
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="w-full py-4 bg-primary text-white font-bold rounded-xl shadow-lg hover:bg-primary/90 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? t("form.sending") : t("form.submit")}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-white/10 text-center text-white/40 text-sm">
          <p>
            © {new Date().getFullYear()} Shifa Travel. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
