import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

export default function GamePostPage({ previewData }) {
  const { slug } = useParams();
  const [data, setData] = useState(previewData || null);
  const [loading, setLoading] = useState(!previewData);

  useEffect(() => {
    if (previewData) {
      setData(previewData);
      setLoading(false);
      return;
    }

    // If slug is a number, fetch from API. Otherwise try to use mock data
    const id = parseInt(slug || "1", 10);
    if (!isNaN(id)) {
      fetch(`/api/gameposts/${id}`)
        .then(res => res.json())
        .then(apiData => {
          if (apiData && apiData.hero) {
            setData(apiData);
          } else {
            setData(GAMES[slug] ?? GAMES.valorant);
          }
          setLoading(false);
        })
        .catch(() => {
          setData(GAMES[slug] ?? GAMES.valorant);
          setLoading(false);
        });
    } else {
      setData(GAMES[slug] ?? GAMES.valorant);
      setLoading(false);
    }
  }, [slug, previewData]);

  if (loading) return <div className="text-white text-center p-20">Loading...</div>;
  if (!data) return <div className="text-white text-center p-20">Game not found</div>;

  // For API data, construct a default theme if not present
  const theme = data.theme || {
    primary: "#e53935",
    accent: "#ff4b4b",
    secondary: "#1f2326",
    bgPage: "#0f1923"
  };

  return (
    <GameThemeProvider theme={theme}>
      <div style={{ backgroundColor: "var(--gp-bg-page)", minHeight: "100vh" }}>
        <Navbar logoVariant="theme" loginVariant="theme" accent="theme" />
        <div style={{ height: "3px", backgroundColor: "var(--gp-primary)" }} />

        <HeroSection hero={data.hero} />
        <StorylineSection storyline={data.storyline} info={data.game_info} />
        <MediaGallerySection carousel={data.carousel} />
        <GameplaySection gameplay={data.gameplay} />
        <QuickControlSection controls={data.quick_control_overview?.qco_title ? JSON.parse(data.quick_control_overview.qco_title) : [data.quick_control_overview]} />
        <ModesSection modes={data.modes} />
        <SystemRequirementSection sys={data.system_requirement} />

        {/* Pass down data to these sections even if they initially might not use it */}
        <ReviewsSection expert={data.expert_reviews} user={data.user_reviews} />
        <GetGameSection getGame={data.get_game} />
        <StoreExtrasSection dlcs={data.dlcs} awards={data.awards_and_achievements} />
        <MoreLikeThisSection />
        <CommunitySection />
        <CriticRatingSection />
        <JoinCommunitySection community={data.join_our_community} />

        <Footer accent="theme" />
      </div>
    </GameThemeProvider>
  );
}
