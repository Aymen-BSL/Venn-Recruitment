"use client";

import { Compass, Globe2, MapPinned } from "lucide-react";
import type { CSSProperties } from "react";
import { useState } from "react";
import styles from "./RadialMarketOrbit.module.css";

const marketIcons = {
  region: MapPinned,
  international: Globe2,
  aware: Compass,
};

export type MarketOrbitIcon = keyof typeof marketIcons;

export interface MarketOrbitItem {
  title: string;
  description: string;
  icon: MarketOrbitIcon;
}

interface RadialMarketOrbitProps {
  items: readonly MarketOrbitItem[];
  label: string;
}

export function RadialMarketOrbit({ items, label }: RadialMarketOrbitProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (items.length === 0) {
    return null;
  }

  const activeItem = items[activeIndex] ?? items[0];
  const ActiveIcon = marketIcons[activeItem.icon];

  return (
    <div className={styles.orbit} aria-label={label} role="group">
      <div className={styles.stage} role="list">
        <span className={styles.orbitRing} aria-hidden="true" />

        <div className={styles.centerCard} aria-live="polite">
          <span className={styles.centerIcon} aria-hidden="true">
            <ActiveIcon size={21} strokeWidth={1.7} />
          </span>
          <h3>{activeItem.title}</h3>
          <p>{activeItem.description}</p>
        </div>

        {items.map((item, index) => {
          const angle = (360 / items.length) * index - 90;
          const Icon = marketIcons[item.icon];
          const isActive = index === activeIndex;
          const positionStyle = {
            "--node-angle": `${angle}deg`,
            "--node-angle-inverse": `${-angle}deg`,
          } as CSSProperties;

          return (
            <div
              className={styles.nodePosition}
              key={item.title}
              role="listitem"
              style={positionStyle}
            >
              <button
                aria-label={`Show ${item.title}`}
                aria-pressed={isActive}
                className={styles.node}
                data-active={isActive}
                onClick={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                type="button"
              >
                <span className={styles.nodeIcon} aria-hidden="true">
                  <Icon size={19} strokeWidth={1.8} />
                </span>
                <span className={styles.nodeLabel}>{item.title}</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
