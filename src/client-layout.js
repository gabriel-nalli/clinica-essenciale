"use client";
import { useEffect, useState } from "react";

import { ReactLenis } from "lenis/react";
import { ViewTransitions } from "next-view-transitions";

export default function ClientLayout({ children }) {
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1000);
    };

    checkMobile();

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(motionQuery.matches);

    const checkMotion = (event) => setPrefersReducedMotion(event.matches);

    window.addEventListener("resize", checkMobile);
    motionQuery.addEventListener("change", checkMotion);

    return () => {
      window.removeEventListener("resize", checkMobile);
      motionQuery.removeEventListener("change", checkMotion);
    };
  }, []);

  const scrollSettings = prefersReducedMotion
    ? {
        duration: 0,
        smoothWheel: false,
        syncTouch: false,
      }
    : isMobile
    ? {
        duration: 0.55,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: "vertical",
        gestureDirection: "vertical",
        smooth: true,
        smoothTouch: false,
        touchMultiplier: 1,
        infinite: false,
        lerp: 0.09,
        wheelMultiplier: 1,
        orientation: "vertical",
        smoothWheel: false,
        syncTouch: false,
      }
    : {
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: "vertical",
        gestureDirection: "vertical",
        smooth: true,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
        lerp: 0.1,
        wheelMultiplier: 1,
        orientation: "vertical",
        smoothWheel: true,
        syncTouch: true,
      };

  return (
    <ViewTransitions>
      <ReactLenis root options={scrollSettings}>
        {children}
      </ReactLenis>
    </ViewTransitions>
  );
}
