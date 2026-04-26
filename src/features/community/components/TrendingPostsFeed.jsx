import React from 'react';
import { FiTrendingUp, FiZap } from 'react-icons/fi';
import { useCommunity } from '@/services/mutators/useCommunity';
import PostCard from '@/features/profile/components/PostCard';

const TrendingPostsFeed = () => {
    const { useTrendingPosts } = useCommunity();
    const { data: posts, isLoading } = useTrendingPosts({ period: '24h', limit: 5 });

    return (
        <section className="space-y-12">
            <div className="flex items-center justify-between px-10">
                <div className="space-y-2">
                    <p className="text-xs font-black uppercase tracking-widest text-[var(--theme-primary)] italic opacity-60">ENGAGEMENT_PEAK</p>
                    <h3 className="text-4xl font-black uppercase tracking-tighter italic text-[var(--theme-text)] flex items-center gap-8">
                        <FiTrendingUp className="text-[var(--theme-primary)]" /> TRENDING_DISPATCH
                    </h3>
                </div>
                <div className="flex items-center gap-4">
                     <span className="text-xs font-black uppercase tracking-wider text-[var(--theme-text-muted)] italic opacity-30">ALGO_V4_SYNC</span>
                     <div className="w-2 h-2 bg-[var(--theme-primary)] rounded-full animate-ping" />
                </div>
            </div>

            <div className="space-y-8">
                {isLoading ? (
                    <div className="py-20 flex justify-center">
                        <div className="w-8 h-8 border-4 border-[var(--theme-primary)] border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8">
                        {posts?.map((post, idx) => (
                            <PostCard key={post.id || idx} post={post} />
                        ))}
                    </div>
                )}
            </div>
            
            {!isLoading && (!posts || posts.length === 0) && (
                <div className="py-20 text-center bg-[var(--theme-card)]/40 rounded-3xl border-4 border-dashed border-[var(--theme-border)]">
                    <FiZap size={48} className="mx-auto text-[var(--theme-text-muted)] opacity-20 mb-6" />
                    <p className="text-xl font-black uppercase tracking-tighter text-[var(--theme-text-muted)]">No Trending Activity</p>
                </div>
            )}
        </section>
    );
};

export default TrendingPostsFeed;








