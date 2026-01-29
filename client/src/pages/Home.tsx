import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { AboutUmrah } from "@/components/AboutUmrah";
import { UmrahSteps } from "@/components/UmrahSteps";
import { Tours } from "@/components/Tours";
import { ContactFooter } from "@/components/ContactFooter";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white min-h-screen font-body"
    >
      <Header />
      <Hero />
      <AboutUmrah />
      <UmrahSteps />
      <Tours />
      <ContactFooter />
    </motion.div>
  );
}
