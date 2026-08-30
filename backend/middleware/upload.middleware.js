import multer from "multer";

const storage = multer.memoryStorage();

const imageFileFilter = (_req, file, cb) => {
  if (!file.mimetype || !file.mimetype.startsWith("image/")) {
    return cb(new Error("Invalid image upload. Only image files are allowed."));
  }

  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter: imageFileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

export function handleProductImageUpload(req, res, next) {
  upload.single("image")(req, res, (err) => {
    if (!err) return next();

    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({ ok: false, message: "Image file is too large. Max size is 10MB." });
      }

      return res.status(400).json({ ok: false, message: err.message });
    }

    return res.status(400).json({ ok: false, message: err.message || "Invalid image upload." });
  });
}
