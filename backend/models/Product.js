import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    shortDescription: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, default: "" },
    composition: { type: [String], default: [] },
    uses: { type: [String], default: [] },
    benefits: { type: [String], default: [] },
    dosage: { type: String, default: "" },
    packaging: { type: String, default: "" },
    storage: { type: String, default: "" },
    manufacturing: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
