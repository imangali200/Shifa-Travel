import { motion } from "framer-motion";
import { SectionTitle } from "./SectionTitle";
import { User, RefreshCcw, Mountain, Scissors } from "lucide-react";

const STEPS = [
  {
    id: 1,
    title: "Ихрам",
    description: "Вступление в состояние духовной чистоты с намерением совершить паломничество. Паломники облачаются в специальную одежду.",
    icon: User,
  },
  {
    id: 2,
    title: "Таваф",
    description: "Семь кругов вокруг Каабы, главной святыни Ислама, сопровождаемые молитвами.",
    icon: RefreshCcw,
  },
  {
    id: 3,
    title: "Са’й",
    description: "Прохождение семь раз между холмами Сафа и Марва, что символизирует поиски Хаджар воды для её сына Исмаила.",
    icon: Mountain,
  },
  {
    id: 4,
    title: "Тахаллуль",
    description: "Обряд пострижения или укорачивания волос, знаменующий завершение паломничества.",
    icon: Scissors,
  },
];

export function UmrahSteps() {
  return (
    <section id="steps" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <SectionTitle
          subtitle="РИТУАЛЫ"
          title="Умра – шаг за шагом"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {STEPS.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white rounded-xl p-8 shadow-lg shadow-black/5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-border group"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300 text-primary">
                <step.icon size={28} strokeWidth={1.5} />
              </div>
              
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-foreground text-white text-xs font-bold">
                  {step.id}
                </span>
                <h3 className="text-xl font-heading font-bold text-foreground">{step.title}</h3>
              </div>
              
              <p className="text-muted-foreground leading-relaxed text-sm">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
