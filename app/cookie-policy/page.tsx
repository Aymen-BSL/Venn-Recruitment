import type { Metadata } from "next";
import { PolicyPage } from "@/components/policies/PolicyPage";
import { getPolicy } from "@/components/policies/policyContent";

const policy = getPolicy("cookie-policy");

export const metadata: Metadata = {
  title: `${policy.title} | Venn Recruitment`,
  description: policy.description,
};

export default function CookiePolicyPage() {
  return <PolicyPage policy={policy} />;
}
