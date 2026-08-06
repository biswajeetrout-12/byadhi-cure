/** Dummy content for quality, gallery, manufacturing and admin UI demos. */

export const certifications = [
  { id: "who-gmp", name: "WHO-GMP", description: "Good Manufacturing Practice certification as per WHO guidelines.", issuer: "State Drug Control Authority", year: "2019" },
  { id: "iso-9001", name: "ISO 9001:2015", description: "Quality management system certification for manufacturing operations.", issuer: "TÜV Certification Body", year: "2013" },
  { id: "iso-14001", name: "ISO 14001:2015", description: "Environmental management system for waste handling and emissions.", issuer: "TÜV Certification Body", year: "2018" },
  { id: "gmp-schedule-m", name: "Schedule M Compliance", description: "Compliance with Indian Drugs & Cosmetics Act premises requirements.", issuer: "CDSCO", year: "2020" },
  { id: "fssai", name: "FSSAI Licence", description: "Licence for manufacture of nutraceutical and food supplement products.", issuer: "FSSAI", year: "2021" },
  { id: "gls", name: "Good Laboratory Practice", description: "Internal QC laboratory operating under documented GLP protocols.", issuer: "Internal / audited", year: "2022" },
];

export const qualityPolicy = [
  "Manufacture every product in compliance with WHO-GMP and Schedule M requirements.",
  "Test raw materials, in-process samples and finished goods against pharmacopoeial specifications.",
  "Maintain complete batch traceability and retention samples for the full shelf life.",
  "Train and requalify all production personnel on documented SOPs annually.",
];

export const complianceItems = [
  { title: "Regulatory documentation", body: "Batch manufacturing records, validation protocols and stability data maintained for every product." },
  { title: "Audits & inspections", body: "Regular internal audits plus regulatory and customer inspections with corrective action tracking." },
  { title: "Pharmacovigilance", body: "Defined process for complaint handling, product recall and adverse event reporting." },
  { title: "Vendor qualification", body: "Approved supplier list with periodic re-evaluation and incoming material testing." },
];

export const processSteps = [
  { step: "01", title: "Raw material intake", body: "Quarantine, sampling and QC clearance before release to production." },
  { step: "02", title: "Dispensing", body: "Weighing in a controlled dispensing booth with reverse laminar airflow." },
  { step: "03", title: "Granulation & blending", body: "Rapid mixer granulators and fluid bed dryers with in-process monitoring." },
  { step: "04", title: "Compression / filling", body: "High-speed compression, encapsulation and liquid filling lines." },
  { step: "05", title: "Coating & inspection", body: "Automated coating followed by visual and metal detection inspection." },
  { step: "06", title: "Packing & release", body: "Blister packing, serialization and QA release with batch documentation." },
];

export const equipment = [
  "High-speed rotary tablet compression machines",
  "Automatic capsule filling machines",
  "Fluid bed dryers and rapid mixer granulators",
  "Automated blister and strip packing lines",
  "Liquid filling and sealing lines with online checkweighers",
  "HPLC, UV-Vis spectrophotometers and dissolution apparatus",
];

export const safetyStandards = [
  { title: "Personnel safety", body: "Mandatory PPE, gowning protocols and periodic occupational health checks." },
  { title: "Fire & electrical", body: "Addressable fire detection, hydrant system and periodic electrical audits." },
  { title: "Effluent treatment", body: "In-house ETP with monitored discharge parameters." },
  { title: "Contamination control", body: "Segregated areas, airlocks and validated cleaning procedures." },
];

export const capabilities = [
  { title: "Tablets", body: "Plain, film-coated, enteric-coated and dispersible tablets." },
  { title: "Capsules", body: "Hard gelatin and pellet-filled sustained-release capsules." },
  { title: "Liquid orals", body: "Syrups, suspensions and sugar-free formulations." },
  { title: "External preparations", body: "Creams, ointments, gels and lotions." },
];

export type GalleryCategory = "Manufacturing Facility" | "Products" | "Infrastructure" | "Events";

export const galleryCategories: GalleryCategory[] = [
  "Manufacturing Facility",
  "Products",
  "Infrastructure",
  "Events",
];

export type GalleryItem = { id: string; title: string; category: GalleryCategory; image?: string };

/** Images will later be served from Cloudinary; `image` stays empty for placeholders. */
export const galleryItems: GalleryItem[] = [
  { id: "g1", title: "Tablet compression area", category: "Manufacturing Facility" },
  { id: "g2", title: "Granulation block", category: "Manufacturing Facility" },
  { id: "g3", title: "Blister packing line", category: "Manufacturing Facility" },
  { id: "g4", title: "Clean room corridor", category: "Manufacturing Facility" },
  { id: "g5", title: "Tablet product range", category: "Products" },
  { id: "g6", title: "Syrup range", category: "Products" },
  { id: "g7", title: "Capsule range", category: "Products" },
  { id: "g8", title: "Quality control laboratory", category: "Infrastructure" },
  { id: "g9", title: "Warehouse racking", category: "Infrastructure" },
  { id: "g10", title: "Utility and HVAC plant", category: "Infrastructure" },
  { id: "g11", title: "Annual distributor meet", category: "Events" },
  { id: "g12", title: "GMP training workshop", category: "Events" },
];

export const adminStats = [
  { label: "Total products", value: "120" },
  { label: "Gallery images", value: "248" },
  { label: "Open enquiries", value: "17" },
  { label: "Registered users", value: "64" },
];

export const adminEnquiries = [
  { id: "ENQ-1043", name: "Suresh Nair", company: "Medico Distributors", subject: "Bulk order — Cureflam-SP", date: "2026-08-04", status: "New" },
  { id: "ENQ-1042", name: "Priya Sharma", company: "Sharma Pharmacy", subject: "Product brochure request", date: "2026-08-03", status: "In progress" },
  { id: "ENQ-1041", name: "Arun Kumar", company: "LifeCare Hospitals", subject: "Third-party manufacturing", date: "2026-08-01", status: "Closed" },
  { id: "ENQ-1040", name: "Neha Gupta", company: "Wellness Chain", subject: "Nutraceutical range pricing", date: "2026-07-29", status: "New" },
];

export const adminUsers = [
  { id: "U-01", name: "Ramesh Byadhi", email: "ramesh@byadhicurelab.com", role: "Superadmin", status: "Active" },
  { id: "U-02", name: "Kavita Rao", email: "kavita@byadhicurelab.com", role: "Admin", status: "Active" },
  { id: "U-03", name: "Imran Sheikh", email: "imran@byadhicurelab.com", role: "Editor", status: "Active" },
  { id: "U-04", name: "Medico Distributors", email: "orders@medico.in", role: "Customer", status: "Pending" },
];
