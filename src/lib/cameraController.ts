import gsap from "gsap";

export const cameraController = {
  dollyIn: (element: HTMLElement | string, amount: number, duration: number = 1) => {
    return gsap.to(element, { z: amount, duration, ease: "power2.out" });
  },
  
  dollyOut: (element: HTMLElement | string, amount: number, duration: number = 1) => {
    return gsap.to(element, { z: -amount, duration, ease: "power2.out" });
  },

  orbit: (element: HTMLElement | string, angleX: number, angleY: number, duration: number = 1) => {
    return gsap.to(element, { rotationX: angleX, rotationY: angleY, duration, ease: "power2.out" });
  },

  focus: (element: HTMLElement | string, blurAmount: number, duration: number = 1) => {
    return gsap.to(element, { filter: `blur(${blurAmount}px)`, duration, ease: "power2.out" });
  }
};
