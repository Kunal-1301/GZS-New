import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from '@components/Navbar';
import Footer from '@components/Footer';
import PageLoader from '@components/PageLoader';
import { GameThemeProvider } from '@context/GameThemeContext';
import { GAMES } from '@data/gameData';
import { Helmet } from 'react-helmet-async';

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

  if (loading) return <PageLoader />;
  if (!data) return <div className="min-h-screen bg-[var(--theme-bg)] flex items-center justify-center p-20 font-body text-[var(--theme-text)]">Game not found</div>;

  // For API data, construct a default theme if not present
  const theme = data.theme || {
    primary: "#e53935",
    primaryDark: "#c62828",
    primaryLight: "#ef5350",
    bgPage: "#fff5f5",
    bgSection: "#ffebee",
    border: "#ffcdd2",
    textHeading: "#c62828"
  };

  return (
    <GameThemeProvider theme={theme}>
      <Helmet>
        <title>{`${data.hero?.title || 'Game'} | GzoneSphere Gaming Catalogue`}</title>
        <meta name="description" content={data.storyline?.summary || `Experience ${data.hero?.title} on GzoneSphere. Explore gameplay, system requirements, and community reviews.`} />
        <meta property="og:title" content={`${data.hero?.title} on GzoneSphere`} />
        <meta property="og:description" content={data.storyline?.summary || "Game details, system requirements, and more."} />
        <meta property="og:image" content={data.hero?.bgImage || ""} />
        <link rel="canonical" href={`https://gzonesphere.com/games/${slug}`} />
      </Helmet>
      <div className="gp-page-bg text-[var(--gp-text-body)]">
        {/* Background Decorative Elements */}
        <div className="gp-light-pattern fixed inset-0 pointer-events-none" />
        <div className="gp-bg-blob gp-bg-blob-1" />
        <div className="gp-bg-blob gp-bg-blob-2" />
        <div className="gp-bg-blob gp-bg-blob-3" />

        <Navbar />
        <div style={{ height: "3px", backgroundColor: "var(--gp-primary)", position: "relative", zIndex: 100 }} />

        <div className="relative z-10">
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
        </div>

        <Footer />
      </div>
    </GameThemeProvider>
  );
}
