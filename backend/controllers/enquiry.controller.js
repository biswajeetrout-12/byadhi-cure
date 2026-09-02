import Enquiry from "../models/Enquiry.js";

// POST /api/enquiries  (registered users)
export async function submitEnquiry(req, res) {
  try {
    const { name, email, phone, company, subject, message, productId } = req.body;
    if (!name || !email || !phone || !subject || !message) {
      return res.status(400).json({ ok: false, message: "Name, email, phone, subject and message are required" });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      return res.status(400).json({ ok: false, message: "Please provide a valid email address" });
    }
    if (!/^\d{10}$/.test(String(phone).trim())) {
      return res.status(400).json({ ok: false, message: "Please provide a valid 10-digit phone number" });
    }
    const enquiry = await Enquiry.create({
      name,
      email,
      phone,
      company,
      subject,
      message,
      productId,
      userId: req.user._id.toString(),
    });
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
      email: e.email,
      phone: e.phone,
      company: e.company,
      subject: e.subject,
      message: e.message,
      productId: e.productId,
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

// DELETE /api/enquiries/:id  [admin only]
export async function deleteEnquiry(req, res) {
  try {
    const enquiry = await Enquiry.findByIdAndDelete(req.params.id);
    if (!enquiry) return res.status(404).json({ ok: false, message: "Enquiry not found" });
    return res.json({ ok: true, message: "Enquiry deleted" });
  } catch (err) {
    return res.status(500).json({ ok: false, message: "Failed to delete enquiry" });
  }
}
