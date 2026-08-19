import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { BackgroundLayer } from "../background/BackgroundLayer";
import { NoiseOverlay } from "../background/NoiseOverlay";
import { CustomCursor } from "../cursor/CustomCursor";
import { Loader } from "../loader/Loader";
import { useSmoothScroll } from "../../hooks/useSmoothScroll";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  useSmoothScroll();

  return (
    <>
      <Loader />
      <CustomCursor />
      <NoiseOverlay />
      <BackgroundLayer />
      <Navbar />
      <main className="relative z-10 min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  );
};
