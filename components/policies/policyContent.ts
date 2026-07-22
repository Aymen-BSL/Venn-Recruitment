export type PolicySection = {
  heading: string;
  paragraphs?: readonly string[];
  items?: readonly string[];
};

export type PolicyDocument = {
  description: string;
  eyebrow: string;
  intro: string;
  slug: PolicySlug;
  sections: readonly PolicySection[];
  title: string;
};

export type PolicySlug =
  | "privacy-policy"
  | "terms-and-conditions"
  | "cookie-policy"
  | "trust-and-safety";

export const policyOrder: readonly PolicySlug[] = [
  "privacy-policy",
  "terms-and-conditions",
  "cookie-policy",
  "trust-and-safety",
];

export const policies: Record<PolicySlug, PolicyDocument> = {
  "privacy-policy": {
    slug: "privacy-policy",
    eyebrow: "Your information",
    title: "Privacy Policy",
    description: "How Venn Recruitment handles personal information shared through our website and recruitment services.",
    intro:
      "This policy explains what personal information we collect, why we use it, when we share it, and the choices available to candidates, clients, and website visitors.",
    sections: [
      {
        heading: "Information we collect",
        paragraphs: [
          "We collect information you provide directly, including your name, contact details, CV, employment history, qualifications, role preferences, salary expectations, right-to-work information, and messages sent to Venn Recruitment.",
          "Clients and prospective clients may provide business contact details, hiring requirements, interview feedback, and information needed to manage a recruitment assignment.",
        ],
        items: [
          "Candidate profile and application information",
          "Client, supplier, and business contact information",
          "Communications and service correspondence",
          "Basic technical information such as browser type, device type, IP address, and pages visited",
        ],
      },
      {
        heading: "How we use information",
        paragraphs: [
          "We use personal information to deliver recruitment services, respond to enquiries, assess potential role fit, introduce candidates to appropriate employers with suitable permission, improve our services, protect our users, and meet legal obligations.",
          "Where applicable law requires a legal basis, we rely on consent, steps taken at your request before entering a contract, performance of a contract, compliance with law, or our legitimate interests in operating a responsible recruitment business.",
        ],
      },
      {
        heading: "When information is shared",
        paragraphs: [
          "Candidate information may be shared with prospective employers and recruitment partners when relevant to an opportunity and with appropriate permission. We may also use service providers that support hosting, communications, document management, professional advice, and business operations.",
          "We do not sell personal information. We may disclose information when required by law, to protect people or our services, or as part of a business reorganisation subject to appropriate safeguards.",
        ],
      },
      {
        heading: "International transfers",
        paragraphs: [
          "Recruitment across Middle Eastern and international markets can involve transferring information to another country. When required, we use contractual, organisational, or other recognised safeguards intended to protect information across borders.",
        ],
      },
      {
        heading: "Retention and security",
        paragraphs: [
          "Information submitted through the Contact, Hire Talent, and Submit CV forms is stored in our restricted recruitment database. CV documents are kept in private, non-public object storage and are not made available through permanent public links.",
          "Website form submissions and uploaded CVs are scheduled for deletion 12 months after submission. We may retain a record longer when reasonably required for an active recruitment relationship, a dispute, or a legal or regulatory obligation; this retention wording should be reviewed by qualified counsel before launch.",
          "We use proportionate technical and organisational measures to protect information, including server-side validation and access controls. No internet transmission or storage system can be guaranteed completely secure, so please avoid sending unnecessary sensitive information through general contact forms.",
        ],
      },
      {
        heading: "Your choices and rights",
        paragraphs: [
          "Depending on where you live, you may have rights to access, correct, delete, restrict, object to, or receive a copy of your personal information, and to withdraw consent. Some rights are subject to legal exceptions.",
          "To make a request, use the contact form on our website and identify the request as privacy-related. We may need to verify your identity before responding.",
        ],
      },
      {
        heading: "Updates and contact",
        paragraphs: [
          "We may update this policy when our services, technology, or legal obligations change. The latest version will appear on this page with its updated date.",
          "Questions or concerns can be sent through the Contact Venn form. If a local privacy regulator applies to you, you may also have the right to complain to that authority.",
        ],
      },
    ],
  },
  "terms-and-conditions": {
    slug: "terms-and-conditions",
    eyebrow: "Website terms",
    title: "Terms and Conditions",
    description: "The terms that apply when you access Venn Recruitment's website and use its online services.",
    intro:
      "By using this website, you agree to these terms. Separate written terms may apply when Venn Recruitment provides recruitment services to a candidate, client, or supplier.",
    sections: [
      {
        heading: "Using this website",
        paragraphs: [
          "You may use this website for lawful personal or business purposes connected with recruitment, careers, and Venn Recruitment's services. You must not interfere with the website, attempt unauthorised access, introduce malicious code, scrape it at scale, or use its content to mislead or harm another person.",
        ],
      },
      {
        heading: "Candidate information",
        paragraphs: [
          "You are responsible for ensuring that information in your CV, profile, and communications is accurate and that you have the right to provide it. Submitting information does not create an employment relationship, agency relationship, or guarantee an interview, placement, or response.",
          "You should not include sensitive information that is not reasonably needed for recruitment. Our handling of personal information is described in the Privacy Policy.",
        ],
      },
      {
        heading: "Vacancies and introductions",
        paragraphs: [
          "Vacancy details may change, close, or be withdrawn without notice. Information about employers, roles, compensation, visas, locations, and working conditions is provided for general guidance and should be independently confirmed before you make a decision.",
          "Employers remain responsible for hiring decisions, employment terms, workplace conditions, background checks, and compliance with applicable employment and immigration laws.",
        ],
      },
      {
        heading: "Intellectual property",
        paragraphs: [
          "The website's design, branding, text, graphics, and other original content are owned by or licensed to Venn Recruitment and are protected by applicable intellectual property laws. You may view and print reasonable extracts for personal, non-commercial use, but may not reproduce or commercially exploit them without permission.",
        ],
      },
      {
        heading: "Third-party services",
        paragraphs: [
          "Links to third-party websites are provided for convenience. Venn Recruitment does not control their content, security, availability, or privacy practices and is not responsible for them. A link does not necessarily imply endorsement.",
        ],
      },
      {
        heading: "Availability and liability",
        paragraphs: [
          "We aim to keep the website accurate and available but do not promise uninterrupted access or that all content is complete, current, or error-free. To the extent permitted by law, Venn Recruitment is not liable for indirect or consequential loss arising solely from use of, or inability to use, this website.",
          "Nothing in these terms excludes liability that cannot legally be excluded or limits rights that applicable consumer law gives you.",
        ],
      },
      {
        heading: "Changes, applicable terms, and contact",
        paragraphs: [
          "We may update these terms by publishing a revised version here. The legal entity, governing law, and dispute terms applicable to a paid or contracted recruitment service will be identified in the relevant written agreement.",
          "Questions about these terms can be sent through the Contact Venn form.",
        ],
      },
    ],
  },
  "cookie-policy": {
    slug: "cookie-policy",
    eyebrow: "Website technology",
    title: "Cookie Policy",
    description: "How cookies and similar browser technologies may be used on the Venn Recruitment website.",
    intro:
      "Cookies are small text files stored by a browser. This policy explains the categories Venn Recruitment may use and how you can control them.",
    sections: [
      {
        heading: "Current website use",
        paragraphs: [
          "The current public website does not set cookies or use browser storage for analytics, advertising, preferences, or cross-site tracking. It operates without optional tracking technology.",
        ],
      },
      {
        heading: "If this changes",
        paragraphs: [
          "If Venn Recruitment later introduces analytics, embedded third-party services, advertising technology, or another feature that stores or reads information on your device, this policy will be updated before activation. Where applicable law requires consent, the technology will remain disabled until you make a choice.",
        ],
      },
      {
        heading: "Contact",
        paragraphs: [
          "Questions about website technology or privacy can be sent through the Contact Venn form.",
        ],
      },
    ],
  },
  "trust-and-safety": {
    slug: "trust-and-safety",
    eyebrow: "Safe recruitment",
    title: "Trust and Safety Policy",
    description: "The standards Venn Recruitment follows to promote fair, secure, and respectful recruitment.",
    intro:
      "Recruitment depends on trust. This policy describes the conduct we expect, the warning signs candidates and clients should know, and how concerns can be reported.",
    sections: [
      {
        heading: "Our commitments",
        items: [
          "Treat candidates, clients, suppliers, and colleagues with dignity and respect.",
          "Handle personal and commercial information responsibly and share it only for appropriate recruitment purposes.",
          "Communicate roles and processes honestly, correcting material errors when identified.",
          "Review credible reports of fraud, harassment, discrimination, exploitation, conflicts of interest, or unsafe conduct.",
        ],
      },
      {
        heading: "Fair and respectful conduct",
        paragraphs: [
          "Venn Recruitment does not tolerate harassment, threats, discrimination, retaliation, or exploitation in interactions connected with our services. Hiring decisions should be based on lawful and role-relevant criteria.",
          "Candidates and clients are expected to provide accurate information, communicate respectfully, protect confidential material, and comply with applicable employment, immigration, anti-bribery, sanctions, and human-rights laws.",
        ],
      },
      {
        heading: "Recruitment fraud and payments",
        paragraphs: [
          "Be cautious of unexpected messages, look-alike domains, pressure to act immediately, requests to move conversations to unverified channels, and offers made without a credible assessment process.",
          "Candidates should not pay Venn Recruitment a fee in exchange for being considered for a role. Do not send money, banking credentials, passwords, one-time codes, or unnecessary identity documents in response to an unverified message. Independently confirm any request through the contact details published on this website.",
        ],
      },
      {
        heading: "Protecting information",
        paragraphs: [
          "Only provide information reasonably required for the stage of the recruitment process. Sensitive identity, background-check, banking, medical, or immigration records should be requested and transferred through an appropriate secure process with a clear explanation of why they are needed.",
          "If you believe information has been sent to the wrong person or an account has been compromised, report it promptly and avoid forwarding or further using the material.",
        ],
      },
      {
        heading: "Reporting a concern",
        paragraphs: [
          "Use the Contact Venn form to report suspected fraud, impersonation, harassment, discrimination, unsafe working conditions, privacy concerns, or other misconduct connected with our services. Include relevant dates, names, messages, and links where it is safe to do so, but do not put yourself at risk to gather evidence.",
          "We review reports in proportion to their seriousness and may restrict contact, preserve records, notify an affected organisation, or refer a matter to an appropriate authority. Confidentiality will be respected where reasonably possible, but cannot be guaranteed when disclosure is required to investigate or comply with law.",
        ],
      },
      {
        heading: "Immediate danger and emergencies",
        paragraphs: [
          "Venn Recruitment is not an emergency service. If someone is in immediate danger or you believe a crime is in progress, contact local emergency services or the relevant public authority first.",
        ],
      },
      {
        heading: "No retaliation and policy updates",
        paragraphs: [
          "Good-faith concerns should not lead to retaliation by Venn Recruitment. Deliberately false or abusive reports may themselves breach these standards.",
          "We may update this policy as risks, services, and legal obligations change. The latest version will be published on this page.",
        ],
      },
    ],
  },
};

export function getPolicy(slug: PolicySlug) {
  return policies[slug];
}
