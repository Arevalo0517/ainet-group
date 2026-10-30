// TODO: reemplazar número y correo reales antes de publicar.
export const config = {
  whatsapp: "5216640000000",
  email: "hola@ainet.mx",
  instagram: {
    group: "https://instagram.com/ainet_group",
    healthcare: "https://instagram.com/ainet_healthcare",
    hospitality: "https://instagram.com/ainet_hospitality",
  },
};

export const waLink = (text: string) =>
  `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(text)}`;
