import "./globals.css";
import "@/components/shell/shell.css";
import { Instrument_Sans } from "next/font/google";
import localFont from "next/font/local";
import { ShellProvider } from "@/components/shell/ShellContext";
import Preloader from "@/components/shell/Preloader";
import SiteHeader from "@/components/shell/SiteHeader";
import MenuOverlay from "@/components/shell/MenuOverlay";
import Dock from "@/components/shell/Dock";
import IntentToast from "@/components/shell/IntentToast";
import SmoothScroll from "@/components/shell/SmoothScroll";
import RevealController from "@/components/motion/RevealController";

const instrument = Instrument_Sans({
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
  variable: "--font-instrument",
  adjustFontFallback: true,
});
const newsreader = localFont({
  src: "../fonts/newsreader-italic-72-300-latin.woff2",
  weight: "300",
  style: "italic",
  display: "swap",
  preload: false,
  variable: "--font-newsreader",
  adjustFontFallback: "Times New Roman",
});
const arrows = localFont({
  src: "../fonts/instrument-sans-arrows.woff2",
  weight: "500",
  display: "swap",
  variable: "--font-arrows",
  declarations: [{ prop: "unicode-range", value: "U+2194, U+2197" }],
  adjustFontFallback: false, // senão o fallback gerado (sem unicode-range) captura todos os glifos
});

export const metadata = {
  title: "Clínica Essenciale | Saúde e Estética em Morada Nova",
  description:
    "Odontologia, harmonização, estética, exames e atendimento multiespecialidades em Morada Nova, Ceará.",
  openGraph: {
    title: "Clínica Essenciale Saúde e Estética",
    description:
      "Saúde, estética e confiança em cada detalhe. Consulte horários e atendimentos pelo WhatsApp.",
    locale: "pt_BR",
    type: "website",
  },
};

export const viewport = {
  themeColor: "#faf6f1",
  viewportFit: "cover",
};

// Roda antes da pintura: decide se o preloader aparece (só 1ª visita, sem movimento reduzido/Save-Data/hash).
const gate = `(function(){var d=document.documentElement;try{var r=matchMedia('(prefers-reduced-motion: reduce)').matches;var c=navigator.connection;var sd=!!(c&&c.saveData);d.classList.add('js');if(!r)d.classList.add('js-motion');var seen=true;try{seen=!!localStorage.getItem('ess:intro')}catch(e){}d.setAttribute('data-intro',(!r&&!sd&&!seen&&!location.hash)?'run':'skip')}catch(e){d.setAttribute('data-intro','skip')}})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className={`${instrument.variable} ${newsreader.variable} ${arrows.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: gate }} />
      </head>
      <body>
        <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
        <ShellProvider>
          <SmoothScroll />
          <Preloader />
          <SiteHeader />
          <MenuOverlay />
          {children}
          <Dock />
          <IntentToast />
          <RevealController />
        </ShellProvider>
      </body>
    </html>
  );
}
