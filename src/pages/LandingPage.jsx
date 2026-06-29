import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import Hero from "../components/landing/Hero.jsx";
import About from "../components/landing/About.jsx";
import Benefits from "../components/landing/Benefits.jsx";
import HowItWorks from "../components/landing/HowItWorks.jsx";
import CTA from "../components/landing/CTA.jsx";
import Footer from "../components/landing/Footer.jsx";

export default function LandingPage() {
  const { hash } = useLocation();

  // Scroll suave a la sección indicada por el hash (p. ej. "/#que-es").
  useEffect(() => {
    if (!hash) return;
    const el = document.getElementById(hash.slice(1));
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, [hash]);

  return (
    <>
      <main className="landing">
        <Hero />
        <About />
        <Benefits />
        <HowItWorks />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
