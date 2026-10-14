"use client";

import "./TeamCards.css";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { team } from "@/data/clinicData";

const TeamCards = () => {
  const cardsRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const context = gsap.context(() => {
      const cards = gsap.utils.toArray(".team-card");
      const isMobile = window.matchMedia("(max-width: 1000px)").matches;

      cards.forEach((card, index) => {
        if (index === cards.length - 1) return;

        const cardInner = card.querySelector(".team-card-inner");
        const nextCard = cards[index + 1];

        gsap.fromTo(
          cardInner,
          { y: "0%", z: 0, rotationX: 0 },
          {
            y: "-50%",
            z: -250,
            rotationX: 45,
            ease: "none",
            scrollTrigger: {
              trigger: nextCard,
              start: isMobile ? "top 85%" : "top 100%",
              end: "top -75%",
              scrub: true,
              pin: card,
              pinSpacing: false,
            },
          }
        );

        gsap.to(cardInner, {
          "--team-overlay-opacity": 1,
          ease: "none",
          scrollTrigger: {
            trigger: nextCard,
            start: "top 75%",
            end: "top 0%",
            scrub: true,
          },
        });
      });
    }, cardsRef);

    return () => context.revert();
  }, []);

  return (
    <div className="team-cards" ref={cardsRef}>
      {team.map((professional, index) => {
        const details = professional.specialties.split(" • ");

        return (
          <article className="team-card" key={professional.id}>
            <div className="team-card-inner">
              <div className="team-card-content">
                <div className="team-card-topline">
                  <p>{professional.role}</p>
                  <span aria-hidden="true">
                    {String(index + 1).padStart(2, "0")} / {String(team.length).padStart(2, "0")}
                  </span>
                </div>

                <div className="team-card-copy">
                  {index === 0 ? (
                    <p className="team-founder-label">CEO &amp; fundadora</p>
                  ) : null}
                  <h2>{professional.name}</h2>
                  <p className="team-card-description">{professional.description}</p>
                  <div
                    className="team-card-details"
                    role="list"
                    aria-label={`Informações de ${professional.name}`}
                  >
                    {details.map((detail) => (
                      <span role="listitem" key={detail}>{detail}</span>
                    ))}
                  </div>
                </div>
              </div>

              <figure className="team-card-image">
                <img
                  src={professional.image}
                  alt={professional.alt}
                  loading="lazy"
                  decoding="async"
                  style={{ objectPosition: professional.imagePosition }}
                />
                <figcaption>
                  <span>Equipe Essenciale</span>
                  <strong>{professional.name}</strong>
                </figcaption>
              </figure>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default TeamCards;
