import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionTitleProps {
  subtitle?: string;
  title: string;
  className?: string;
  centered?: boolean;
}

export function SectionTitle({ subtitle, title, className, centered = true }: SectionTitleProps) {
  return (
    <div className={cn("mb-12", centered ? "text-center" : "text-left", className)}>
      {subtitle && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block text-primary font-bold text-sm uppercase tracking-wider mb-2"
        >
          {subtitle}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground"
      >
        {title}
      </motion.h2>
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: 80 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className={cn("h-1 bg-primary mt-6 rounded-full", centered ? "mx-auto" : "")}
      />
    </div>
  );
}
