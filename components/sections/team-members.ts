import type { TeamMember } from "@/components/ui/TeamMemberCard";

// Temporary profiles for layout preview. Replace these entries with the real team.
export const teamMembers: readonly TeamMember[] = [
  {
    image: "/media/team/temporary-man-1.webp",
    name: "Omar Rahman",
    role: "Managing Director",
  },
  {
    image: "/media/team/temporary-man-2.webp",
    name: "Adam Bennett",
    role: "Recruitment Partner",
  },
  {
    image: "/media/team/temporary-man-3.webp",
    name: "Elias Morgan",
    role: "Talent Consultant",
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
