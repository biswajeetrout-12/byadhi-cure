export interface Address {
  line1: string;
  line2: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

export interface CompanyInfo {
  name: string;
  shortName: string;
  tagline: string;
  intro: string;
  aboutIntro: string;
  seoTitle?: string;
  seoDescription?: string;
  founded: number;
  address: Address;
  phone: string;
  altPhone: string;
  email: string;
  workingHours: string;
  social: SocialLink[];
}

export interface Highlight {
  value: string;
  label: string;
  detail: string;
}

export interface ValueItem {
  title: string;
  body: string;
}

export interface DirectorInfo {
  name: string;
  designation: string;
  bio: string;
  message: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  body: string;
}

export interface InfrastructureItem {
  title: string;
  body: string;
}
