import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, index: true },
    category: { type: String, required: true, trim: true },
    shortDescription: { type: String, required: true },
    description: { type: String, required: true },
    seoTitle: { type: String, default: "", trim: true, maxlength: 160 },
    seoDescription: { type: String, default: "", trim: true, maxlength: 320 },
    image: { type: String, default: "" },
    imagePublicId: { type: String, default: "" },
    composition: { type: [String], default: [] },
    uses: { type: [String], default: [] },
    benefits: { type: [String], default: [] },
    dosage: { type: String, default: "" },
    packaging: { type: String, default: "" },
    storage: { type: String, default: "" },
    manufacturing: { type: String, default: "" },
  },
  { timestamps: true, autoIndex: false }
);

export default mongoose.model("Product", productSchema);
