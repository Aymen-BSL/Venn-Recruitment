"use client";

import gsap from "gsap";
import { Compass, Globe2, MapPinned } from "lucide-react";
import type { CSSProperties } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

import { useReducedMotion } from "@/hooks/useReducedMotion";

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

interface ActiveCallout {
  index: number;
  x: number;
  y: number;
}

export function RadialMarketOrbit({ items, label }: RadialMarketOrbitProps) {
  const reducedMotion = useReducedMotion();
  const [activeCallout, setActiveCallout] = useState<ActiveCallout | null>(null);
  const [isPositioning, setIsPositioning] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const autoTweenRef = useRef<gsap.core.Tween | null>(null);
  const calloutRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const positionTweenRef = useRef<gsap.core.Tween | null>(null);
  const rotationRef = useRef({ value: 0 });
  const stageRef = useRef<HTMLDivElement>(null);

  const updateRotation = useCallback(() => {
    stageRef.current?.style.setProperty(
      "--orbit-rotation",
      `${rotationRef.current.value}deg`,
    );
  }, []);

  const startAutoRotation = useCallback(() => {
    autoTweenRef.current?.kill();

    if (reducedMotion || !stageRef.current) {
      return;
    }

    const startValue = rotationRef.current.value;
    autoTweenRef.current = gsap.to(rotationRef.current, {
      duration: 30,
      ease: "none",
      onUpdate: updateRotation,
      repeat: -1,
      value: startValue + 360,
    });
  }, [reducedMotion, updateRotation]);

  const measureNode = useCallback((index: number): ActiveCallout | null => {
    const stage = stageRef.current;
    const node = nodeRefs.current[index];

    if (!stage || !node) {
      return null;
    }

    const stageRect = stage.getBoundingClientRect();
    const nodeRect = node.getBoundingClientRect();

    return {
      index,
      x: nodeRect.left + nodeRect.width / 2 - stageRect.left,
      y: nodeRect.top + nodeRect.height / 2 - stageRect.top,
    };
  }, []);

  const closeSelection = useCallback(() => {
    const currentIndex = selectedIndex;

    positionTweenRef.current?.kill();
    positionTweenRef.current = null;
    setActiveCallout(null);
    setIsPositioning(false);
    setSelectedIndex(null);

    if (currentIndex !== null) {
      nodeRefs.current[currentIndex]?.blur();
    }

    startAutoRotation();
  }, [selectedIndex, startAutoRotation]);

  useEffect(() => {
    updateRotation();
    startAutoRotation();

    return () => {
      autoTweenRef.current?.kill();
      positionTweenRef.current?.kill();
    };
  }, [startAutoRotation, updateRotation]);

  useEffect(() => {
    const handleResize = () => {
      if (selectedIndex === null || isPositioning) {
        return;
      }

      const nextCallout = measureNode(selectedIndex);
      if (nextCallout) {
        setActiveCallout(nextCallout);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isPositioning, measureNode, selectedIndex]);

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
        closeSelection();
      }
    };

    document.addEventListener("pointerdown", handleOutsidePointerDown);
    return () => document.removeEventListener("pointerdown", handleOutsidePointerDown);
  }, [activeCallout, closeSelection]);

  if (items.length === 0) {
    return null;
  }

  const activeItem = activeCallout ? items[activeCallout.index] : null;
  const ActiveIcon = activeItem ? marketIcons[activeItem.icon] : null;

  const handleSelect = (index: number) => {
    if (selectedIndex === index) {
      closeSelection();
      return;
    }

    autoTweenRef.current?.kill();
    autoTweenRef.current = null;
    positionTweenRef.current?.kill();
    setActiveCallout(null);
    setIsPositioning(true);
    setSelectedIndex(index);

    const anglePerItem = 360 / items.length;
    const desiredRotation = -(anglePerItem * index);
    const currentRotation = rotationRef.current.value;
    const shortestDelta =
      ((desiredRotation - currentRotation + 540) % 360) - 180;
    const targetRotation = currentRotation + shortestDelta;

    const openCallout = () => {
      updateRotation();
      setIsPositioning(false);
      const nextCallout = measureNode(index);
      if (nextCallout) {
        setActiveCallout(nextCallout);
      }
    };

    if (reducedMotion) {
      rotationRef.current.value = targetRotation;
      openCallout();
      return;
    }

    positionTweenRef.current = gsap.to(rotationRef.current, {
      duration: 0.72,
      ease: "power2.inOut",
      onComplete: openCallout,
      onUpdate: updateRotation,
      value: targetRotation,
    });
  };

  const handleNodeMouseEnter = () => {
    if (selectedIndex === null && !isPositioning) {
      autoTweenRef.current?.pause();
    }
  };

  const handleNodeMouseLeave = () => {
    if (selectedIndex === null && !isPositioning) {
      autoTweenRef.current?.resume();
    }
  };

  return (
    <div className={styles.orbit} aria-label={label} role="group">
      <div
        className={styles.stage}
        data-active={selectedIndex !== null}
        data-positioning={isPositioning}
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
          const isActive = index === selectedIndex;
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
                aria-expanded={isActive && activeCallout !== null}
                aria-label={`Show details for ${item.title}`}
                className={styles.node}
                data-active={isActive}
                data-orbit-node
                onBlur={() => {
                  if (selectedIndex === null) {
                    autoTweenRef.current?.resume();
                  }
                }}
                onClick={() => handleSelect(index)}
                onFocus={() => {
                  if (selectedIndex === null) {
                    autoTweenRef.current?.pause();
                  }
                }}
                onMouseEnter={handleNodeMouseEnter}
                onMouseLeave={handleNodeMouseLeave}
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
            id="market-orbit-callout"
            ref={calloutRef}
            style={{ left: activeCallout.x, top: activeCallout.y }}
          >
            <div className={styles.calloutBody} aria-live="polite">
              <span className={styles.calloutIcon} aria-hidden="true">
                <ActiveIcon size={23} strokeWidth={1.7} />
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
