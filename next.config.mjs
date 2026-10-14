/** @type {import('next').NextConfig} */
const nextConfig = {
  // Rotas legadas do template antigo apontam para a âncora equivalente da home.
  async redirects() {
    return [
      { source: "/blueprints", destination: "/#resultados", permanent: false },
      { source: "/sample-space", destination: "/#resultados", permanent: false },
      { source: "/connect", destination: "/#contato", permanent: false },
      { source: "/spaces", destination: "/#tratamentos", permanent: false },
      { source: "/studio", destination: "/#clinica", permanent: false },
    ];
  },
};

export default nextConfig;
