import { team } from "@/data/clinicData";

const clientReviewsContent = team.map((professional) => ({
  id: professional.id,
  name: professional.name,
  title: professional.role,
  meta: professional.specialties,
  image: professional.image,
  avatar: professional.image,
  alt: professional.alt,
  review: professional.description,
}));

export default clientReviewsContent;
