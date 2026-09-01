import { Layout } from "./components/layout/Layout";
import { HeroScene } from "./components/hero/HeroScene";
import { MovieUniverse } from "./components/movie-universe/MovieUniverse";
import { AIBrainScene } from "./components/ai-brain/AIBrainScene";
import { GenreGalaxy } from "./components/genre-galaxy/GenreGalaxy";
import { PredictionChamber } from "./components/prediction-chamber/PredictionChamber";
import { MovieDNA } from "./components/movie-dna/MovieDNA";
import { RecommendationConstellation } from "./components/recommendation-constellation/RecommendationConstellation";
import { TimelineOfCinema } from "./components/timeline/TimelineOfCinema";
import { DirectorHall } from "./components/directors/DirectorHall";
import { EmotionEngine } from "./components/emotion-engine/EmotionEngine";
import { CinematicMovieShowcase } from "./components/movie-showcase/CinematicMovieShowcase";
import { EmotionMap } from "./components/emotion-map/EmotionMap";
import { MemoryVault } from "./components/memory-vault/MemoryVault";
import { LoaderProvider } from "./context/LoaderContext";
import { CameraRig } from "./components/animations/CameraRig";
import { SceneController } from "./components/animations/SceneController";

export default function App() {
  return (
    <LoaderProvider>
      <Layout>
        <CameraRig>
          <SceneController id="hero">
            <HeroScene />
          </SceneController>
          
          <SceneController id="universe">
            <MovieUniverse />
          </SceneController>
          
          <SceneController id="ai-brain">
            <AIBrainScene />
          </SceneController>
          
          {/* PHASE 7 EXTENSION POINT: Genre Galaxy */}
          <SceneController id="genre-galaxy">
            <GenreGalaxy />
          </SceneController>
          
          <SceneController id="prediction-chamber">
            <PredictionChamber />
          </SceneController>
          
          <SceneController id="movie-dna">
            <MovieDNA />
          </SceneController>

          <SceneController id="recommendation-constellation">
            <RecommendationConstellation />
          </SceneController>
          
          <SceneController id="timeline-of-cinema">
            <TimelineOfCinema />
          </SceneController>

          <SceneController id="hall-of-directors">
            <DirectorHall />
          </SceneController>

          <SceneController id="emotion-engine">
            <EmotionEngine />
          </SceneController>

          <SceneController id="movie-showcase">
            <CinematicMovieShowcase />
          </SceneController>

          <SceneController id="emotion-map">
            <EmotionMap />
          </SceneController>

          <SceneController id="memory-vault">
            <MemoryVault />
          </SceneController>
          
          <SceneController id="future">
            <section className="py-16 flex items-center justify-center border-t border-cine-border/30">
              <h2 className="font-heading text-3xl text-cine-muted/50 italic tracking-widest">
                More experiences loading...
              </h2>
            </section>
          </SceneController>
        </CameraRig>
      </Layout>
    </LoaderProvider>
  );
}

