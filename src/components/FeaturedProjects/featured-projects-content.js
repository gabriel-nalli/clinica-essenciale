import { serviceCategories } from "@/data/clinicData";

const featuredProjectsContent = serviceCategories.map((service) => ({
  info: service.eyebrow,
  title: service.title,
  description: service.description,
  image: service.image,
  alt: service.alt,
  items: service.items,
}));

export default featuredProjectsContent;
