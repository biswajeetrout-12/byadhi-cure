import React, { useEffect, useState } from "react";
import { Button } from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import Loader from "@/components/common/Loader";
import { useCompany, useUpdateCompany } from "@/hooks/useCompany";
import type { CompanyInfo } from "@/types/company";
import { toast } from "sonner";

const fieldClass =
  "mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-ring/25";

type CompanyForm = {
  name: string;
  intro: string;
  aboutIntro: string;
  seoTitle: string;
  seoDescription: string;
  phone: string;
  altPhone: string;
  email: string;
  workingHours: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  postalCode: string;
  country: string;
};

const emptyForm: CompanyForm = {
  name: "", intro: "", aboutIntro: "", seoTitle: "", seoDescription: "", phone: "", altPhone: "", email: "", workingHours: "",
  addressLine1: "", addressLine2: "", city: "", postalCode: "", country: "",
};

function toForm(company: CompanyInfo): CompanyForm {
  return {
    name: company.name, intro: company.intro, aboutIntro: company.aboutIntro || "", seoTitle: company.seoTitle || "", seoDescription: company.seoDescription || "", phone: company.phone,
    altPhone: company.altPhone, email: company.email, workingHours: company.workingHours,
    addressLine1: company.address.line1, addressLine2: company.address.line2, city: company.address.city,
    postalCode: company.address.postalCode, country: company.address.country,
  };
}

export function Company() {
  const { data: company, isLoading, isError } = useCompany();
  const updateCompany = useUpdateCompany();
  const [values, setValues] = useState<CompanyForm>(emptyForm);
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    if (company) setValues(toForm(company));
  }, [company]);

  const updateField = (field: keyof CompanyForm, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!company) return;
    setConfirmOpen(true);
  };

  const confirmUpdate = async () => {
    try {
      await updateCompany.mutateAsync({
        name: values.name,
        intro: values.intro,
        aboutIntro: values.aboutIntro,
        seoTitle: values.seoTitle,
        seoDescription: values.seoDescription,
        phone: values.phone,
        altPhone: values.altPhone,
        email: values.email,
        workingHours: values.workingHours,
        address: {
          line1: values.addressLine1,
          line2: values.addressLine2,
          city: values.city,
          postalCode: values.postalCode,
          country: values.country,
        },
      });
      toast.success("Company information updated.");
      setConfirmOpen(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update company information.");
    }
  };

  if (isLoading) return <Loader size="lg" />;
  if (isError || !company) return <p className="text-sm text-destructive">Company information could not be loaded.</p>;

  return (
    <form className="w-full max-w-none rounded-lg border border-border bg-card p-6 shadow-card" onSubmit={handleSubmit}>
      <h2 className="font-display text-lg font-bold text-card-foreground">Company information</h2>
      <p className="mt-1 text-sm text-muted-foreground">These values are stored in MongoDB and populate the public website.</p>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <label className="text-sm font-medium text-card-foreground md:col-span-2">Company name<input className={fieldClass} value={values.name} onChange={(event) => updateField("name", event.target.value)} /></label>
        <label className="text-sm font-medium text-card-foreground md:col-span-2">Home introduction<textarea rows={4} className={fieldClass} value={values.intro} onChange={(event) => updateField("intro", event.target.value)} /></label>
        <label className="text-sm font-medium text-card-foreground md:col-span-2">About introduction<textarea rows={6} className={fieldClass} value={values.aboutIntro} onChange={(event) => updateField("aboutIntro", event.target.value)} /></label>
        <label className="text-sm font-medium text-card-foreground">SEO title (optional)<input className={fieldClass} maxLength={160} value={values.seoTitle} onChange={(event) => updateField("seoTitle", event.target.value)} /></label>
        <label className="text-sm font-medium text-card-foreground">SEO description (optional)<textarea rows={2} maxLength={320} className={fieldClass} value={values.seoDescription} onChange={(event) => updateField("seoDescription", event.target.value)} /></label>
        <label className="text-sm font-medium text-card-foreground">Phone<input className={fieldClass} value={values.phone} onChange={(event) => updateField("phone", event.target.value)} /></label>
        <label className="text-sm font-medium text-card-foreground">Alternative phone<input className={fieldClass} value={values.altPhone} onChange={(event) => updateField("altPhone", event.target.value)} /></label>
        <label className="text-sm font-medium text-card-foreground">Email<input className={fieldClass} value={values.email} onChange={(event) => updateField("email", event.target.value)} /></label>
        <label className="text-sm font-medium text-card-foreground md:col-span-2">Working hours<input className={fieldClass} value={values.workingHours} onChange={(event) => updateField("workingHours", event.target.value)} /></label>
        <label className="text-sm font-medium text-card-foreground">Address line 1<input className={fieldClass} value={values.addressLine1} onChange={(event) => updateField("addressLine1", event.target.value)} /></label>
        <label className="text-sm font-medium text-card-foreground">Address line 2<input className={fieldClass} value={values.addressLine2} onChange={(event) => updateField("addressLine2", event.target.value)} /></label>
        <label className="text-sm font-medium text-card-foreground">City<input className={fieldClass} value={values.city} onChange={(event) => updateField("city", event.target.value)} /></label>
        <label className="text-sm font-medium text-card-foreground">Postal code<input className={fieldClass} value={values.postalCode} onChange={(event) => updateField("postalCode", event.target.value)} /></label>
        <label className="text-sm font-medium text-card-foreground">Country<input className={fieldClass} value={values.country} onChange={(event) => updateField("country", event.target.value)} /></label>
      </div>
      <Button type="submit" className="mt-6" disabled={updateCompany.isPending}>{updateCompany.isPending ? "Saving..." : "Save changes"}</Button>
      <Modal isOpen={confirmOpen} onClose={() => setConfirmOpen(false)} title="Confirm company update" className="max-w-md">
        <p className="text-sm leading-relaxed text-muted-foreground">Save the updated company information now?</p>
        <div className="mt-6 flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button type="button" onClick={confirmUpdate} disabled={updateCompany.isPending}>{updateCompany.isPending ? "Saving..." : "Confirm update"}</Button>
        </div>
      </Modal>
    </form>
  );
}

export default Company;
