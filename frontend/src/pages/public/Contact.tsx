import React, { useState } from "react";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/common/Button";
import { PageHeader, Section, SectionHeading } from "@/components/common/Section";
import { company } from "@/data/company";
import { useSubmitEnquiry } from "@/hooks/useEnquiries";
import { toast } from "sonner";

const fieldClass =
  "mt-1.5 w-full rounded-md border border-input bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/25";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const submitEnquiry = useSubmitEnquiry();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error("Please fill in all required fields.");
      return;
    }

    submitEnquiry.mutate(formData, {
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
            <SectionHeading eyebrow="Company information" title="Registered office & plant" />
            <ul className="mt-8 space-y-5">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <span className="text-sm leading-relaxed text-muted-foreground">
                  {company.address.line1}
                  <br />
                  {company.address.line2}
                  <br />
                  {company.address.city} {company.address.postalCode}, {company.address.country}
                </span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <span className="text-sm text-muted-foreground">
                  <a href={`tel:${company.phone}`} className="hover:text-primary">
                    {company.phone}
                  </a>
                  <br />
                  <a href={`tel:${company.altPhone}`} className="hover:text-primary">
                    {company.altPhone}
                  </a>
                </span>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <span className="text-sm text-muted-foreground">
                  <a href={`mailto:${company.email}`} className="break-all hover:text-primary">
                    {company.email}
                  </a>
                  <br />
                  <a href={`mailto:${company.salesEmail}`} className="break-all hover:text-primary">
                    {company.salesEmail}
                  </a>
                </span>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <span className="text-sm text-muted-foreground">{company.workingHours}</span>
              </li>
            </ul>
          </div>

          <form
            className="rounded-lg border border-border bg-card p-7 shadow-card"
            onSubmit={handleSubmit}
          >
            <h2 className="font-display text-xl font-bold text-card-foreground">Send an enquiry</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <label className="text-sm font-medium text-card-foreground">
                Full name *
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={fieldClass}
                  placeholder="Your name"
                  required
                />
              </label>
              <label className="text-sm font-medium text-card-foreground">
                Company
                <input
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
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
                  className={fieldClass}
                  placeholder="you@company.com"
                  required
                />
              </label>
              <label className="text-sm font-medium text-card-foreground">
                Phone
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={fieldClass}
                  placeholder="+91 00000 00000"
                />
              </label>
              <label className="text-sm font-medium text-card-foreground sm:col-span-2">
                Subject *
                <input
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
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
                  className={fieldClass}
                  placeholder="How can we help?"
                  required
                />
              </label>
            </div>
            <Button
              type="submit"
              className="mt-6 w-full sm:w-auto"
              disabled={submitEnquiry.isPending}
            >
              {submitEnquiry.isPending ? "Submitting..." : "Submit Enquiry"}
            </Button>
            <p className="mt-3 text-xs text-muted-foreground">
              Form submission will be connected to the backend enquiry API.
            </p>
          </form>
        </div>
      </Section>

      <Section muted>
        <SectionHeading eyebrow="Location" title="Find us" />
        <div className="mt-8 grid h-80 place-items-center rounded-lg border border-dashed border-border bg-background text-sm text-muted-foreground">
          Embedded map placeholder
        </div>
      </Section>
    </>
  );
}

export default Contact;
