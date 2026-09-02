import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    shortName: { type: String, required: true, trim: true },
    tagline: { type: String, default: "" },
    intro: { type: String, required: true },
    aboutIntro: { type: String, default: "" },
    founded: { type: Number },
    address: {
      line1: { type: String, default: "" },
      line2: { type: String, default: "" },
      city: { type: String, default: "" },
      postalCode: { type: String, default: "" },
      country: { type: String, default: "" },
    },
    phone: { type: String, default: "" },
    altPhone: { type: String, default: "" },
    email: { type: String, default: "" },
    workingHours: { type: String, default: "" },
    social: [{ label: { type: String, trim: true }, href: { type: String, trim: true } }],
  },
  { timestamps: true },
);

export default mongoose.model("Company", companySchema);
