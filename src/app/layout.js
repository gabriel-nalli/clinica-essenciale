import "./globals.css";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import "@fontsource/manrope/700.css";
import "@fontsource/dm-mono/400.css";
import "@fontsource/dm-mono/500.css";
import ClientLayout from "@/client-layout";
import TopBar from "@/components/TopBar/TopBar";

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

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <ClientLayout>
          <TopBar />
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
