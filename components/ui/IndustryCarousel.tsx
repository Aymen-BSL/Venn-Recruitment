"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

import styles from "./IndustryCarousel.module.css";

const industries = [
  {
    name: "Corporate & Professional Services",
    description:
      "Connecting businesses with professionals across essential corporate and specialist functions.",
    image: "/media/venn-hero-men-poster.jpg",
    imageAlt: "Professionals working together in a modern office",
  },
  {
    name: "Technology & Digital",
    description:
      "Helping companies find talent for an increasingly connected and technology-driven world.",
    image: "/media/candidates/international-opportunities.png",
    imageAlt: "Contemporary technology and business district architecture",
  },
  {
    name: "Engineering & Technical",
    description:
      "Matching skilled professionals with roles that require technical expertise and practical experience.",
    image: "/media/candidates/guided-support.png",
    imageAlt: "Structural engineering details in a modern development",
  },
  {
    name: "Construction & Real Estate",
    description:
      "Supporting the people and businesses contributing to the region's continued development.",
    image: "/media/candidates/opportunity-fit.png",
    imageAlt: "Modern workplace interior shaped by regional architecture",
  },
  {
    name: "Hospitality & Tourism",
    description:
      "Connecting service-focused professionals with opportunities across growing hospitality markets.",
    image: "/media/candidates/guided-support.png",
    imageAlt: "Welcoming landscaped entrance to a contemporary destination",
  },
  {
    name: "Retail & Consumer",
    description:
      "Helping businesses find the talent needed to understand customers, strengthen operations and support growth.",
    image: "/media/venn-hero-men-poster.jpg",
    imageAlt: "Collaborative team reviewing work together",
  },
  {
    name: "Logistics & Supply Chain",
    description:
      "Matching professionals with organisations responsible for keeping goods, services and operations moving.",
    image: "/media/candidates/international-opportunities.png",
    imageAlt: "Connected transport and commercial infrastructure",
  },
  {
    name: "Healthcare",
    description:
      "Connecting healthcare organisations with professionals committed to quality care and meaningful impact.",
    image: "/media/candidates/opportunity-fit.png",
    imageAlt: "Calm professional environment designed around care and focus",
  },
] as const;

function getItemsPerPage() {
  if (window.matchMedia("(min-width: 1100px)").matches) {
    return 3;
  }

  if (window.matchMedia("(min-width: 700px)").matches) {
    return 2;
  }

  return 1;
}

export function IndustryCarousel() {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateItemsPerPage = () => {
      setItemsPerPage(getItemsPerPage());
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);

    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const pages = useMemo(() => {
    return Array.from(
      { length: Math.ceil(industries.length / itemsPerPage) },
      (_, pageIndex) => {
        const start = pageIndex * itemsPerPage;
        return industries.slice(start, start + itemsPerPage);
      },
    );
  }, [itemsPerPage]);

  const activePage = Math.min(currentPage, pages.length - 1);

  const showPage = (pageIndex: number) => {
    const nextPage = Math.max(0, Math.min(pages.length - 1, pageIndex));

    setCurrentPage(nextPage);

    if (itemsPerPage < 3 && viewportRef.current) {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      viewportRef.current.scrollTo({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        left: nextPage * viewportRef.current.clientWidth,
      });
    }
  };

  const showPreviousPage = () => {
    showPage(activePage - 1);
  };

  const showNextPage = () => {
    showPage(activePage + 1);
  };

  const syncPageWithScroll = () => {
    const viewport = viewportRef.current;

    if (itemsPerPage === 3 || !viewport?.clientWidth) {
      return;
    }

    const visiblePage = Math.round(viewport.scrollLeft / viewport.clientWidth);
    setCurrentPage(Math.max(0, Math.min(pages.length - 1, visiblePage)));
  };

  return (
    <div
      aria-label="Industries served"
      aria-roledescription="carousel"
      className={styles.carousel}
      role="region"
    >
      <div className={styles.viewport} onScroll={syncPageWithScroll} ref={viewportRef}>
        <div
          className={styles.track}
          style={{ transform: `translateX(-${activePage * 100}%)` }}
        >
          {pages.map((page, pageIndex) => (
            <div
              aria-hidden={pageIndex !== activePage}
              className={styles.page}
              key={page.map((industry) => industry.name).join("-")}
            >
              {page.map((industry) => (
                <article className={styles.card} key={industry.name}>
                  <div className={styles.imageFrame}>
                    <Image
                      alt={industry.imageAlt}
                      className={styles.image}
                      fill
                      sizes="(min-width: 1100px) 30vw, (min-width: 700px) 46vw, 88vw"
                      src={industry.image}
                    />
                  </div>
                  <div className={styles.cardContent}>
                    <h3>{industry.name}</h3>
                    <p>{industry.description}</p>
                  </div>
                </article>
              ))}
            </div>
          ))}
        </div>
      </div>

      <button
        aria-label="Show previous industries"
        className={`${styles.control} ${styles.previous}`}
        disabled={activePage === 0}
        onClick={showPreviousPage}
        type="button"
      >
        <ArrowLeft aria-hidden="true" size={21} strokeWidth={1.8} />
      </button>

      <button
        aria-label="Show next industries"
        className={`${styles.control} ${styles.next}`}
        disabled={activePage === pages.length - 1}
        onClick={showNextPage}
        type="button"
      >
        <ArrowRight aria-hidden="true" size={21} strokeWidth={1.8} />
      </button>

      <div aria-label="Choose industry page" className={styles.pagination} role="group">
        {pages.map((page, pageIndex) => (
          <button
            aria-label={`Show industry page ${pageIndex + 1}`}
            aria-pressed={pageIndex === activePage}
            className={styles.dot}
            key={page.map((industry) => industry.name).join("-")}
            onClick={() => showPage(pageIndex)}
            type="button"
          />
        ))}
      </div>

      <p aria-live="polite" className={styles.status}>
        Industry page {activePage + 1} of {pages.length}
      </p>
    </div>
  );
}
