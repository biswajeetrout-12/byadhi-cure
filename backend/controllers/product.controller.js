import mongoose from "mongoose";
import Product from "../models/Product.js";
import {
  deleteProductImage,
  extractCloudinaryPublicId,
  uploadProductImage,
} from "../services/cloudinary.service.js";
import { getUniqueProductSlug } from "../utils/slug.js";

function serializeProduct(product) {
  return { ...product.toObject(), id: product._id.toString() };
}

function toTrimmedString(value) {
  return typeof value === "string" ? value.trim() : "";
}

function parseListField(value) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }

  const text = toTrimmedString(value);
  if (!text) return [];

  try {
    const parsed = JSON.parse(text);
    if (Array.isArray(parsed)) {
      return parsed.map((item) => String(item).trim()).filter(Boolean);
    }
  } catch {
    // Fall back to line-based parsing for textarea submissions.
  }

  return text
    .split(/\r?\n+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function buildProductData(body, existingProduct = null) {
  return {
    name: toTrimmedString(body.name) || existingProduct?.name || "",
    category: toTrimmedString(body.category) || existingProduct?.category || "",
    shortDescription: toTrimmedString(body.shortDescription) || existingProduct?.shortDescription || "",
    description: toTrimmedString(body.description) || existingProduct?.description || "",
    composition:
      body.composition !== undefined ? parseListField(body.composition) : existingProduct?.composition || [],
    uses: body.uses !== undefined ? parseListField(body.uses) : existingProduct?.uses || [],
    benefits: body.benefits !== undefined ? parseListField(body.benefits) : existingProduct?.benefits || [],
    dosage: toTrimmedString(body.dosage) || existingProduct?.dosage || "",
    packaging: toTrimmedString(body.packaging) || existingProduct?.packaging || "",
    storage: toTrimmedString(body.storage) || existingProduct?.storage || "",
    manufacturing: toTrimmedString(body.manufacturing) || existingProduct?.manufacturing || "",
  };
}

function isCloudinaryImage(url) {
  return typeof url === "string" && url.includes("res.cloudinary.com");
}

function resolveCloudinaryPublicId(imageUrl, explicitPublicId = "") {
  return explicitPublicId || extractCloudinaryPublicId(imageUrl);
}

async function resolveImageData(req, existingProduct = null, requireImage = false) {
  if (req.file) {
    const uploadedImage = await uploadProductImage(req.file);
    return {
      image: uploadedImage.secureUrl,
      imagePublicId: uploadedImage.publicId,
      previousPublicId: resolveCloudinaryPublicId(existingProduct?.image, existingProduct?.imagePublicId),
    };
  }

  const incomingImage = toTrimmedString(req.body.image);
  const incomingPublicId = toTrimmedString(req.body.imagePublicId);

  if (incomingImage) {
    const imagePublicId = resolveCloudinaryPublicId(incomingImage, incomingPublicId);

    if (isCloudinaryImage(incomingImage) && !imagePublicId) {
      throw new Error("Cloudinary public_id is required when submitting a Cloudinary image URL.");
    }

    return {
      image: incomingImage,
      imagePublicId,
      previousPublicId: resolveCloudinaryPublicId(existingProduct?.image, existingProduct?.imagePublicId),
    };
  }

  if (existingProduct) {
    return {
      image: existingProduct.image || "",
      imagePublicId: resolveCloudinaryPublicId(existingProduct.image, existingProduct.imagePublicId),
      previousPublicId: resolveCloudinaryPublicId(existingProduct.image, existingProduct.imagePublicId),
    };
  }

  if (requireImage) {
    throw new Error("Product image is required.");
  }

  return {
    image: "",
    imagePublicId: "",
    previousPublicId: "",
  };
}

// GET /api/products
export async function getProducts(req, res) {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    const mapped = products.map((product) => serializeProduct(product));
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
    return res.json({ ok: true, data: serializeProduct(product) });
  } catch (err) {
    return res.status(500).json({ ok: false, message: "Failed to fetch product" });
  }
}

