"use client";
// Registro único de GSAP + plugins (todos gratuitos desde a 3.13) e eases com nomes próprios.
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { Flip } from "gsap/Flip";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { CustomEase } from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";

let ready = false;
export function setupGsap() {
  if (ready || typeof window === "undefined") return gsap;
  gsap.registerPlugin(ScrollTrigger, SplitText, Flip, DrawSVGPlugin, CustomEase, useGSAP);
  CustomEase.create("ess.out", "0.22,1,0.36,1");
  CustomEase.create("ess.inOut", "0.65,0,0.35,1");
  CustomEase.create("ess.draw", "0.45,0,0.2,1");
  CustomEase.create("ess.in", "0.55,0,1,0.45");
  ScrollTrigger.config({ ignoreMobileResize: true });
  ready = true;
  return gsap;
}
setupGsap();

export const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export { gsap, ScrollTrigger, SplitText, Flip, DrawSVGPlugin, CustomEase, useGSAP };
