import User from "../models/User.js";

/**
 * Seeds a single admin user from environment variables.
 * Runs once at server startup — does nothing if admin already exists.
 */
export async function seedAdmin() {
  try {
    const existing = await User.findOne({ email: process.env.ADMIN_EMAIL });
    if (existing) {
      console.log("ℹ️  Admin user already exists, skipping seed.");
      return;
    }

    await User.create({
      name: process.env.ADMIN_NAME || "Admin",
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      role: "admin",
      status: "Active",
    });

    console.log(`✅ Admin user seeded: ${process.env.ADMIN_EMAIL}`);
  } catch (err) {
    console.error("❌ Admin seed error:", err.message);
  }
}
