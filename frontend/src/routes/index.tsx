import React from "react";
import { Routes, Route } from "react-router-dom";

// Layouts
import PublicLayout from "@/layouts/PublicLayout";
import AdminLayout from "@/layouts/AdminLayout";
import AuthLayout from "@/layouts/AuthLayout";

// Protected Route Guard
import ProtectedRoute from "./protectedRoute";

// Public Pages
import Home from "@/pages/public/Home";
import About from "@/pages/public/About";
import Products from "@/pages/public/Products";
import ProductDetails from "@/pages/public/ProductDetails";
import Manufacturing from "@/pages/public/Manufacturing";
import Quality from "@/pages/public/Quality";
import Gallery from "@/pages/public/Gallery";
import Contact from "@/pages/public/Contact";
import NotFound from "@/pages/public/NotFound";

// Auth Pages
import Login from "@/pages/auth/Login";
import ForgotPassword from "@/pages/auth/ForgotPassword";

// Admin Pages
import Dashboard from "@/pages/admin/Dashboard";
import Company from "@/pages/admin/Company";
import AdminProducts from "@/pages/admin/Products";
import AdminGallery from "@/pages/admin/Gallery";
import Certifications from "@/pages/admin/Certifications";
import Enquiries from "@/pages/admin/Enquiries";
import Users from "@/pages/admin/Users";
import Settings from "@/pages/admin/Settings";

export function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/manufacturing" element={<Manufacturing />} />
        <Route path="/quality" element={<Quality />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>

      {/* Admin Routes (Protected) */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="company" element={<Company />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="gallery" element={<AdminGallery />} />
        <Route path="certifications" element={<Certifications />} />
        <Route path="enquiries" element={<Enquiries />} />
        <Route path="users" element={<Users />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Fallback 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
