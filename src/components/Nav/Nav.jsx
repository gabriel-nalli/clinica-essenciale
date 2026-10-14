"use client";

import "./Nav.css";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import SplitText from "gsap/SplitText";
import { useLenis } from "lenis/react";

import { clinic } from "@/data/clinicData";
import MenuBtn from "../MenuBtn/MenuBtn";

gsap.registerPlugin(SplitText, CustomEase);

const menuLinks = [
  ["Início", "#inicio"],
  ["Tratamentos", "#tratamentos"],
  ["Resultados", "#resultados"],
  ["Especialistas", "#especialistas"],
  ["A clínica", "#clinica"],
  ["Contato", "#contato"],
];

export default function Nav() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const isInitializedRef = useRef(false);
  const splitTextRefs = useRef([]);
  const pendingAnchorRef = useRef(null);
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    if (isOpen) lenis.stop();
    else lenis.start();
  }, [lenis, isOpen]);

  useLayoutEffect(() => {
    CustomEase.create(
      "hop",
      "M0,0 C0.354,0 0.464,0.133 0.498,0.502 0.532,0.872 0.651,1 1,1"
    );

    const menu = menuRef.current;
    if (!menu) return undefined;

    splitTextRefs.current.forEach((split) => split?.revert());
    splitTextRefs.current = [];
    gsap.set(menu, { clipPath: "circle(0% at 50% 50%)" });

    menu.querySelectorAll("h2, .menu-meta p").forEach((element) => {
      const split = SplitText.create(element, {
        type: "lines",
        mask: "lines",
        linesClass: "split-line",
        aria: "none",
        tag: "span",
      });
      gsap.set(split.lines, { y: "120%" });
      splitTextRefs.current.push(split);
    });

    isInitializedRef.current = true;

    return () => {
      splitTextRefs.current.forEach((split) => split?.revert());
      splitTextRefs.current = [];
      document.body.classList.remove("menu-open");
    };
  }, []);

  const animateMenu = useCallback((open) => {
    const menu = menuRef.current;
    if (!menu) return;
    setIsAnimating(true);

    if (open) {
      document.body.classList.add("menu-open");
      gsap.to(menu, {
        clipPath: "circle(100% at 50% 50%)",
        ease: "power3.out",
        duration: 1.6,
        onStart: () => {
          menu.style.pointerEvents = "all";
          splitTextRefs.current.forEach((split, index) => {
            gsap.to(split.lines, {
              y: "0%",
              stagger: 0.045,
              delay: 0.25 + index * 0.06,
              duration: 0.9,
              ease: "power4.out",
            });
          });
        },
        onComplete: () => setIsAnimating(false),
      });
      return;
    }

    const textTimeline = gsap.timeline({
      onComplete: () => {
        gsap.to(menu, {
          clipPath: "circle(0% at 50% 50%)",
          ease: "power3.out",
          duration: 0.9,
          onComplete: () => {
            menu.style.pointerEvents = "none";
            splitTextRefs.current.forEach((split) =>
              gsap.set(split.lines, { y: "120%" })
            );
            document.body.classList.remove("menu-open");
            setIsAnimating(false);

            const anchor = pendingAnchorRef.current;
            pendingAnchorRef.current = null;
            if (anchor) {
              window.requestAnimationFrame(() => {
                document.querySelector(anchor)?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              });
            }
          },
        });
      },
    });

    splitTextRefs.current.forEach((split, index) => {
      textTimeline.to(
        split.lines,
        {
          y: "-120%",
          stagger: 0.025,
          duration: 0.65,
          ease: "power3.in",
        },
        index * 0.025
      );
    });
  }, []);

  useEffect(() => {
    if (isInitializedRef.current) animateMenu(isOpen);
  }, [isOpen, animateMenu]);

  const toggleMenu = useCallback(() => {
    if (!isAnimating && isInitializedRef.current) {
      setIsOpen((current) => !current);
    }
  }, [isAnimating]);

  const handleLinkClick = (event, href) => {
    event.preventDefault();
    pendingAnchorRef.current = href;
    setIsOpen(false);
  };

  return (
    <div>
      <MenuBtn isOpen={isOpen} toggleMenu={toggleMenu} />
      <div className="menu" ref={menuRef} aria-hidden={!isOpen} inert={!isOpen}>
        <div className="menu-wrapper">
          <div className="col col-1">
            <nav className="links" aria-label="Navegação principal">
              {menuLinks.map(([label, href]) => (
                <div className="link" key={href}>
                  <a href={href} onClick={(event) => handleLinkClick(event, href)}>
                    <h2>{label}</h2>
                  </a>
                </div>
              ))}
            </nav>
          </div>
          <div className="col col-2">
            <div className="socials">
              <div className="sub-col">
                <div className="menu-meta menu-commissions">
                  <p>Agendamentos</p>
                  <a href={clinic.whatsapp} target="_blank" rel="noreferrer">
                    <p>WhatsApp</p>
                  </a>
                  <a href={clinic.phoneHref}><p>{clinic.phone}</p></a>
                </div>
                <div className="menu-meta">
                  <p>Endereço</p>
                  <p>{clinic.address.street}</p>
                  <p>{clinic.address.city}</p>
                </div>
              </div>
              <div className="sub-col">
                <div className="menu-meta">
                  <p>Social</p>
                  <a href={clinic.instagram} target="_blank" rel="noreferrer">
                    <p>Instagram ↗</p>
                  </a>
                  <a href={clinic.mapUrl} target="_blank" rel="noreferrer">
                    <p>Como chegar ↗</p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
