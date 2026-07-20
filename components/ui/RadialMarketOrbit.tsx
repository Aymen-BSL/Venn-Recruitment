"use client";

import { Compass, Globe2, MapPinned } from "lucide-react";
import type { CSSProperties } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
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

type CalloutPlacement = "top" | "right" | "bottom" | "left";

interface ActiveCallout {
  index: number;
  placement: CalloutPlacement;
  x: number;
  y: number;
}

export function RadialMarketOrbit({ items, label }: RadialMarketOrbitProps) {
  const [activeCallout, setActiveCallout] = useState<ActiveCallout | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const calloutRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const measureNode = useCallback((index: number): ActiveCallout | null => {
    const stage = stageRef.current;
    const node = nodeRefs.current[index];

    if (!stage || !node) {
      return null;
    }

    const stageRect = stage.getBoundingClientRect();
    const nodeRect = node.getBoundingClientRect();
    const x = nodeRect.left + nodeRect.width / 2 - stageRect.left;
    const y = nodeRect.top + nodeRect.height / 2 - stageRect.top;
    const deltaX = x - stageRect.width / 2;
    const deltaY = y - stageRect.height / 2;

    let placement: CalloutPlacement;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      placement = deltaX > 0 ? "left" : "right";
    } else {
      placement = deltaY > 0 ? "top" : "bottom";
    }

    return { index, placement, x, y };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setActiveCallout((current) => {
        if (!current) {
          return null;
        }

        return measureNode(current.index) ?? current;
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [measureNode]);

  useEffect(() => {
    if (!activeCallout) {
      return;
    }

    const handleOutsidePointerDown = (event: PointerEvent) => {
      const target = event.target;

      if (target instanceof Element && target.closest("[data-orbit-node]")) {
        return;
      }

      if (target instanceof Node && !calloutRef.current?.contains(target)) {
        setActiveCallout(null);
      }
    };

    document.addEventListener("pointerdown", handleOutsidePointerDown);
    return () => document.removeEventListener("pointerdown", handleOutsidePointerDown);
  }, [activeCallout]);

  if (items.length === 0) {
    return null;
  }

  const activeItem = activeCallout ? items[activeCallout.index] : null;
  const ActiveIcon = activeItem ? marketIcons[activeItem.icon] : null;

  const handleSelect = (index: number) => {
    if (activeCallout?.index === index) {
      setActiveCallout(null);
      return;
    }

    const nextCallout = measureNode(index);

    if (nextCallout) {
      setActiveCallout(nextCallout);
    }
  };

  return (
    <div className={styles.orbit} aria-label={label} role="group">
      <div
        className={styles.stage}
        data-paused={activeCallout !== null || hoveredIndex !== null}
        ref={stageRef}
        role="list"
      >
        <span className={styles.orbitRing} aria-hidden="true" />

        <div className={styles.centerCore} aria-hidden="true">
          <Globe2 size={22} strokeWidth={1.6} />
          <span>Markets</span>
        </div>

        {items.map((item, index) => {
          const angle = (360 / items.length) * index - 90;
          const Icon = marketIcons[item.icon];
          const isActive = index === activeCallout?.index;
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
                aria-controls={isActive ? "market-orbit-callout" : undefined}
                aria-expanded={isActive}
                aria-label={`Show details for ${item.title}`}
                className={styles.node}
                data-active={isActive}
                data-orbit-node
                onClick={() => handleSelect(index)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() =>
                  setHoveredIndex((current) => (current === index ? null : current))
                }
                ref={(node) => {
                  nodeRefs.current[index] = node;
                }}
                type="button"
              >
                <span className={styles.nodeIcon} aria-hidden="true">
                  <Icon size={21} strokeWidth={1.8} />
                </span>
                <span className={styles.nodeLabel}>{item.title}</span>
              </button>
            </div>
          );
        })}

        {activeCallout && activeItem && ActiveIcon ? (
          <div
            className={styles.callout}
            data-placement={activeCallout.placement}
            id="market-orbit-callout"
            ref={calloutRef}
            style={{ left: activeCallout.x, top: activeCallout.y }}
          >
            <div className={styles.calloutBody} aria-live="polite">
              <span className={styles.calloutIcon} aria-hidden="true">
                <ActiveIcon size={20} strokeWidth={1.7} />
              </span>
              <h3>{activeItem.title}</h3>
              <p>{activeItem.description}</p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
