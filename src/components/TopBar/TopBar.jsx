"use client";
import "./TopBar.css";

import { useRef, useEffect } from "react";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import AnimatedButton from "../AnimatedButton/AnimatedButton";
import { clinic } from "@/data/clinicData";

gsap.registerPlugin(ScrollTrigger);

const TopBar = () => {
  const topBarRef = useRef(null);
  let lastScrollY = 0;
  let isScrolling = false;

  useEffect(() => {
    const topBar = topBarRef.current;
    if (!topBar) return;

    const topBarHeight = topBar.offsetHeight;

    gsap.set(topBar, { y: 0 });

    const handleScroll = () => {
      if (isScrolling) return;

      isScrolling = true;
      const currentScrollY = window.scrollY;
      const direction = currentScrollY > lastScrollY ? 1 : -1;

      if (direction === 1 && currentScrollY > 50) {
        gsap.to(topBar, {
          y: -topBarHeight,
          duration: 1,
          ease: "power4.out",
        });
      } else if (direction === -1) {
        gsap.to(topBar, {
          y: 0,
          duration: 1,
          ease: "power4.out",
        });
      }

      lastScrollY = currentScrollY;

      setTimeout(() => {
        isScrolling = false;
      }, 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (topBarRef.current) {
      gsap.set(topBarRef.current, { y: 0 });
    }
  });

  return (
    <header className="top-bar" ref={topBarRef}>
      <div className="top-bar-logo">
        <a href="#inicio" onClick={(event) => {
          event.preventDefault();
          document.querySelector("#inicio")?.scrollIntoView({ behavior: "smooth" });
        }} aria-label="Essenciale — início">
          <img
            src="/images/essenciale/generated/essenciale-mark.svg"
            alt=""
          />
          <span>
            <strong>essenciale</strong>
            <small>saúde & estética</small>
          </span>
        </a>
      </div>
      <div className="top-bar-cta">
        <AnimatedButton
          label="Agendar"
          route={clinic.whatsapp}
          animate={false}
        />
      </div>
    </header>
  );
};

export default TopBar;
