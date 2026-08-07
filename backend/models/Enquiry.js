import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, default: "" },
    company: { type: String, default: "Individual" },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    productId: { type: String, default: "" },
    status: {
      type: String,
      enum: ["New", "In progress", "Closed"],
      default: "New",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Enquiry", enquirySchema);
