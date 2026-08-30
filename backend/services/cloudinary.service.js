import { Readable } from "node:stream";
import cloudinary, { assertCloudinaryCredentials, hasCloudinaryCredentials } from "../config/cloudinary.js";

function bufferToStream(buffer) {
  const stream = new Readable();
  stream.push(buffer);
  stream.push(null);
  return stream;
}

export function extractCloudinaryPublicId(imageUrl) {
  if (!imageUrl || typeof imageUrl !== "string") return "";

  try {
    const url = new URL(imageUrl);
    if (!url.hostname.includes("cloudinary.com")) return "";

    const parts = url.pathname.split("/").filter(Boolean);
    const uploadIndex = parts.indexOf("upload");
    if (uploadIndex === -1 || parts.length <= uploadIndex + 2) return "";

    const afterUpload = parts.slice(uploadIndex + 2);
    if (afterUpload.length === 0) return "";

    const fileName = afterUpload.join("/");
    return fileName.replace(/\.[^.]+$/, "");
  } catch {
    return "";
  }
}

export async function uploadProductImage(file) {
  assertCloudinaryCredentials();

  if (!file || !file.buffer) {
    throw new Error("Missing image file.");
  }

  if (!file.mimetype || !file.mimetype.startsWith("image/")) {
    throw new Error("Invalid image upload.");
  }

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "products",
        resource_type: "image",
      },
      (error, result) => {
        if (error) return reject(new Error(`Cloudinary upload failed: ${error.message}`));
        if (!result) return reject(new Error("Cloudinary upload failed: empty response."));

        resolve({
          secureUrl: result.secure_url,
          publicId: result.public_id,
        });
      },
    );

    bufferToStream(file.buffer).on("error", reject).pipe(uploadStream);
  });
}

export async function deleteProductImage(publicId) {
  assertCloudinaryCredentials();

  if (!publicId) {
    throw new Error("Missing Cloudinary public_id.");
  }

  const result = await cloudinary.uploader.destroy(publicId, {
    resource_type: "image",
  });

  if (result.result !== "ok" && result.result !== "not found") {
    throw new Error(`Cloudinary delete failed: ${result.result || "unknown error"}`);
  }

  return result;
}

export function canUseCloudinary() {
  return hasCloudinaryCredentials();
}
