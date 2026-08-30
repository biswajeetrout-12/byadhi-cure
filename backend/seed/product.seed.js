import Product from "../models/Product.js";

const initialProducts = [
  {
    name: "Cureflam-SP Tablets",
    category: "Analgesic & Anti-inflammatory",
    shortDescription: "Aceclofenac, paracetamol and serratiopeptidase combination for pain and inflammation.",
    description: "Cureflam-SP is a triple-action anti-inflammatory formulation used for the symptomatic relief of pain, swelling and inflammation associated with musculoskeletal and post-operative conditions.",
    image: "/src/assets/images/product-generic.jpg",
    composition: ["Aceclofenac IP 100 mg", "Paracetamol IP 325 mg", "Serratiopeptidase IP 15 mg"],
    uses: ["Osteoarthritis and rheumatoid arthritis", "Post-operative pain and swelling", "Soft tissue injuries", "Dental and orthopaedic pain"],
    benefits: ["Fast onset of analgesia", "Reduces oedema and inflammation", "Enteric-coated for gastric tolerance"],
    dosage: "Dosage information to be provided as per registered prescribing information.",
    packaging: "10 x 10 tablets in alu-alu blister, packed in printed carton.",
    storage: "Store below 30°C in a dry place, protected from light. Keep out of reach of children.",
    manufacturing: "Manufactured in a WHO-GMP certified oral solid dosage block under validated processes."
  },
  {
    name: "Cure Nuro Q10",
    category: "Antibiotic",
    shortDescription: "Third-generation cephalosporin dispersible tablets for bacterial infections.",
    description: "Byacef-200 DT contains Cefixime, a broad-spectrum third-generation cephalosporin indicated for susceptible bacterial infections of the respiratory and urinary tract.",
    image: "https://res.cloudinary.com/zypro4h8/image/upload/v1788075896/Cure_Nuro_Q10.jpg",
    imagePublicId: "Cure_Nuro_Q10",
    composition: ["Cefixime IP 200 mg (as trihydrate)"],
    uses: ["Upper and lower respiratory tract infections", "Urinary tract infections", "Otitis media", "Uncomplicated gonorrhoea"],
    benefits: ["Broad gram-negative coverage", "Dispersible format for easy administration", "Twice-daily convenience"],
    dosage: "Dosage information to be provided as per registered prescribing information.",
    packaging: "10 x 10 dispersible tablets in blister strips.",
    storage: "Store below 25°C in a dry place, protected from moisture and light.",
    manufacturing: "Produced in a dedicated cephalosporin block with segregated air handling."
  },
  {
    name: "Curedex Cough Syrup",
    category: "Respiratory Care",
    shortDescription: "Non-sedating expectorant syrup for productive cough relief.",
    description: "Curedex is a sugar-free expectorant syrup formulated to loosen bronchial secretions and provide relief in productive cough associated with respiratory tract infections.",
    image: "/src/assets/images/product-generic.jpg",
    composition: ["Ambroxol HCl 30 mg", "Guaiphenesin IP 50 mg", "Terbutaline Sulphate 1.25 mg / 5 ml"],
    uses: ["Productive cough", "Bronchitis", "Bronchial asthma with mucus retention"],
    benefits: ["Sugar-free formulation", "Mucolytic and bronchodilator action", "Pleasant flavour profile"],
    dosage: "Dosage information to be provided as per registered prescribing information.",
    packaging: "100 ml amber PET bottle with measuring cup in printed carton.",
    storage: "Store below 30°C. Do not refrigerate. Use within 30 days of opening.",
    manufacturing: "Manufactured in a dedicated liquid orals block with purified water loop system."
  },
  {
    name: "Byavit Forte Capsules",
    category: "Nutraceutical",
    shortDescription: "Multivitamin, multimineral and antioxidant softgel capsules.",
    description: "Byavit Forte is a comprehensive nutritional supplement designed to support daily micronutrient requirements, immunity and general wellbeing in adults.",
    image: "/src/assets/images/product-generic.jpg",
    composition: ["Vitamin B-complex", "Vitamin C, D3 & E", "Zinc, Selenium and Chromium", "Green tea extract"],
    uses: ["Nutritional deficiency support", "Convalescence and recovery", "General wellness and immunity"],
    benefits: ["Antioxidant support", "Single daily capsule", "Well tolerated softgel shell"],
    dosage: "Dosage information to be provided as per registered prescribing information.",
    packaging: "3 x 10 softgel capsules in alu-alu blister.",
    storage: "Store in a cool, dry place below 30°C, away from direct sunlight.",
    manufacturing: "Encapsulated and packed under controlled humidity conditions."
  },
  {
    name: "Curegest-DSR Capsules",
    category: "Gastrointestinal",
    shortDescription: "Sustained-release capsules for acid reflux and gastric discomfort.",
    description: "Curegest-DSR combines a proton pump inhibitor with a prokinetic agent for the management of gastro-oesophageal reflux disease and associated symptoms.",
    image: "/src/assets/images/product-generic.jpg",
    composition: ["Pantoprazole Sodium IP 40 mg (EC)", "Domperidone IP 30 mg (SR)"],
    uses: ["Gastro-oesophageal reflux disease", "Acid dyspepsia", "Nausea and bloating"],
    benefits: ["24-hour acid suppression", "Reduces regurgitation", "Sustained-release prokinetic component"],
    dosage: "Dosage information to be provided as per registered prescribing information.",
    packaging: "10 x 10 capsules in alu-alu blister.",
    storage: "Store below 30°C, protected from light and moisture.",
    manufacturing: "Pellet-based formulation manufactured on automated encapsulation lines."
  },
  {
    name: "Byaderm Cream",
    category: "Dermatology",
    shortDescription: "Topical antifungal and anti-inflammatory cream for skin infections.",
    description: "Byaderm Cream is a combination topical preparation indicated for fungal and mixed dermatological infections requiring antifungal and anti-inflammatory action.",
    image: "/src/assets/images/product-generic.jpg",
    composition: ["Clotrimazole IP 1% w/w", "Beclometasone Dipropionate IP 0.025% w/w", "Neomycin Sulphate IP 0.5% w/w"],
    uses: ["Tinea infections", "Eczematous dermatitis", "Secondary bacterial skin infections"],
    benefits: ["Rapid relief from itching", "Non-greasy base", "Broad antifungal spectrum"],
    dosage: "Dosage information to be provided as per registered prescribing information.",
    packaging: "15 g laminated tube in printed carton.",
    storage: "Store below 25°C. Do not freeze. Close cap tightly after use.",
    manufacturing: "Manufactured in a dedicated external preparations block with validated mixing vessels."
  }
];

export async function seedProducts() {
  try {
    const count = await Product.countDocuments();
    if (count > 0) {
      console.log("ℹ️  Products already exist in database, skipping product seed.");
      return;
    }

    await Product.insertMany(initialProducts);
    console.log("✅ Default products successfully seeded in MongoDB database.");
  } catch (err) {
    console.error("❌ Product seed error:", err.message);
  }
}
