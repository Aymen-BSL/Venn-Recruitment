import type { Metadata } from "next";
import { PolicyPage } from "@/components/policies/PolicyPage";
import { getPolicy } from "@/components/policies/policyContent";

const policy = getPolicy("terms-and-conditions");

export const metadata: Metadata = {
  title: `${policy.title} | Venn Recruitment`,
  description: policy.description,
  alternates: {
    canonical: "/terms-and-conditions",
  },
};

export default function TermsAndConditionsPage() {
  return <PolicyPage policy={policy} />;
}
