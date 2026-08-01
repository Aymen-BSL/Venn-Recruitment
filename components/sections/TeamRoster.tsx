"use client";

import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import { Marquee } from "@/components/ui/Marquee";
import { TeamMemberCard } from "@/components/ui/TeamMemberCard";
import { teamMembers } from "./team-members";
import styles from "./TeamSection.module.css";

const mobilePreviewCount = 3;

export function TeamRoster() {
  const [showAll, setShowAll] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const visibleMembers = showAll
    ? teamMembers
    : teamMembers.slice(0, mobilePreviewCount);

  function toggleMembers() {
    if (showAll) {
      const buttonTopBeforeCollapse =
        buttonRef.current?.getBoundingClientRect().top;

      flushSync(() => setShowAll(false));

      const buttonTopAfterCollapse =
        buttonRef.current?.getBoundingClientRect().top;

      if (
        buttonTopBeforeCollapse !== undefined &&
        buttonTopAfterCollapse !== undefined
      ) {
        window.scrollBy({
          behavior: "instant",
          top: buttonTopAfterCollapse - buttonTopBeforeCollapse,
        });
      }

      return;
    }

    setShowAll(true);
  }

  return (
    <>
      <div className={styles.mobileRoster}>
        <div className={styles.mobileCards} id="mobile-team-members">
          {visibleMembers.map((member) => (
            <TeamMemberCard key={member.name} member={member} />
          ))}
        </div>
        <button
          ref={buttonRef}
          aria-controls="mobile-team-members"
          aria-expanded={showAll}
          className={`button button-light ${styles.showMembersButton}`}
          onClick={toggleMembers}
          type="button"
        >
          {showAll ? "Show fewer members" : "Show all team members"}
        </button>
      </div>

      <div className={styles.desktopRoster}>
        <Marquee pauseOnHover>
          {teamMembers.map((member) => (
            <TeamMemberCard key={member.name} member={member} />
          ))}
        </Marquee>
      </div>
    </>
  );
}
