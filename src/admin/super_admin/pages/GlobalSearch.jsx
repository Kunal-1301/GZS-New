import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { mockApiService } from "@services/mockApiService";

export default function GlobalSearch() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q")?.toLowerCase() || "";
    const [results, setResults] = useState({ games: [], tournaments: [], users: [], posts: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const performSearch = async () => {
            setLoading(true);
            const [games, tourneys, users, comm] = await Promise.all([
                mockApiService.getAllGames(),
                mockApiService.getAllTournaments(),
                mockApiService.getAllUsers(),
                mockApiService.getAllCommunityPosts()
            ]);

            setResults({
                games: games.filter(g => g.title.toLowerCase().includes(query) || g.genre.toLowerCase().includes(query)),
                tournaments: tourneys.filter(t => t.name.toLowerCase().includes(query) || t.game.toLowerCase().includes(query)),
                users: users.filter(u => u.name.toLowerCase().includes(query) || u.role.toLowerCase().includes(query)),
                posts: comm.filter(p => p.title.toLowerCase().includes(query) || p.author.toLowerCase().includes(query))
            });
            setLoading(false);
        };

        if (query) performSearch();
        else setLoading(false);
    }, [query]);

    const total = results.games.length + results.tournaments.length + results.users.length + results.posts.length;

    if (loading) return <div className="p-20 text-center animate-pulse text-[var(--theme-text-muted)] font-black uppercase tracking-widest">SEARCHING GZONESPHERE...</div>;

    return (
        <div className="pb-10">
            <div className="mb-8">
                <h1 className="admin-page-title mb-1 flex items-center gap-3">
                    <FiSearch className="text-[var(--theme-primary)]" /> SEARCH RESULTS
                </h1>
                <p className="text-[10px] text-[var(--theme-text-muted)] font-black uppercase tracking-widest opacity-60">
                    Found {total} matches for "{query}"
                </p>
            </div>

            {total === 0 ? (
                <div className="admin-card py-20 text-center">
                    <FiSearch size={40} className="mx-auto mb-4 text-gray-200" />
                    <p className="text-sm font-bold opacity-40">No matches found for your search query.</p>
                </div>
            ) : (
                <div className="space-y-8">
                    {/* Games */}
                    {results.games.length > 0 && (
                        <div className="space-y-4">
                            <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-2 opacity-50"><FiZap /> Games</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {results.games.map(g => (
                                    <Link key={g.id} to="/content-admin/game-posts" className="admin-card !p-4 flex items-center justify-between hover:border-[var(--theme-primary)] transition-all no-underline group">
                                        <div>
                                            <div className="text-xs font-bold text-[var(--theme-text)]">{g.title}</div>
                                            <div className="text-[10px] text-[var(--theme-text-muted)]">{g.genre} • {g.status}</div>
                                        </div>
                                        <FiArrowRight className="text-gray-300 group-hover:text-[var(--theme-primary)] transition-colors" />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Tourneys */}
                    {results.tournaments.length > 0 && (
                        <div className="space-y-4">
                            <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-2 opacity-50"><FiZap /> Tournaments</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {results.tournaments.map(t => (
                                    <Link key={t.id} to="/content-admin/esports" className="admin-card !p-4 flex items-center justify-between hover:border-[var(--theme-primary)] transition-all no-underline group">
                                        <div>
                                            <div className="text-xs font-bold text-[var(--theme-text)]">{t.name}</div>
                                            <div className="text-[10px] text-[var(--theme-text-muted)]">{t.game} • {t.status}</div>
                                        </div>
                                        <FiArrowRight className="text-gray-300 group-hover:text-[var(--theme-primary)] transition-colors" />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Users */}
                    {results.users.length > 0 && (
                        <div className="space-y-4">
                            <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-2 opacity-50"><FiUser /> Profiles</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {results.users.map(u => (
                                    <Link key={u.id} to="/content-admin/profiles" className="admin-card !p-4 flex items-center justify-between hover:border-[var(--theme-primary)] transition-all no-underline group">
                                        <div>
                                            <div className="text-xs font-bold text-[var(--theme-text)]">{u.name}</div>
                                            <div className="text-[10px] text-[var(--theme-text-muted)]">@{u.handle} • {u.role}</div>
                                        </div>
                                        <FiArrowRight className="text-gray-300 group-hover:text-[var(--theme-primary)] transition-colors" />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Community */}
                    {results.posts.length > 0 && (
                        <div className="space-y-4">
                            <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-2 opacity-50"><FiFileText /> Community Posts</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {results.posts.map(p => (
                                    <Link key={p.id} to="/content-admin/community" className="admin-card !p-4 flex items-center justify-between hover:border-[var(--theme-primary)] transition-all no-underline group">
                                        <div>
                                            <div className="text-xs font-bold text-[var(--theme-text)]">{p.title}</div>
                                            <div className="text-[10px] text-[var(--theme-text-muted)]">by {p.author} • {p.status}</div>
                                        </div>
                                        <FiArrowRight className="text-gray-300 group-hover:text-[var(--theme-primary)] transition-colors" />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
