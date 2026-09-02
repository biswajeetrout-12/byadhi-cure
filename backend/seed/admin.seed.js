import User from "../models/User.js";


export async function seedAdmin() {
  try {
    const existing = await User.findOne({ email: process.env.ADMIN_EMAIL });
    if (existing) {
      // Migrate old lowercase role to PascalCase if needed
      if (existing.role === "admin") {
        await User.updateOne({ email: process.env.ADMIN_EMAIL }, { role: "Admin" });
        console.log("✅ Admin role migrated from 'admin' to 'Admin'.");
      } else {
        console.log("ℹ️  Admin user already exists, skipping seed.");
      }
      return;
    }

    await User.create({
      name: process.env.ADMIN_NAME || "Admin",
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      role: "Admin",
      status: "Active",
    });

    console.log(`✅ Admin user seeded: ${process.env.ADMIN_EMAIL}`);
  } catch (err) {
    console.error("❌ Admin seed error:", err.message);
  }
}

export async function seedSuperadmin() {
  try {
    if (!process.env.SUPERADMIN_EMAIL || !process.env.SUPERADMIN_PASSWORD) {
      console.log("Superadmin seed skipped: SUPERADMIN_EMAIL and SUPERADMIN_PASSWORD are not configured.");
      return;
    }

    const existing = await User.findOne({ email: process.env.SUPERADMIN_EMAIL });
    if (existing) {
      console.log("Superadmin user already exists, skipping seed.");
      return;
    }

    await User.create({
      name: process.env.SUPERADMIN_NAME || "Superadmin",
      email: process.env.SUPERADMIN_EMAIL,
      password: process.env.SUPERADMIN_PASSWORD,
      role: "Superadmin",
      status: "Active",
    });
    console.log(`Superadmin user created: ${process.env.SUPERADMIN_EMAIL}`);
  } catch (error) {
    console.error("Superadmin seed error:", error.message);
  }
}
