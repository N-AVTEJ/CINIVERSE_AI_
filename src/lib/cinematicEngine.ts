import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

class CinematicEngine {
  public masterTimeline: gsap.core.Timeline;
  public isReducedMotion: boolean = false;
  private scrollTracker: ScrollTrigger | null = null;

  constructor() {
    this.isReducedMotion = typeof window !== 'undefined' 
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches 
      : false;
      
    // The master timeline links global cinematic camera moves across the whole scroll height
    this.masterTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
      }
    });

    if (typeof window !== 'undefined') {
      this.scrollTracker = ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
      });
    }
  }

  getVelocity() {
    return this.scrollTracker ? this.scrollTracker.getVelocity() : 0;
  }
}

export const cinematicEngine = new CinematicEngine();
