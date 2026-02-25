import { useState } from 'react';
import { FiSearch, FiPlus } from 'react-icons/fi';
import { HiOutlineBell, HiOutlineUser } from 'react-icons/hi';

const ContentAdminNavbar = () => {
    const [query, setQuery] = useState('');

    return (
        <header className="admin-navbar">

            {/* Left: Logo + Panel Title */}
            <div className="flex items-center gap-4 flex-shrink-0">
                <span className="admin-navbar-logo text-admin-accent font-black tracking-widest text-sm">
                    GZONSPHERE
                </span>
                <div className="hidden sm:block w-px h-5 bg-admin-border" />
                <span className="hidden sm:block admin-navbar-title text-admin-text-secondary font-semibold text-xs uppercase tracking-wider">
                    ESPORTS PANEL
                </span>
            </div>

            {/* Center: Search */}
            <div className="admin-navbar-search flex-1 max-w-md mx-4">
                <FiSearch className="admin-navbar-search-icon" size={14} />
                <input
                    type="text"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="Search for Tournaments, Games, Registrations..."
                    className="w-full bg-transparent text-sm text-admin-text placeholder-admin-text-disabled outline-none"
                />
            </div>

            {/* Right: Create button + icons */}
            <div className="admin-navbar-actions">
                <button className="admin-create-btn hidden sm:flex">
                    <FiPlus size={13} /> CREATE
                </button>
                <button className="admin-icon-btn" aria-label="Notifications">
                    <HiOutlineBell size={17} />
                </button>
                <button
                    className="admin-icon-btn w-8 h-8 rounded-full bg-admin-accent text-white flex items-center justify-center"
                    aria-label="User menu"
                >
                    <HiOutlineUser size={15} />
                </button>
            </div>
        </header>
    );
};

export default ContentAdminNavbar;
