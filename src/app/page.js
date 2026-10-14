"use client";

import "./index.css";
import "./preloader.css";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CustomEase from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";

import { clinic, highlights } from "@/data/clinicData";
import Nav from "@/components/Nav/Nav";
import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";
import AnimatedButton from "@/components/AnimatedButton/AnimatedButton";
import FeaturedProjects from "@/components/FeaturedProjects/FeaturedProjects";
import TeamCards from "@/components/TeamCards/TeamCards";
import CTAWindow from "@/components/CTAWindow/CTAWindow";
import Copy from "@/components/Copy/Copy";
import ResultsShowcase from "@/components/ResultsShowcase/ResultsShowcase";
import Location from "@/components/Location/Location";
import FAQ from "@/components/FAQ/FAQ";
import WhatsAppExperience from "@/components/WhatsAppExperience/WhatsAppExperience";

let isInitialLoad = true;

gsap.registerPlugin(ScrollTrigger, CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");

export default function Home() {
  const tagsRef = useRef(null);
  const [showPreloader, setShowPreloader] = useState(isInitialLoad);
  const [loaderAnimating, setLoaderAnimating] = useState(isInitialLoad);
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    if (loaderAnimating) lenis.stop();
    else lenis.start();
  }, [lenis, loaderAnimating]);

  useEffect(() => {
    if (!showPreloader) return undefined;

    const loaderLimit = window.setTimeout(() => {
      gsap.set(".hero .line", { y: "0%" });
      gsap.set(".hero .btn", { scale: 1 });
      gsap.set(".hero .btn .circle", { scale: 1, opacity: 1 });
      gsap.set(".hero .btn .icon", { x: 0, opacity: 1 });
      isInitialLoad = false;
      setLoaderAnimating(false);
      setShowPreloader(false);
    }, 7000);

    return () => window.clearTimeout(loaderLimit);
  }, [showPreloader]);

  useGSAP(
    () => {
      if (!showPreloader) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        isInitialLoad = false;
        setLoaderAnimating(false);
        setShowPreloader(false);
        return;
      }

      const timeline = gsap.timeline({
        delay: 0.35,
        defaults: { ease: "hop" },
      });

      timeline.to(".word h1", { y: "0%", duration: 0.95 });
      timeline.to(".divider", {
        scaleY: 1,
        duration: 1,
      });
      timeline.to({}, { duration: 0.7 });
      timeline.to("#word-1 h1", { y: "100%", duration: 0.85 });
      timeline.to("#word-2 h1", { y: "-100%", duration: 0.85 }, "<");
      timeline.to(".divider", { opacity: 0, duration: 0.3 }, "<0.2");
      timeline.to(
        ".block",
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          duration: 1.2,
          stagger: 0.08,
          delay: 0.15,
          onStart: () => {
            gsap.to(".hero-img", { scale: 1, duration: 1.8, ease: "hop" });
          },
          onComplete: () => {
            isInitialLoad = false;
            setLoaderAnimating(false);
            setShowPreloader(false);
          },
        },
        "<"
      );

      return () => timeline.kill();
    },
    { dependencies: [showPreloader] }
  );

  useGSAP(
    () => {
      const tags = tagsRef.current?.querySelectorAll(".what-we-do-tag");
      if (!tags?.length) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(tags, { opacity: 1, x: 0 });
        return;
      }

      gsap.set(tags, { opacity: 0, x: -40 });
      ScrollTrigger.create({
        trigger: tagsRef.current,
        start: "top 90%",
        once: true,
        animation: gsap.to(tags, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
        }),
      });
    },
    { scope: tagsRef }
  );

  return (
    <>
      {showPreloader ? (
        <div
          className="loader"
          role="status"
          aria-label="Carregando Clínica Essenciale"
        >
          <div className="overlay">
            <div className="block" />
            <div className="block" />
          </div>
          <div className="intro-logo">
            <div className="word" id="word-1"><h1>Essenciale</h1></div>
            <div className="word" id="word-2"><h1>Cuidado</h1></div>
          </div>
          <div className="divider" />
        </div>
      ) : null}

      <Nav />

      <main>
        <section className="hero" id="inicio">
          <div className="hero-bg">
            <picture>
              <source
                media="(max-width: 1000px)"
                srcSet="/images/essenciale/generated/hero-mobile-v2.webp"
                type="image/webp"
              />
              <source
                srcSet="/images/essenciale/generated/hero-desktop.webp"
                type="image/webp"
              />
              <img
                className="hero-img"
                src="/images/essenciale/generated/hero-desktop.png"
                alt="Paciente em consulta acolhedora com profissional de saúde em clínica contemporânea"
                fetchPriority="high"
                decoding="async"
              />
            </picture>
          </div>
          <div className="hero-gradient" />
          <div className="container">
            <div className={`hero-content ${showPreloader ? "" : "is-ready"}`}>
              <div className="hero-kicker">
                <Copy animate={false}>
                  <p className="mono">Clínica de saúde & estética • Morada Nova</p>
                </Copy>
              </div>
              <div className="hero-header">
                <Copy animate={false}>
                  <h1>Saúde, estética e confiança em cada detalhe.</h1>
                </Copy>
              </div>
              <div className="hero-tagline">
                <Copy animate={false}>
                  <p>
                    Cuidado completo em Morada Nova: odontologia, harmonização,
                    estética, exames e atendimento multiespecialidades em um só lugar.
                  </p>
                </Copy>
              </div>
              <div className="hero-actions">
                <AnimatedButton
                  label="Agendar pelo WhatsApp"
                  route={clinic.whatsapp}
                  animate={false}
                />
                <AnimatedButton
                  label="Conhecer tratamentos"
                  route="#tratamentos"
                  animate={false}
                />
              </div>
            </div>
          </div>

          <div className="hero-stats" role="list" aria-label="Diferenciais da clínica">
            <div className="container">
              {highlights.map((highlight, index) => (
                <div className="stat" role="listitem" key={highlight.label}>
                  <div className="stat-count">
                    <Copy delay={0.1 + index * 0.08}><h2>{highlight.value}</h2></Copy>
                  </div>
                  <div className="stat-divider" />
                  <div className="stat-info">
                    <Copy delay={0.15 + index * 0.08}><p>{highlight.label}</p></Copy>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="what-we-do" id="clinica">
          <div className="container">
            <div className="what-we-do-header">
              <Copy delay={0.1}>
                <h2>
                  <span className="spacer">&nbsp;</span>
                  A Essenciale reúne diferentes especialidades para tornar o
                  cuidado mais próximo, coordenado e tranquilo — da saúde ao bem-estar.
                </h2>
              </Copy>
            </div>
            <div className="what-we-do-content">
              <div className="what-we-do-col">
                <Copy delay={0.1}><p>Por que Essenciale</p></Copy>
                <Copy delay={0.15}>
                  <p className="lg">
                    Escuta, avaliação e orientação clara em cada etapa. Você encontra
                    diferentes possibilidades de atendimento sem abrir mão de uma
                    experiência humana e individual.
                  </p>
                </Copy>
              </div>
              <div className="what-we-do-col">
                <div className="what-we-do-tags" ref={tagsRef}>
                  {["Odontologia", "Estética avançada", "Consultas médicas", "Exames", "Home care", "Cartões-presente", "Até 10x"].map((tag) => (
                    <div className="what-we-do-tag" key={tag}><span>{tag}</span></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="featured-projects-container" id="tratamentos">
          <div className="container">
            <div className="featured-projects-header-callout">
              <Copy delay={0.1}><p>Principais tratamentos</p></Copy>
            </div>
            <div className="featured-projects-header">
              <Copy delay={0.15}>
                <h2>Cuidado completo, organizado ao redor de você.</h2>
              </Copy>
            </div>
          </div>
          <FeaturedProjects />
        </section>

        <section className="treatments-cta">
          <div className="container">
            <Copy delay={0.1}>
              <h3>Não sabe por onde começar? A equipe ajuda você a entender as possibilidades.</h3>
            </Copy>
            <AnimatedButton label="Conversar com a equipe" route={clinic.whatsapp} />
          </div>
        </section>

        <ResultsShowcase />

        <section className="team-cards-section" id="especialistas">
          <div className="container team-section-heading">
            <div className="team-section-callout">
              <Copy delay={0.1}><p>Equipe Essenciale</p></Copy>
            </div>
            <Copy delay={0.15}>
              <h2>Cuidado conduzido por quem entende de você.</h2>
            </Copy>
            <Copy delay={0.2}>
              <p className="team-section-intro">
                Três profissionais, diferentes olhares e uma mesma forma de cuidar:
                com escuta, técnica e atenção ao que faz sentido para cada pessoa.
              </p>
            </Copy>
          </div>
          <TeamCards />
        </section>

        <section className="gallery-callout" aria-labelledby="gallery-clinic-title">
          <div className="container">
            <div className="gallery-callout-col">
              <div className="gallery-callout-row">
                <figure className="gallery-callout-img gallery-callout-img-1">
                  <img src="/images/essenciale/generated/clinica-interior.webp" alt="Imagem conceitual de recepção de clínica em tons claros" loading="lazy" decoding="async" />
                </figure>
                <figure className="gallery-callout-img gallery-callout-img-2">
                  <img src="/images/essenciale/generated/odontologia.webp" alt="Consulta odontológica em ambiente acolhedor" loading="lazy" decoding="async" />
                  <div className="gallery-callout-img-content">
                    <h3>Multi</h3>
                    <p>Especialidades conectadas</p>
                  </div>
                </figure>
              </div>
              <div className="gallery-callout-row">
                <figure className="gallery-callout-img gallery-callout-img-3">
                  <img src="/images/essenciale/generated/cuidado-estetico-v2.webp" alt="Paciente recebendo cuidado estético facial em ambiente clínico" loading="lazy" decoding="async" />
                </figure>
                <figure className="gallery-callout-img gallery-callout-img-4">
                  <img src="/images/essenciale/generated/exame-cardiologico-v2.webp" alt="Paciente realizando exame cardiológico com acompanhamento profissional" loading="lazy" decoding="async" />
                </figure>
              </div>
            </div>
            <div className="gallery-callout-col">
              <div className="gallery-callout-copy">
                <Copy delay={0.1}>
                  <h3 id="gallery-clinic-title">
                    Diferentes especialidades conectadas em uma jornada de cuidado
                    mais simples, da recepção ao acompanhamento.
                  </h3>
                </Copy>
                <p className="concept-note">Imagens conceituais de ambientação e atendimentos.</p>
                <AnimatedButton label="Conhecer a localização" route="#contato" />
              </div>
            </div>
          </div>
        </section>

        <CTAWindow
          img="/images/essenciale/generated/clinica-interior.webp"
          alt="Imagem conceitual de uma clínica multidisciplinar acolhedora"
          header="Essenciale"
          callout="Saúde e estética em um só lugar"
          description="Odontologia, estética, exames, consultas e suporte multidisciplinar com atendimento próximo em Morada Nova."
          imageLabel="Imagem conceitual de ambientação"
          buttonLabel="Agendar pelo WhatsApp"
          buttonRoute={clinic.whatsapp}
        />

        <Location />
        <FAQ />

        <CTAWindow
          img="/images/essenciale/generated/hero-desktop.webp"
          mobileImg="/images/essenciale/generated/hero-mobile.webp"
          alt="Consulta entre paciente e profissional de saúde em ambiente acolhedor"
          header="Vamos conversar?"
          callout="Seu cuidado começa com uma avaliação"
          description="Converse com a equipe da Essenciale e consulte horários, procedimentos e formas de pagamento."
          buttonLabel="Falar pelo WhatsApp"
          buttonRoute={clinic.whatsapp}
        />

        <ConditionalFooter />
      </main>

      <WhatsAppExperience />
    </>
  );
}
