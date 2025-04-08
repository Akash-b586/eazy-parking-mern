"use client";

import { useState, useEffect } from "react";
import Header from "../components/landing/Header";
import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import UserActions from "../components/landing/UserActions";
import AdminPreview from "../components/landing/AdminPreview";
import Locations from "../components/landing/Locations";
import Testimonials from "../components/landing/Testimonials";
import CTA from "../components/landing/CTA";
import WorldMap from "../components/landing/WorldMap";
import Footer from "../components/landing/Footer";
import { dots } from "../utils/Dots";

export default function Home() {
  const [currentCityIndex, setCurrentCityIndex] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkIfMobile = (): void => setIsMobile(window.innerWidth < 768);
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white ">
      <div className="max-w-screen-xl mx-auto">
      <Header isMobile={isMobile} />
      <Hero />
      <Features />
      <UserActions />
      <AdminPreview />
      <Locations currentCityIndex={currentCityIndex} setCurrentCityIndex={setCurrentCityIndex} />
      <Testimonials />
      <CTA />
      <WorldMap dots={dots} />
      <Footer />
      </div>
    </div>
  );
}