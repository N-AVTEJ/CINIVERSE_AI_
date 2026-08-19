import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const createHeroEntranceTimeline = (container: HTMLElement, isReducedMotion: boolean) => {
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  if (isReducedMotion) {
    tl.to(container, { opacity: 1, duration: 1 });
    return tl;
  }

  tl.fromTo(
    ".hero-title-line",
    { y: 150, opacity: 0, rotateX: -20, filter: "blur(10px)" },
    { y: 0, opacity: 1, rotateX: 0, filter: "blur(0px)", duration: 1.8, stagger: 0.15 },
    0.2
  )
  .fromTo(
    ".hero-subtitle",
    { opacity: 0, x: 20, filter: "blur(5px)" },
    { opacity: 1, x: 0, filter: "blur(0px)", duration: 1.5 },
    1.2
  )
  .fromTo(
    ".hero-centerpiece",
    { opacity: 0, scale: 0.8, filter: "blur(20px)" },
    { opacity: 1, scale: 1, filter: "blur(0px)", duration: 2.5, ease: "power2.out" },
    1
  )
  .fromTo(
    ".hero-light-ray",
    { opacity: 0 },
    { opacity: 0.6, duration: 3, ease: "power1.inOut" },
    1.5
  );

  return tl;
};

export const createHeroScrollTimeline = (container: HTMLElement) => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: "top top",
      end: "bottom top",
      scrub: 1.5,
    },
  });

  tl.to(".hero-parallax-container", {
    z: 500, // Move towards the camera
    ease: "none"
  }, 0)
  .to(".hero-title", {
    scale: 1.5,
    y: -100,
    opacity: 0,
    filter: "blur(20px)",
    ease: "power1.in"
  }, 0)
  .to(".hero-centerpiece", {
    z: -300,
    rotationZ: 45,
    rotationX: 30,
    scale: 0.5,
    opacity: 0,
    filter: "blur(10px)",
    ease: "power2.inOut"
  }, 0)
  .to(".hero-light-ray", {
    opacity: 0.1,
    scale: 2,
    ease: "none"
  }, 0)
  .to(".hero-subtitle", {
    opacity: 0,
    y: 50,
    ease: "power2.in"
  }, 0);

  return tl;
};
