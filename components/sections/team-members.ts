import type { TeamMember } from "@/components/ui/TeamMemberCard";

// Real team members appear first. Replace the remaining placeholders as photos arrive.
export const teamMembers: readonly TeamMember[] = [
  {
    image: "/media/team/ahmed-rosanally.webp",
    name: "Ahmed Rosanally",
    role: "Co-Founder",
  },
  {
    image: "/media/team/aymen-ben-salem.webp",
    name: "Aymen Ben Salem",
    role: "Co-Founder",
  },
  {
    image: "/media/team/yasir-gangat.webp",
    name: "Yasir Gangat",
    role: "Co-Founder",
  },
  {
    image: "/media/team/temporary-man-4.webp",
    name: "Daniel Hart",
    role: "Client Partnerships",
  },
  {
    image: "/media/team/temporary-man-5.webp",
    name: "Karim Haddad",
    role: "Senior Recruiter",
  },
  {
    image: "/media/team/temporary-man-6.webp",
    name: "Marcus Reed",
    role: "Candidate Consultant",
  },
  {
    image: "/media/team/temporary-man-7.webp",
    name: "Noah Collins",
    role: "Operations Coordinator",
  },
] as const;
