import type { Metadata } from "next";
import { PolicyPage } from "@/components/policies/PolicyPage";
import { getPolicy } from "@/components/policies/policyContent";

const policy = getPolicy("privacy-policy");

export const metadata: Metadata = {
  title: `${policy.title} | Venn Recruitment`,
  description: policy.description,
};

export default function PrivacyPolicyPage() {
  return <PolicyPage policy={policy} />;
}