// GET /api/products/slug/:slug
export async function getProductBySlug(req, res) {
  try {
    const product = await Product.findOne({ slug: req.params.slug }) || (
      mongoose.isValidObjectId(req.params.slug) ? await Product.findById(req.params.slug) : null
    );
    if (!product) return res.status(404).json({ ok: false, message: "Product not found" });
    return res.json({ ok: true, data: serializeProduct(product) });
  } catch (err) {
    return res.status(500).json({ ok: false, message: "Failed to fetch product" });
  }
}

// POST /api/products  [admin only]
export async function createProduct(req, res) {
  try {
    const productData = buildProductData(req.body);
    const imageData = await resolveImageData(req, null, true);

    if (!productData.name || !productData.category || !productData.shortDescription || !productData.description) {
      return res.status(400).json({
        ok: false,
        message: "name, category, shortDescription and description are required.",
      });
    }

    const product = await Product.create({
      ...productData,
      slug: await getUniqueProductSlug(productData.name),
      image: imageData.image,
      imagePublicId: imageData.imagePublicId,
    });

    return res.status(201).json({ ok: true, data: serializeProduct(product) });
  } catch (err) {
    const status = err.message.includes("required") ? 400 : 500;
    return res.status(status).json({ ok: false, message: err.message || "Failed to create product" });
  }
}

// PUT /api/products/:id  [admin only]
export async function updateProduct(req, res) {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ ok: false, message: "Product not found" });

    const productData = buildProductData(req.body, product);
    const slug = product.slug && productData.name === product.name
      ? product.slug
      : await getUniqueProductSlug(productData.name, product._id);
    const imageData = await resolveImageData(req, product, false);
    const previousPublicId = imageData.previousPublicId;

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        ...productData,
        slug,
        image: imageData.image,
        imagePublicId: imageData.imagePublicId,
      },
      { new: true, runValidators: true },
    );

    if (!updatedProduct) {
      return res.status(404).json({ ok: false, message: "Product not found" });
    }

    const normalizedPublicId = resolveCloudinaryPublicId(updatedProduct.image, updatedProduct.imagePublicId);
    if (normalizedPublicId && updatedProduct.imagePublicId !== normalizedPublicId) {
      await Product.updateOne(
        { _id: updatedProduct._id },
        { $set: { imagePublicId: normalizedPublicId } },
      );
      updatedProduct.imagePublicId = normalizedPublicId;
    }

    if (req.file && previousPublicId && previousPublicId !== imageData.imagePublicId) {
      try {
        await deleteProductImage(previousPublicId);
      } catch (deleteErr) {
        console.error("Cloudinary cleanup error:", deleteErr.message);
        return res.status(500).json({
          ok: false,
          message: `Product updated, but the previous Cloudinary image could not be deleted: ${deleteErr.message}`,
          data: serializeProduct(updatedProduct),
        });
      }
    }

    return res.json({ ok: true, data: serializeProduct(updatedProduct) });
  } catch (err) {
    const status = err.message.includes("required") || err.message.includes("Cloudinary") ? 400 : 500;
    return res.status(status).json({ ok: false, message: err.message || "Failed to update product" });
  }
}

// DELETE /api/products/:id  [admin only]
export async function deleteProduct(req, res) {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ ok: false, message: "Product not found" });

    const publicId = product.imagePublicId || extractCloudinaryPublicId(product.image);

    if (publicId) {
      try {
        await deleteProductImage(publicId);
      } catch (deleteErr) {
        return res.status(500).json({
          ok: false,
          message: `Product could not be deleted because the Cloudinary image removal failed: ${deleteErr.message}`,
        });
      }
    }

    await Product.findByIdAndDelete(req.params.id);
    return res.json({ ok: true, message: "Product deleted" });
  } catch (err) {
    return res.status(500).json({ ok: false, message: "Failed to delete product" });
  }
}
