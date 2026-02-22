import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { GameThemeProvider } from "../../context/GameThemeContext";
import { GAMES } from "../../data/gameData";

import {
  HeroSection,
  StorylineSection,
  GameplaySection,
  QuickControlSection,
  SystemRequirementSection,
  ModesSection,
  ReviewsSection,
  CommunitySection,
  CriticRatingSection,
  JoinCommunitySection,
  MediaGallerySection,
  GetGameSection,
  StoreExtrasSection,
  MoreLikeThisSection,
} from "./sections";

/* ============================================================
   GamePostPage
   ─────────────
   In production: slug comes from useParams(), data is fetched
   from API, theme is read from the game record's theme_config.

   For now: dummy data from gameData.js. The GameThemeProvider
   writes all --gp-* CSS variables to document.documentElement
   so every section can use var(--gp-primary) etc.
   ============================================================ */

export default function GamePostPage({ slug = "valorant" }) {
  const data = GAMES[slug] ?? GAMES.valorant;

  return (
    <GameThemeProvider theme={data.theme}>
      {/* Page background driven by --gp-bg-page set by the provider */}
      <div style={{ backgroundColor: "var(--gp-bg-page)", minHeight: "100vh" }}>

        <Navbar logoVariant="theme" loginVariant="theme" accent="theme" />
        <div style={{ height: "3px", backgroundColor: "var(--gp-primary)" }} />

        <HeroSection hero={data.hero} />
        <StorylineSection storyline={data.storyline} info={data.game_info} />
        <MediaGallerySection />
        <GameplaySection gameplay={data.gameplay} />
        <QuickControlSection controls={data.quick_control_overview} />
        <ModesSection modes={data.modes} />
        <SystemRequirementSection sys={data.system_requirement} />
        <ReviewsSection expert={data.expert_reviews} user={data.user_reviews} />
        <GetGameSection />
        <StoreExtrasSection />
        <MoreLikeThisSection />
        <CommunitySection />
        <CriticRatingSection />
        <JoinCommunitySection />

        <Footer accent="theme" />
      </div>
    </GameThemeProvider>
  );
}
