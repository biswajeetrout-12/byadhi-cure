import Product from "../models/Product.js";

// GET /api/products
export async function getProducts(req, res) {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    // Map _id -> id for frontend compatibility
    const mapped = products.map((p) => ({ ...p.toObject(), id: p._id.toString() }));
    return res.json({ ok: true, data: mapped });
  } catch (err) {
    return res.status(500).json({ ok: false, message: "Failed to fetch products" });
  }
}

// GET /api/products/:id
export async function getProductById(req, res) {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ ok: false, message: "Product not found" });
    return res.json({ ok: true, data: { ...product.toObject(), id: product._id.toString() } });
  } catch (err) {
    return res.status(500).json({ ok: false, message: "Failed to fetch product" });
  }
}

// POST /api/products  [admin only]
export async function createProduct(req, res) {
  try {
    const product = await Product.create(req.body);
    return res.status(201).json({ ok: true, data: { ...product.toObject(), id: product._id.toString() } });
  } catch (err) {
    return res.status(400).json({ ok: false, message: err.message });
  }
}

// PUT /api/products/:id  [admin only]
export async function updateProduct(req, res) {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!product) return res.status(404).json({ ok: false, message: "Product not found" });
    return res.json({ ok: true, data: { ...product.toObject(), id: product._id.toString() } });
  } catch (err) {
    return res.status(400).json({ ok: false, message: err.message });
  }
}

// DELETE /api/products/:id  [admin only]
export async function deleteProduct(req, res) {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ ok: false, message: "Product not found" });
    return res.json({ ok: true, message: "Product deleted" });
  } catch (err) {
    return res.status(500).json({ ok: false, message: "Failed to delete product" });
  }
}
