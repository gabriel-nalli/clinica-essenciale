import Hero from "@/components/sections/Hero/Hero";
import Clinica from "@/components/sections/Clinica/Clinica";
import Tratamentos from "@/components/sections/Tratamentos/Tratamentos";
import Resultados from "@/components/sections/Resultados/Resultados";
import Equipe from "@/components/sections/Equipe/Equipe";
import Espaco from "@/components/sections/Espaco/Espaco";
import Contato from "@/components/sections/Contato/Contato";
import Duvidas from "@/components/sections/Duvidas/Duvidas";
import Conversar from "@/components/sections/Conversar/Conversar";
import Footer from "@/components/sections/Footer/Footer";

export default function Home() {
  return (
    <>
      <main id="conteudo">
        <Hero />
        <Clinica />
        <Tratamentos />
        <Resultados />
        <Equipe />
        <Espaco />
        <Contato />
        <Duvidas />
        <Conversar />
      </main>
      <Footer />
    </>
  );
}
