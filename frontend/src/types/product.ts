export interface Product {
  id: string;
  slug?: string;
  name: string;
  category: string;
  shortDescription: string;
  description: string;
  image: string;
  imagePublicId?: string;
  composition: string[];
  uses: string[];
  benefits: string[];
  dosage: string;
  packaging: string;
  storage: string;
  manufacturing: string;
}
