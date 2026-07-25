import type { Metadata } from "next";
import { PolicyPage } from "@/components/policies/PolicyPage";
import { getPolicy } from "@/components/policies/policyContent";

const policy = getPolicy("trust-and-safety");

export const metadata: Metadata = {
  title: `${policy.title} | Venn Recruitment`,
  description: policy.description,
  alternates: {
    canonical: "/trust-and-safety",
  },
};

export default function TrustAndSafetyPage() {
  return <PolicyPage policy={policy} />;
}
