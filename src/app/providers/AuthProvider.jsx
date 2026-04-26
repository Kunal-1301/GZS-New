import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { STORAGE_KEYS } from '@/shared/constants/storage';

// ── DUMMY MODE FLAG ──
// Set to false once FastAPI CORE backend is connected.
const DUMMY_MODE = true;

const DUMMY_PERSONAS = {
    'dev': {
        id: 'U-DEV-99',
        username: 'ArchitectNode',
        email: 'dev@gzonesphere.com',
        role: 'ADMIN',
        trust_level: 8.4,
        gts: 924,
        is_staff: true,
        persona: 'game-dev',
        avatar_url: null,
        rank: 'Grandmaster'
    },
    'player': {
        id: 'U-PRO-07',
        username: 'ViperStrike',
        email: 'pro@gzonesphere.com',
        role: 'user',
        trust_level: 6.2,
        gts: 742,
        is_staff: false,
        persona: 'esports',
        avatar_url: null,
        rank: 'Elite'
    },
    'admin': {
        id: 'U-ADM-01',
        username: 'ProtocolCore',
        email: 'admin@gzonesphere.com',
        role: 'ADMIN',
        trust_level: 9.9,
        gts: 1000,
        is_staff: true,
        persona: 'platform',
        avatar_url: null,
        rank: 'System Admin'
    }
};

const DUMMY_USER = DUMMY_PERSONAS['dev'];

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const logout = useCallback(() => {
        localStorage.removeItem(STORAGE_KEYS.TOKEN);
        localStorage.removeItem('gz_dummy_user');
        setUser(null);
    }, []);

    // ── DUMMY LOGIN (no backend required) ──
    const dummyLogin = useCallback((overrides = {}) => {
        // If overrides contains a persona key, use that persona
        const baseUser = overrides.persona && DUMMY_PERSONAS[overrides.persona] 
            ? DUMMY_PERSONAS[overrides.persona] 
            : DUMMY_USER;
            
        const dummyUser = { ...baseUser, ...overrides };
        localStorage.setItem('gz_dummy_user', JSON.stringify(dummyUser));
        localStorage.setItem(STORAGE_KEYS.TOKEN, 'dummy-jwt-token');
        setUser(dummyUser);
    }, []);

    // ── REAL LOGIN (for when backend is connected) ──
    const login = useCallback(async (token) => {
        if (DUMMY_MODE) {
            // In dummy mode, just set a dummy user
            dummyLogin();
            return;
        }
        localStorage.setItem(STORAGE_KEYS.TOKEN, token);
        try {
            const { jwtDecode } = await import('jwt-decode');
            const decoded = jwtDecode(token);
            setUser(decoded);
            // TODO: fetch full profile from profileService.getMyProfile()
        } catch (err) {
            console.error('Failed to initialize session:', err);
        }
    }, [dummyLogin]);

    useEffect(() => {
        const initAuth = () => {
            if (DUMMY_MODE) {
                const dummyData = localStorage.getItem('gz_dummy_user');
                let parsedUser = null;
                if (dummyData) {
                    try {
                        parsedUser = JSON.parse(dummyData);
                    } catch {
                        localStorage.removeItem('gz_dummy_user');
                    }
                }
                // If no user in storage, initialize with default admin user
                if (!parsedUser) {
                    parsedUser = DUMMY_USER;
                    localStorage.setItem('gz_dummy_user', JSON.stringify(parsedUser));
                    localStorage.setItem(STORAGE_KEYS.TOKEN, 'dummy-jwt-token');
                }
                // Refresh local storage with latest persona properties (e.g. role changes)
                const personaKey = parsedUser?.persona || 'dev';
                const freshUser = { ...parsedUser, ...DUMMY_PERSONAS[personaKey] };
                localStorage.setItem('gz_dummy_user', JSON.stringify(freshUser));
                setUser(freshUser);
                setLoading(false);
                return;
            }

            const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
            if (token && !DUMMY_MODE) {
                // Real token handling would go here
                // For now, clear stale real tokens
                localStorage.removeItem(STORAGE_KEYS.TOKEN);
            }
            setLoading(false);
        };

        initAuth();

        // Cross-tab synchronization
        const handleAuthChange = (e) => {
            if (e.key === STORAGE_KEYS.TOKEN && !e.newValue) {
                logout();
            }
        };

        window.addEventListener('storage', handleAuthChange);
        window.addEventListener('gz-logout', logout);

        return () => {
            window.removeEventListener('storage', handleAuthChange);
            window.removeEventListener('gz-logout', logout);
        };
    }, [logout]);

    const value = useMemo(() => ({
        user,
        loading,
        login,
        logout,
        dummyLogin,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN' || user?.is_staff,
    }), [user, loading, login, logout, dummyLogin]);

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};





