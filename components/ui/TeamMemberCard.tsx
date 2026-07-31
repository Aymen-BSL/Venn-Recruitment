import Image from "next/image";
import styles from "./TeamMemberCard.module.css";

export type TeamMember = {
  image: string;
  name: string;
  role: string;
};

type TeamMemberCardProps = {
  member: TeamMember;
};

export function TeamMemberCard({ member }: TeamMemberCardProps) {
  return (
    <article className={styles.card}>
      <Image
        alt={`${member.name}, ${member.role}`}
        className={styles.image}
        fill
        sizes="(min-width: 1100px) 22vw, (min-width: 700px) 46vw, 78vw"
        src={member.image}
      />
      <div className={styles.identity}>
        <h3>{member.name}</h3>
        <p>{member.role}</p>
      </div>
    </article>
  );
}
