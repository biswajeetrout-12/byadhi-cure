import Product from "../models/Product.js";
import { slugify } from "../utils/slug.js";

// Bootstrap data only. Existing product documents are never replaced by this seed.
const initialProducts = [
  {
    name: "CURE NURO Q10",
    category: "nutritional supplement",
    shortDescription: "A comprehensive softgel nutritional supplement containing B vitamins, Alpha Lipoic Acid, Omega-3 fatty acids, Coenzyme Q10, L-Carnitine, and essential vitamins and minerals.",
    description: "Cure Nuro Q10 is a nutritional supplement formulated with a combination of vitamins, antioxidants, essential nutrients, and fatty acids. Its formulation includes Cyanocobalamin (Vitamin B12), Benfotiamine, Alpha Lipoic Acid, Folic Acid, Vitamin B6, Thiamine (Vitamin B1), Biotin, Chromium, Vitamins A and D3, Omega-3 Fatty Acids, Zinc, Coenzyme Q10, Cod Liver Oil, and L-Carnitine. The combination is intended to provide nutritional support and support normal energy metabolism and antioxidant defenses.",
    image: "https://res.cloudinary.com/zypro4h8/image/upload/v1788075896/Cure_Nuro_Q10.jpg",
    imagePublicId: "Cure_Nuro_Q10",
    composition: ["Cyanocobalamin (Vitamin B12)", "Benfotiamine", "Alpha Lipoic Acid", "Folic Acid", "Vitamin B6", "Thiamine (Vitamin B1)", "Biotin", "Chromium", "Vitamin A", "Vitamin D3", "Omega-3 Fatty Acids", "Zinc", "Coenzyme Q10", "Cod Liver Oil", "L-Carnitine"],
    uses: ["Nutritional supplementation", "Supplementation of essential vitamins and minerals", "Nutritional support for normal nervous system function", "Nutritional support for normal energy metabolism"],
    benefits: ["Provides a combination of B vitamins, vitamins A and D3, zinc and chromium", "Provides antioxidant nutrients including Alpha Lipoic Acid and Coenzyme Q10", "Provides Omega-3 fatty acids and Cod Liver Oil", "Provides L-Carnitine as part of a balanced nutritional formulation"],
    dosage: "Take as directed by a healthcare professional or according to the manufacturer's prescribing or product information.",
    packaging: "10 x 1 x 10 softgel capsules.",
    storage: "Store in a cool, dry place away from direct sunlight and moisture. Keep out of reach of children. Follow the storage instructions provided on the product packaging.",
    manufacturing: "Manufactured and packaged according to applicable pharmaceutical and quality standards. Refer to the product packaging for specific manufacturer and manufacturing-site information.",
  },
  {
    name: "Tendocure-FORTE",
    category: "Joint Health Supplement",
    shortDescription: "Joint health tablets containing Collagen Type II, Glucosamine Sulfate, Chondroitin Sulphate, Rosehip Extract, Boswellia Serrata, Hyaluronic Acid, Curcumin Extract, Methylsulfonylmethane and Vitamin D3.",
    description: "Tendocure-FORTE is a nutritional formulation combining Collagen Type II, Glucosamine Sulfate, Chondroitin Sulphate, Rosehip Extract, Boswellia Serrata Roxb, Hyaluronic Acid, Curcumin Extract, Methylsulfonylmethane (MSM) and Vitamin D3. The formulation is intended to provide nutritional support for joint and connective tissue health.",
    image: "https://res.cloudinary.com/zypro4h8/image/upload/v1788095864/Tendocure_Forte.jpg",
    imagePublicId: "Tendocure_Forte",
    composition: ["Collagen Type II", "Glucosamine Sulfate", "Chondroitin Sulphate", "Rosehip Extract", "Boswellia Serrata Roxb", "Hyaluronic Acid", "Curcumin Extract", "Methylsulfonylmethane (MSM)", "Vitamin D3"],
    uses: ["Provides nutritional support for joint health", "Supports connective tissue health", "Supports normal joint function", "Provides nutritional support for bone health"],
    benefits: ["Provides Collagen Type II for joint and connective tissue support", "Glucosamine and Chondroitin provide nutritional support for joint health", "Hyaluronic Acid supports joint lubrication", "Rosehip, Boswellia and Curcumin provide botanical nutritional support", "MSM provides nutritional support for connective tissue", "Vitamin D3 supports normal calcium absorption and bone health"],
    dosage: "Dosage information to be provided as per registered product information.",
    packaging: "10 x 1 x 10 tablets.",
    storage: "Store in a cool, dry place away from direct sunlight and moisture. Keep out of reach of children.",
    manufacturing: "Manufactured under controlled conditions in accordance with applicable quality and manufacturing standards.",
  },
  {
    name: "TBC Q10",
    category: "Multivitamin & Nutritional Supplement",
    shortDescription: "Multinutrient tablets containing vitamins, minerals, Omega-3 fatty acids, Coenzyme Q10, Lycopene and L-Carnitine for nutritional support.",
    description: "TBC Q10 Tablets contain a combination of essential vitamins, minerals, Omega-3 fatty acids, Coenzyme Q10, Lycopene, Cod Liver Oil and L-Carnitine. The formulation is intended to provide nutritional support and help supplement the daily dietary intake of vitamins, minerals and other essential nutrients.",
    image: "https://res.cloudinary.com/zypro4h8/image/upload/v1788096318/products/xba2x1nputz0ty7qox8i.jpg",
    imagePublicId: "products/xba2x1nputz0ty7qox8i",
    composition: ["Cyanocobalamin (Vitamin B12)", "Lycopene", "Benfotiamine", "Alpha Lipoic Acid", "Folic Acid", "Vitamin B6", "Thiamine (Vitamin B1)", "Biotin", "Chromium", "Vitamin A", "Vitamin D3", "Omega-3 Fatty Acids", "Zinc", "Coenzyme Q10", "Cod Liver Oil", "L-Carnitine"],
    uses: ["Supports energy metabolism", "Supports immunity", "Supports general wellbeing"],
    benefits: ["Provides essential vitamins", "Supports cellular energy", "Supports bone health"],
    dosage: "Dosage information to be provided as per registered product information.",
    packaging: "10 x 1 x 10 tablets.",
    storage: "Store in a cool, dry place away from direct sunlight and moisture.",
    manufacturing: "Manufactured under controlled conditions in accordance with applicable quality and manufacturing standards.",
  },
  {
    name: "Cure Fit Joint",
    category: "Joint Health Supplement",
    shortDescription: "Collagen peptide type II, calcium, egg cell membrane and cholecalciferol tablets formulated for joint and bone health",
    description: "Cure Fit Joint GOLD contains Collagen Peptide Type II, Calcium, Egg Cell Membrane and Cholecalciferol. It is formulated to support joint function and maintain bone health as part of a balanced diet and healthy lifestyle.",
    image: "https://res.cloudinary.com/zypro4h8/image/upload/v1788241535/products/f9uyl7qybwayziydrr2g.jpg",
    imagePublicId: "products/f9uyl7qybwayziydrr2g",
    composition: ["Collagen Peptide Type II", "Calcium", "Egg Cell Membrane", "Cholecalciferol"],
    uses: ["Supports joint health", "Supports normal bone health", "Helps provide nutritional support for joints and bones"],
    benefits: ["Provides collagen peptide support for joint health", "Calcium contributes to maintenance of normal bones", "Cholecalciferol supports normal calcium absorption and bone health", "Egg cell membrane provides nutritional support for joint wellness"],
    dosage: "Dosage information to be provided as per registered product information.",
    packaging: "15 tablets in a blister strip",
    storage: "Store in a cool, dry place away from direct sunlight and moisture. Keep out of reach of children.",
    manufacturing: "Manufactured under controlled conditions in accordance with applicable quality and manufacturing standards.",
  },
];

export async function seedProducts() {
  try {
    const count = await Product.countDocuments();
    if (count > 0) {
      console.log("Products already exist in database, skipping product seed.");
      return;
    }

    await Product.insertMany(initialProducts.map((product) => ({ ...product, slug: slugify(product.name) })));
    console.log("Default products successfully seeded in MongoDB database.");
  } catch (err) {
    console.error("Product seed error:", err.message);
  }
}
