import React from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { FiGlobe, FiMessageSquare, FiCode, FiCrosshair, FiVideo, FiBriefcase, FiPenTool, FiEdit3, FiMusic, FiUsers, FiCamera, FiStar, FiSearch, FiInfo, FiPlusCircle, FiDollarSign, FiShield } from 'react-icons/fi';

import { CommunityPermissionsProvider } from '@context/CommunityPermissionsContext';
import Navbar from '@components/Navbar';
import Footer from '@components/Footer';

const CommunityLayout = () => {
    const location = useLocation();

    const NAV_ITEMS = [
        { id: 'global-news', label: 'Global News Hub', path: '/community', icon: FiGlobe },
        { id: 'social-lobby', label: 'Global Social Lobby', path: '/community/lobby', icon: FiMessageSquare },
        { id: 'network', label: 'Player Network & DMs', path: '/community/network', icon: FiUsers },
        { id: 'dev', label: 'Game Dev', path: '/community/dev', icon: FiCode },
        { id: 'esports', label: 'Esports', path: '/community/esports', icon: FiCrosshair },
        { id: 'creators', label: 'Creators & Reels', path: '/community/creators', icon: FiVideo },
        { id: 'strategy', label: 'Business & Strategy', path: '/community/strategy', icon: FiBriefcase },
        { id: 'art', label: 'Art & Design', path: '/community/art', icon: FiPenTool },
        { id: 'writing', label: 'Writing & Narrative', path: '/community/writing', icon: FiEdit3 },
        { id: 'audio', label: 'Audio & Music', path: '/community/audio', icon: FiMusic },
        { id: 'studio', label: 'Creator Studio', path: '/community/creator-studio', icon: FiCamera },
        { id: 'company', label: 'Company Hub', path: '/community/company-dashboard', icon: FiBriefcase },
        { id: 'talent', label: 'Talent Pool', path: '/community/talent-discovery', icon: FiSearch },
        { id: 'commissions', label: 'Commissions', path: '/community/commissions', icon: FiDollarSign },
        { id: 'playtests', label: 'Playtests', path: '/community/playtests', icon: FiVideo },
        { id: 'arbitration', label: 'Arbitration', path: '/community/arbitration', icon: FiShield },
        { id: 'briefs', label: 'Briefs', path: '/community/brief-builder', icon: FiPlusCircle },
        { id: 'guide', label: 'Activity Guide', path: '/community/activity-guide', icon: FiInfo },
        { id: 'pro', label: 'GET PRO', path: '/community/pro', icon: FiStar },
    ];

    return (
        <CommunityPermissionsProvider>
            <div className="theme-community flex flex-col min-h-screen bg-[var(--theme-bg)] text-[var(--theme-text)] font-body">
                {/* ── Main Site Navbar ── */}
                <Navbar />

                {/* ── Sub Navigation (Horizontal) ── */}
                <div className="bg-[var(--theme-card)] border-b border-[var(--theme-border)] sticky top-[72px] z-40 shadow-sm px-4 md:px-8 overflow-x-auto hide-scrollbar">
                    <div className="flex items-center gap-1 md:gap-2 py-3 min-w-max mx-auto max-w-7xl">
                        {NAV_ITEMS.map((item) => {
                            const isActive = location.pathname === item.path || (location.pathname === '/community' && item.path === '/community');
                            const Icon = item.icon;
                            return (
                                <NavLink
                                    key={item.id}
                                    to={item.path}
                                    className={({ isActive }) => `
                                        group flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 text-[11px] font-black tracking-widest uppercase
                                        ${isActive
                                            ? 'bg-[var(--theme-primary)] text-[var(--theme-text-inverse)] shadow-md'
                                            : item.id === 'pro'
                                                ? 'text-[var(--theme-primary)] bg-purple-100 hover:bg-[var(--theme-primary)] hover:text-[var(--theme-text-inverse)]'
                                                : 'text-[var(--theme-text-muted)] hover:bg-[var(--theme-bg-alt)] hover:text-[var(--theme-primary)]'
                                        }
                                    `}
                                    title={item.label}
                                >
                                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[var(--theme-text-inverse)]' : item.id === 'pro' ? 'text-[var(--theme-primary)] group-hover:text-[var(--theme-text-inverse)]' : 'text-neutral-400 group-hover:text-[var(--theme-primary)]'}`} />
                                    <span>{item.label}</span>
                                </NavLink>
                            )
                        })}
                    </div>
                </div>

                {/* ── Main Content Area ── */}
                <main className="flex-1 flex flex-col relative w-full">
                    {/* Inner wrapper simulating the original app-like height constraint if pages need it, 
                        or we can just let it flex naturally. For pages that overflow internally, we give this a min height */}
                    <div className="flex-1 flex flex-col min-h-[calc(100vh-140px)] w-full">
                        <Outlet />
                    </div>
                </main>

                <Footer />
            </div>
        </CommunityPermissionsProvider>
    );
};

export default CommunityLayout;
