export const clinic = {
  name: "Clínica Essenciale Saúde e Estética",
  shortName: "Essenciale",
  phone: "(88) 98220-2548",
  phoneHref: "tel:+5588982202548",
  // Chat direto (antes apontava para o catálogo do WhatsApp). Mensagem pré-preenchida.
  whatsapp:
    "https://wa.me/5588982202548?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Essenciale%20e%20gostaria%20de%20agendar%20uma%20avalia%C3%A7%C3%A3o.",
  instagram: "https://www.instagram.com/essencialemn/",
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=R.+Raul+Nogueira%2C+63%2C+Centro%2C+Morada+Nova%2C+CE%2C+62940-035",
  mapEmbed:
    "https://www.google.com/maps?q=R.%20Raul%20Nogueira%2C%2063%2C%20Centro%2C%20Morada%20Nova%2C%20CE%2C%2062940-035&output=embed",
  hours: "Consulte os horários disponíveis pelo WhatsApp.",
  address: {
    landmark: "Em frente ao Mercado do Peixe, no centro de Morada Nova.",
    street: "R. Raul Nogueira, 63 – Centro",
    city: "Morada Nova – CE",
    zip: "CEP 62940-035",
  },
};

export const highlights = [
  { value: "Multi", label: "Atendimento multiespecialidades" },
  { value: "21h", label: "Clínico geral de plantão" },
  { value: "10x", label: "Parcelamento disponível" },
  { value: "15272", label: "CRO-CE da responsável técnica" },
];

export const serviceCategories = [
  {
    id: "odontologia",
    eyebrow: "Saúde bucal • atendimento completo",
    title: "Odontologia",
    description:
      "Cuidado odontológico pensado para diferentes necessidades, da urgência à reabilitação do sorriso, com avaliação individual e planejamento claro.",
    items: ["Urgências", "Próteses", "Lentes e facetas", "Implantes"],
    image: "/images/essenciale/generated/odontologia.webp",
    alt: "Dentista conversando com paciente em consultório acolhedor",
  },
  {
    id: "estetica",
    eyebrow: "Precisão • equilíbrio • naturalidade",
    title: "Estética avançada",
    description:
      "Protocolos personalizados para valorizar traços, cuidar da pele e construir resultados compatíveis com a identidade e os objetivos de cada pessoa.",
    items: [
      "Harmonização facial",
      "Limpeza de pele",
      "Peeling químico",
      "Microagulhamento",
    ],
    image: "/images/essenciale/optimized/resultado-labial-depois.webp",
    alt: "Detalhe de resultado real de procedimento labial",
  },
  {
    id: "bem-estar",
    eyebrow: "Pele • corpo • bem-estar",
    title: "Cuidado estético",
    description:
      "Uma rotina de autocuidado acompanhada por profissionais, com recursos para a pele, o corpo e momentos de pausa que fazem sentido para você.",
    items: [
      "Depilação a laser",
      "Massagem relaxante",
      "Drenagem e detox",
      "Tratamentos faciais",
    ],
    image: "/images/essenciale/generated/cuidado-estetico-v2.webp",
    alt: "Paciente recebendo aplicação de sérum durante cuidado estético facial",
  },
  {
    id: "saude-integrada",
    eyebrow: "Um só lugar • cuidado conectado",
    title: "Saúde integrada",
    description:
      "Consultas, exames e suporte multidisciplinar para tornar a jornada de cuidado mais simples, próxima e coordenada em Morada Nova.",
    items: [
      "Consultas médicas",
      "Exames laboratoriais e cardiológicos",
      "Home care",
      "Aplicação de injetáveis",
      "Cartões-presente e parcelamento em até 10x",
    ],
    image: "/images/essenciale/generated/clinica-interior.webp",
    alt: "Imagem conceitual de ambiente de clínica multidisciplinar",
  },
];

export const team = [
  {
    id: "lara-rabelo",
    name: "Dra. Lara Rabelo",
    role: "CEO, fundadora e responsável técnica",
    specialties: "Estética avançada • CRO-CE 15272 • EPAO 2503",
    description:
      "À frente da Essenciale, conduz uma proposta de cuidado integrado que aproxima saúde, estética e confiança.",
    image: "/images/essenciale/optimized/lara-rabelo.webp",
    alt: "Dra. Lara Rabelo, CEO e fundadora da Clínica Essenciale",
    imagePosition: "center 15%",
  },
  {
    id: "daynara-elen",
    name: "Daynara Elen",
    role: "Esteticista",
    specialties: "Estética facial e corporal",
    description:
      "Cuidado atento para construir protocolos de pele e corpo de acordo com a necessidade e o momento de cada pessoa.",
    image: "/images/essenciale/optimized/daynara-elen.webp", // foto real (a versão gerada por IA foi descartada)
    alt: "Daynara Elen com jaleco branco, esteticista da Clínica Essenciale",
    imagePosition: "center 16%",
  },
  {
    id: "aline-borges",
    name: "Aline Borges",
    role: "Esteticista",
    specialties: "Cuidados com a pele e bem-estar",
    description:
      "Um olhar próximo para acompanhar tratamentos estéticos com escuta, orientação e atenção aos detalhes.",
    image: "/images/essenciale/optimized/aline-borges.webp",
    alt: "Aline Borges, esteticista da Clínica Essenciale",
    imagePosition: "center 14%",
  },
];

export const results = [
  {
    id: 1,
    title: "Contorno e equilíbrio labial",
    before: "/images/essenciale/optimized/resultado-labial-antes.webp",
    after: "/images/essenciale/optimized/resultado-labial-depois.webp",
  },
  {
    id: 2,
    title: "Resultado real Essenciale",
    image: "/images/essenciale/optimized/resultado-labial-01.webp",
  },
];

export const faq = [
  {
    question: "Como agendar uma avaliação?",
    answer:
      "Fale com a equipe pelo WhatsApp. Por lá você consulta os horários disponíveis e recebe orientação sobre o atendimento mais adequado.",
  },
  {
    question: "Qual tratamento é indicado para mim?",
    answer:
      "A indicação depende de avaliação profissional, objetivos e histórico individual. A equipe apresenta as possibilidades com clareza antes de qualquer procedimento.",
  },
  {
    question: "A clínica oferece parcelamento?",
    answer:
      "Sim. Há possibilidade de parcelamento em até 10x. Consulte condições, serviços elegíveis e formas de pagamento diretamente com a equipe.",
  },
  {
    question: "Onde fica a Essenciale?",
    answer:
      "Na R. Raul Nogueira, 63, Centro, em frente ao Mercado do Peixe, no centro de Morada Nova – CE.",
  },
  {
    question: "Quais são os horários de atendimento?",
    answer: "Consulte os horários disponíveis pelo WhatsApp.",
  },
];
