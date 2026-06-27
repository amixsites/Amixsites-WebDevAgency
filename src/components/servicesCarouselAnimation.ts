import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Safely register ScrollTrigger inside the browser context
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Orchestrates the entry animation for the editorial services section.
 * Rises center card, tilts side cards, reveals heading.
 */
export function animateServicesEntrance(
  sectionSelector: string,
  headingSelector: string,
  carouselSelector: string
) {
  const ctx = gsap.context(() => {
    // 1. Heading fades upward
    gsap.fromTo(
      headingSelector,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionSelector,
          start: "top 75%",
          toggleActions: "play none none none"
        }
      }
    );

    // 2. Center card rises and side cards slide from depth
    gsap.fromTo(
      carouselSelector,
      { opacity: 0, scale: 0.9, y: 60 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionSelector,
          start: "top 70%",
          toggleActions: "play none none none"
        }
      }
    );
  }, sectionSelector);

  return () => ctx.revert();
}

/**
 * Shakes or rotates the 3D space subtly on scroll for an immersive feel.
 */
export function setupScrollParallax3D(
  sectionSelector: string,
  carouselSelector: string,
  bgSelector: string
) {
  const ctx = gsap.context(() => {
    // Slowly rotate carousel stage in 3D space during scroll
    gsap.to(carouselSelector, {
      rotateX: 4,
      yPercent: -3,
      ease: "none",
      scrollTrigger: {
        trigger: sectionSelector,
        start: "top bottom",
        end: "bottom top",
        scrub: 1
      }
    });

    // Ambient background shifting glow
    gsap.to(bgSelector, {
      backgroundPosition: "40% 60%",
      scale: 1.1,
      ease: "none",
      scrollTrigger: {
        trigger: sectionSelector,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5
      }
    });
  }, sectionSelector);

  return () => ctx.revert();
}
