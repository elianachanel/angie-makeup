"use client";

import { Onboarding } from "@/components/Onboarding";
import { ScrollToTopOnLoad } from "@/components/ScrollToTopOnLoad";
import { AmbientGlow } from "@/components/layout/AmbientGlow";
import { FloatingContact } from "@/components/layout/FloatingContact";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { About } from "@/components/sections/About";
import { Booking } from "@/components/sections/Booking";
import { Contact } from "@/components/sections/Contact";
import { Gallery } from "@/components/sections/Gallery";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Testimonials } from "@/components/sections/Testimonials";

export default function Home() {
  return (
    <>
      <ScrollToTopOnLoad />
      <Onboarding />
      <AmbientGlow />
      <Navbar />
      <main className="relative z-[2]">
        <Hero />
        <About />
        <Services />
        <Gallery />
        <Booking />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <FloatingContact />
    </>
  );
}
