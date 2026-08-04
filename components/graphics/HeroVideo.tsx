"use client";

import { useEffect, useRef } from "react";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!video || reducedMotion.matches) return;

    void video.play().catch(() => {
      // The poster remains visible when browser autoplay policies prevent playback.
    });

    return () => video.pause();
  }, []);

  return (
    <video
      ref={videoRef}
      className="hero-video"
      aria-hidden="true"
      muted
      loop
      playsInline
      preload="metadata"
      poster="/media/venn-hero-men-poster.jpg"
      tabIndex={-1}
    >
      <source src="/media/venn-hero-men.mp4" type="video/mp4" />
    </video>
  );
}
