import Company from "../models/Company.js";

export async function getCompany(req, res) {
  try {
    const company = await Company.findOne().sort({ createdAt: 1 });
    if (!company) return res.status(404).json({ ok: false, message: "Company information not found" });
    return res.json({ ok: true, data: company });
  } catch (error) {
    return res.status(500).json({ ok: false, message: "Failed to fetch company information" });
  }
}

export async function updateCompany(req, res) {
  try {
    const company = await Company.findOneAndUpdate({}, { $set: req.body }, { new: true, runValidators: true, upsert: true });
    return res.json({ ok: true, data: company });
  } catch (error) {
    return res.status(400).json({ ok: false, message: "Failed to update company information" });
  }
}
