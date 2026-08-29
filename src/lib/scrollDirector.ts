import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { cinematicEngine } from "./cinematicEngine";

class ScrollDirector {
  private scenes: Map<string, gsap.core.Timeline> = new Map();
  private sceneProgresses: Map<string, number> = new Map();

  registerScene(id: string, triggerElement: HTMLElement, tl: gsap.core.Timeline) {
    if (cinematicEngine.isReducedMotion) return;

    this.scenes.set(id, tl);

    // Track progress of this specific scene to allow React components to respond
    ScrollTrigger.create({
      trigger: triggerElement,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        const prev = this.sceneProgresses.get(id) ?? -1;
        if (Math.abs(prev - self.progress) > 0.001) {
          this.sceneProgresses.set(id, self.progress);
          window.dispatchEvent(new CustomEvent(`scene-progress-${id}`, { detail: self.progress }));
        }
      }
    });
  }

  getSceneProgress(id: string) {
    return this.sceneProgresses.get(id) || 0;
  }

  transitionTo(sceneId: string, effect: string = "fade") {
    // API for cinematic jumps
    console.log(`Transitioning to ${sceneId} with ${effect}`);
  }
}

export const scrollDirector = new ScrollDirector();
