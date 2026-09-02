import Company from "../models/Company.js";

const defaultCompany = {
  name: "Byadhi Cure Lab Private Limited",
  shortName: "Byadhi Cure Lab",
  tagline: "Trusted pharmaceutical manufacturing for a healthier tomorrow",
  intro: "Byadhi Cure Lab Private Limited is a pharmaceutical company focused on reliable healthcare manufacturing across neurological, orthopedic, cardiovascular, diabetic and hypertension care. Our work brings together formulation knowledge, controlled production systems and documented quality checks so that healthcare partners receive consistent products supported by accountable processes.",
  aboutIntro: "Byadhi Cure Lab Private Limited was established to build a dependable pharmaceutical manufacturing partner for healthcare businesses and patients. From raw-material qualification and controlled dispensing through manufacturing, testing, packing and release, our teams follow documented processes designed to protect product quality and traceability. The company continues to develop its capabilities across neurological, orthopedic, cardiovascular, diabetic, hypertension and nutritional-support categories while investing in people, equipment and quality systems for responsible long-term growth.",
  founded: 2023,
  address: {
    line1: "Plot 1537/2418, Phase II",
    line2: "Bhagabanpur",
    city: "Bhubaneswar, Odisha",
    postalCode: "751003",
    country: "India",
  },
  phone: "+91 8763737274",
  altPhone: "+91 7205960325",
  email: "info@byadhicurelab.com",
  workingHours: "Monday - Saturday, 8:00 AM - 11:00 PM IST",
  social: [
    { label: "LinkedIn", href: "#" },
    { label: "Facebook", href: "#" },
    { label: "X", href: "#" },
    { label: "YouTube", href: "#" },
  ],
};

export async function seedCompany() {
  try {
    const existing = await Company.findOne();
    if (existing) {
      console.log("Company information already exists, skipping company seed.");
      return;
    }

    await Company.create(defaultCompany);
    console.log("Default company information created.");
  } catch (error) {
    console.error("Company seed error:", error.message);
  }
}
