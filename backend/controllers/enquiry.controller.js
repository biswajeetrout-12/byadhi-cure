import Enquiry from "../models/Enquiry.js";

// POST /api/enquiries  (public)
export async function submitEnquiry(req, res) {
  try {
    const { name, email, phone, company, subject, message, productId } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ ok: false, message: "Name, email, subject and message are required" });
    }
    const enquiry = await Enquiry.create({ name, email, phone, company, subject, message, productId });
    return res.status(201).json({ ok: true, message: "Enquiry submitted successfully.", data: enquiry });
  } catch (err) {
    return res.status(500).json({ ok: false, message: "Failed to submit enquiry" });
  }
}

// GET /api/enquiries  [admin only]
export async function getEnquiries(req, res) {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    const mapped = enquiries.map((e) => ({
      id: e._id.toString(),
      name: e.name,
      company: e.company,
      subject: e.subject,
      date: e.createdAt.toISOString().split("T")[0],
      status: e.status,
    }));
    return res.json({ ok: true, data: mapped });
  } catch (err) {
    return res.status(500).json({ ok: false, message: "Failed to fetch enquiries" });
  }
}

// PATCH /api/enquiries/:id/status  [admin only]
export async function updateEnquiryStatus(req, res) {
  try {
    const { status } = req.body;
    const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!enquiry) return res.status(404).json({ ok: false, message: "Enquiry not found" });
    return res.json({ ok: true, data: enquiry });
  } catch (err) {
    return res.status(500).json({ ok: false, message: "Failed to update enquiry" });
  }
}
