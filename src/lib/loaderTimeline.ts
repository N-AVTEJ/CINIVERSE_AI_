import gsap from "gsap";

export const createLoaderTimeline = (
  onComplete: () => void,
  prefersReducedMotion: boolean
) => {
  const tl = gsap.timeline({
    onComplete,
    defaults: { ease: "power2.inOut" },
  });

  if (prefersReducedMotion) {
    tl.to(".loader-container", {
      opacity: 0,
      duration: 1,
      delay: 1,
      ease: "power2.inOut",
    });
    return tl;
  }

  // Scene 1: Initial dark with grain and dust, text reveals
  tl.addLabel("start", 0.5) // Slight delay before anything happens
    .to(".loader-glow", { opacity: 0.2, duration: 2, ease: "power1.inOut" }, "start")
    .fromTo(
      ".loader-letter",
      { opacity: 0, filter: "blur(10px)" },
      { opacity: 1, filter: "blur(0px)", duration: 1.5, stagger: 0.05, ease: "power2.out" },
      "start+=0.5"
    )
    .fromTo(
      ".loader-tagline",
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" },
      "start+=1.5"
    );

  // Scene 2: Projector Beam Bloom
  tl.addLabel("beam", "start+=1")
    .to(".projector-beam", { opacity: 0.8, scaleX: 1, duration: 2, ease: "power2.inOut" }, "beam");

  // Scene 3: Letterbox
  tl.addLabel("letterbox", "start+=0.5")
    .to(".letterbox-top", { scaleY: 1, duration: 1.5, ease: "power3.inOut" }, "letterbox")
    .to(".letterbox-bottom", { scaleY: 1, duration: 1.5, ease: "power3.inOut" }, "letterbox");
    
  // Scene 4: Highlight pass on text
  tl.addLabel("highlight", "beam+=0.5")
    .to(".loader-highlight", { x: "200%", duration: 2, ease: "power1.inOut" }, "highlight");

  // Scene 6: Brighten
  tl.addLabel("brighten", "highlight")
    .to(".loader-glow", { opacity: 0.5, scale: 1.2, duration: 1.5 }, "brighten");

  // Scene 7: Wash and transition out
  tl.addLabel("transition", "+=0.5")
    .to(".loader-beam-wash", { opacity: 1, duration: 0.6, ease: "power4.in" }, "transition")
    .to(".loader-container", { opacity: 0, duration: 0.8, ease: "power2.inOut" }, "transition+=0.4")
    .to(".letterbox-top", { scaleY: 0, duration: 1, ease: "power3.inOut" }, "transition+=0.6")
    .to(".letterbox-bottom", { scaleY: 0, duration: 1, ease: "power3.inOut" }, "transition+=0.6");

  return tl;
};
