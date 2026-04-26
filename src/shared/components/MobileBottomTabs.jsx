import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FiHome, FiZap, FiUsers, FiMessageSquare, FiUser } from 'react-icons/fi';
import { useAuth } from '@/app/providers/AuthProvider';
import './MobileBottomTabs.css';

/**
 * MobileBottomTabs — Bottom Navigation Bar
 * Visible on mobile (<md breakpoint) only.
 * Shows: Home, Play (Games), Community, Messages, Profile
 */
function MobileBottomTabs() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  // Don't show on auth pages
  if (location.pathname.includes('/auth/') || location.pathname.includes('/login') || location.pathname.includes('/signup')) {
    return null;
  }

  const tabs = [
    { icon: FiHome, label: 'Home', path: isAuthenticated ? '/community' : '/', id: 'home' },
    { icon: FiZap, label: 'Play', path: '/games', id: 'play' },
    { icon: FiUsers, label: 'Community', path: '/community', id: 'community' },
    { icon: FiMessageSquare, label: 'Messages', path: '/messages', id: 'messages' },
    { icon: FiUser, label: 'Profile', path: '/profile', id: 'profile' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="gzs-mobile-bottom-tabs">
      <div className="gzs-mobile-bottom-tabs__inner">
        {tabs.map((tab) => (
          <NavLink
            key={tab.id}
            to={tab.path}
            className={`gzs-mobile-tab ${isActive(tab.path) ? 'active' : ''}`}
            title={tab.label}
          >
            <tab.icon size={20} strokeWidth={2} />
            <span className="gzs-mobile-tab__label">{tab.label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default React.memo(MobileBottomTabs);
