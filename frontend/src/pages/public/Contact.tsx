import React, { useEffect, useState } from "react";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/common/Button";
import { PageHeader, Section, SectionHeading } from "@/components/common/Section";
import { useSubmitEnquiry } from "@/hooks/useEnquiries";
import { useAuth } from "@/context/AuthContext";
import { useCompany } from "@/hooks/useCompany";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const fieldClass =
  "mt-1.5 w-full rounded-md border border-input bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/25";

export function Contact() {
  const { data: companyInfo } = useCompany();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const submitEnquiry = useSubmitEnquiry();

  useEffect(() => {
    if (!user) return;
    setFormData((current) => ({
      ...current,
      name: current.name || user.name,
      email: current.email || user.email,
    }));
  }, [user]);

  const requireRegistration = () => {
    if (!isAuthenticated) navigate("/login?mode=signup&redirect=/contact");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = formData.name.trim() || user?.name.trim() || "";
    const email = formData.email.trim() || user?.email.trim() || "";
    const phone = formData.phone.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!name || !email || !phone || !formData.subject.trim() || !formData.message.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (!emailPattern.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (!/^\d{10}$/.test(phone)) {
      toast.error("Please enter a valid 10-digit phone number.");
      return;
    }

    submitEnquiry.mutate({ ...formData, name, email, phone }, {
      onSuccess: () => {
        toast.success("Your enquiry has been submitted successfully!");
        setFormData({
          name: "",
          company: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      },
      onError: () => {
        toast.error("Something went wrong. Please try again.");
      },
    });
  };

  return (
    <>
      <PageHeader
        eyebrow="Contact us"
        title="Talk to our team"
        description="For product enquiries, distribution partnerships or third-party manufacturing, reach out and our team will respond within one working day."
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]">
          <div>
            <SectionHeading eyebrow="Company information" title="Registered office" />
            <ul className="mt-8 space-y-5">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <span className="text-sm leading-relaxed text-muted-foreground">
                  {companyInfo?.address.line1}
                  <br />
                  {companyInfo?.address.line2}
                  <br />
                  {companyInfo?.address.city} {companyInfo?.address.postalCode}, {companyInfo?.address.country}
                </span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <span className="text-sm text-muted-foreground">
                  <a href={`tel:${companyInfo?.phone}`} className="hover:text-primary">
                    {companyInfo?.phone}
                  </a>
                  <br />
                  <a href={`tel:${companyInfo?.altPhone}`} className="hover:text-primary">
                    {companyInfo?.altPhone}
                  </a>
                </span>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <span className="text-sm text-muted-foreground">
                  <a href={`mailto:${companyInfo?.email}`} className="break-all hover:text-primary">
                    {companyInfo?.email}
                  </a>
                </span>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <span className="text-sm text-muted-foreground">{companyInfo?.workingHours}</span>
              </li>
            </ul>
          </div>

          <form
            className="rounded-lg border border-border bg-card p-7 shadow-card"
            onSubmit={(event) => {
              if (!isAuthenticated) {
                event.preventDefault();
                requireRegistration();
                return;
              }
              handleSubmit(event);
            }}
            onClick={requireRegistration}
          >
            <h2 className="font-display text-xl font-bold text-card-foreground">Send an enquiry</h2>
            {!isAuthenticated ? (
              <div className="mt-6 rounded-md border border-primary/20 bg-primary-soft/40 p-4 text-sm text-muted-foreground">
                Please register or sign in before using the enquiry form.
              </div>
            ) : null}
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <label className="text-sm font-medium text-card-foreground">
                Full name *
                <input
                  name="name"
                  value={formData.name || user?.name || ""}
                  onChange={handleChange}
                  disabled={!isAuthenticated || Boolean(user)}
                  className={fieldClass}
                  required
                />
              </label>
              <label className="text-sm font-medium text-card-foreground">
                Company
                <input
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  disabled={!isAuthenticated}
                  className={fieldClass}
                  placeholder="Company name"
                />
              </label>
              <label className="text-sm font-medium text-card-foreground">
                Email *
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isAuthenticated || Boolean(user)}
                  className={fieldClass}
                  required
                />
              </label>
              <label className="text-sm font-medium text-card-foreground">
                Phone *
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={!isAuthenticated}
                  className={fieldClass}
                  inputMode="numeric"
                  maxLength={10}
                  required
                />
              </label>
              <label className="text-sm font-medium text-card-foreground sm:col-span-2">
                Subject *
                <input
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  disabled={!isAuthenticated}
                  className={fieldClass}
                  placeholder="Product enquiry"
                  required
                />
              </label>
              <label className="text-sm font-medium text-card-foreground sm:col-span-2">
                Message *
                <textarea
                  rows={5}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  disabled={!isAuthenticated}
                  className={fieldClass}
                  placeholder="How can we help?"
                  required
                />
              </label>
            </div>
            {isAuthenticated ? (
              <Button type="submit" className="mt-6 w-full sm:w-auto" disabled={submitEnquiry.isPending}>
                {submitEnquiry.isPending ? "Submitting..." : "Submit Enquiry"}
              </Button>
            ) : null}
          </form>
        </div>
      </Section>

      <Section muted>
        <SectionHeading eyebrow="Location" title="Find us" />
        <div className="mt-8 overflow-hidden rounded-lg border border-border bg-background shadow-card">
          <iframe
            title="Byadhi Cure Lab location"
            src={`https://www.google.com/maps?q=${encodeURIComponent([companyInfo?.address.line1, companyInfo?.address.line2, companyInfo?.address.city, companyInfo?.address.postalCode, companyInfo?.address.country].filter(Boolean).join(", "))}&output=embed`}
            className="h-80 w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="flex items-center justify-between gap-3 border-t border-border px-4 py-3 text-sm">
            <span className="text-muted-foreground">Byadhi Cure Lab location</span>
            <a href="https://maps.app.goo.gl/zga2faCddj4UWnn37" target="_blank" rel="noreferrer" className="font-semibold text-primary hover:underline">Open in Google Maps</a>
          </div>
        </div>
      </Section>
    </>
  );
}

export default Contact;
