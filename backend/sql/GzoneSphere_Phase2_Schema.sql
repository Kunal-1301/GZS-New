-- GzoneSphere Phase 2 Database Schema
-- Profiles, Skills, Community, Admin, Progression, Trust
-- Extension to Phase 1 schema. Run AFTER Phase1 tables exist.

-- ================== MASTER PROFILE & SUB-PROFILES ==================

-- Extended users table (rename 'profiles' table to master_profiles in migration)
ALTER TABLE IF EXISTS profiles RENAME TO master_profiles;

-- Create master_profiles if not exists (for fresh installs)
CREATE TABLE IF NOT EXISTS master_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    username VARCHAR(50) UNIQUE NOT NULL,
    real_name VARCHAR(100),
    avatar_url TEXT,
    banner_url TEXT,
    location VARCHAR(100),
    platform_level VARCHAR(20) DEFAULT 'Beginner', -- Beginner, Hustler, Extreme, Pro
    trust_score DECIMAL(3, 1) DEFAULT 5.0, -- 1.0-10.0
    verified_checkmark BOOLEAN DEFAULT FALSE,
    bio TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    username_changed_at TIMESTAMP WITH TIME ZONE,
    username_change_count INT DEFAULT 0
);

-- Sub-profiles (one per domain per user)
CREATE TABLE IF NOT EXISTS sub_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    domain VARCHAR(20) NOT NULL, -- dev, esports, content, business, art, writing, audio
    username VARCHAR(50) NOT NULL,
    primary_role VARCHAR(100),
    featured_roles TEXT[], -- JSON array of up to 3 secondary roles
    headline VARCHAR(80),
    experience_level VARCHAR(20), -- Beginner, Intermediate, Advanced, Expert
    bio TEXT,
    avatar_url TEXT,
    visibility VARCHAR(20) DEFAULT 'public', -- public, connections_only, private
    status VARCHAR(20) DEFAULT 'Active', -- Active, Idle, Dormant
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, domain)
);

-- ================== SKILLS & VERIFICATION ==================

-- Skills taxonomy (admin-managed reference)
CREATE TABLE IF NOT EXISTS skills_taxonomy (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) UNIQUE NOT NULL,
    domain VARCHAR(20) NOT NULL, -- dev, esports, content, business, art, writing, audio
    category VARCHAR(100), -- e.g., "Core programming", "Level design", etc.
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- User skills (self-declared or verified)
CREATE TABLE IF NOT EXISTS user_skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sub_profile_id UUID REFERENCES sub_profiles(id) ON DELETE CASCADE,
    skill_id UUID REFERENCES skills_taxonomy(id),
    is_verified BOOLEAN DEFAULT FALSE,
    verification_method VARCHAR(50), -- project_demo, github_code, cert, employer_letter, live_test, portfolio, peer_review
    verification_proof_url TEXT,
    verification_proof_text TEXT,
    verified_by_user_id UUID REFERENCES users(id),
    verified_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Skill verification queue
CREATE TABLE IF NOT EXISTS verification_queue (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_skill_id UUID REFERENCES user_skills(id) ON DELETE CASCADE,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    reviewed_by_user_id UUID REFERENCES users(id),
    status VARCHAR(20) DEFAULT 'pending', -- pending, approved, rejected, requesting_more_info
    reviewer_notes TEXT,
    reviewed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ================== PROFILE CONTENT SECTIONS ==================

-- Section 4: Tools & Stack
CREATE TABLE IF NOT EXISTS tools (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sub_profile_id UUID REFERENCES sub_profiles(id) ON DELETE CASCADE,
    tool_name VARCHAR(100),
    category VARCHAR(50), -- engine, language, platform, software, etc.
    proficiency_level VARCHAR(20), -- Beginner, Intermediate, Advanced, Expert
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Section 5: Projects / Portfolio
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sub_profile_id UUID REFERENCES sub_profiles(id) ON DELETE CASCADE,
    title VARCHAR(255),
    description TEXT,
    media_urls TEXT[], -- JSON array of image/video URLs
    skills_demonstrated TEXT[], -- JSON array of skill IDs
    team_size VARCHAR(50), -- Solo, 2-5, 6-15, 16-50, 50+
    year INT,
    demo_url TEXT,
    source_code_url TEXT,
    -- Domain-specific fields
    genre VARCHAR(50), -- For Dev: RPG, FPS, Strategy, etc.
    engine_used VARCHAR(100), -- For Dev
    platforms TEXT[], -- For Dev: PC, Console, Mobile, VR
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Section 7: Availability
CREATE TABLE IF NOT EXISTS availability (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sub_profile_id UUID UNIQUE REFERENCES sub_profiles(id) ON DELETE CASCADE,
    timezone VARCHAR(50),
    collaboration_type VARCHAR(50), -- full_time, contract, freelance, open_to_offers
    weekly_hours_available VARCHAR(50), -- part_time, full_time, flexible
    rate_range_start INT,
    rate_range_end INT,
    rate_currency VARCHAR(10),
    visible_to_others BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ================== COMMUNITY SYSTEM ==================

-- Community branches
CREATE TABLE IF NOT EXISTS community_branches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(50) UNIQUE NOT NULL, -- dev, esports, content, business, art, writing, audio, general, newcomers
    name VARCHAR(100),
    description TEXT,
    icon_url TEXT,
    color_accent VARCHAR(20),
    status VARCHAR(20) DEFAULT 'Active', -- Active, ReadOnly, Archived
    moderation_level VARCHAR(20) DEFAULT 'Standard', -- Standard, Strict, Lenient
    member_count INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Community branch membership
CREATE TABLE IF NOT EXISTS community_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID REFERENCES community_branches(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    sub_profile_id UUID REFERENCES sub_profiles(id),
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    opted_out BOOLEAN DEFAULT FALSE,
    role VARCHAR(20) DEFAULT 'member', -- member, moderator, admin
    UNIQUE(branch_id, user_id)
);

-- Channels within branches
CREATE TABLE IF NOT EXISTS channels (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID REFERENCES community_branches(id) ON DELETE CASCADE,
    name VARCHAR(100),
    description TEXT,
    channel_type VARCHAR(20) DEFAULT 'text', -- text, announcement, resource
    slowmode_seconds INT DEFAULT 0,
    min_level_to_post VARCHAR(20) DEFAULT 'Beginner',
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Messages (channel posts)
CREATE TABLE IF NOT EXISTS messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    channel_id UUID REFERENCES channels(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    sub_profile_id UUID REFERENCES sub_profiles(id),
    content TEXT,
    media_urls TEXT[], -- JSON array
    edited_at TIMESTAMP WITH TIME ZONE,
    deleted_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Message reactions
CREATE TABLE IF NOT EXISTS message_reactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    message_id UUID REFERENCES messages(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    emoji_name VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(message_id, user_id, emoji_name)
);

-- Groups
CREATE TABLE IF NOT EXISTS groups (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID REFERENCES community_branches(id) ON DELETE CASCADE,
    name VARCHAR(100),
    description TEXT,
    is_public BOOLEAN DEFAULT TRUE,
    max_members INT DEFAULT 100,
    member_count INT DEFAULT 0,
    cover_image_url TEXT,
    created_by_user_id UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Group members
CREATE TABLE IF NOT EXISTS group_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    group_id UUID REFERENCES groups(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(20) DEFAULT 'member', -- member, moderator, owner
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(group_id, user_id)
);

-- LFG Posts
CREATE TABLE IF NOT EXISTS lfg_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID REFERENCES community_branches(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    sub_profile_id UUID REFERENCES sub_profiles(id),
    goal_type VARCHAR(50), -- find_teammates, find_collaborators, find_work, etc.
    description TEXT,
    required_skills TEXT[], -- JSON array of skill IDs
    availability_window VARCHAR(50), -- this_weekend, this_week, ongoing, specific_date
    availability_date TIMESTAMP WITH TIME ZONE,
    timezone VARCHAR(50),
    platform_type VARCHAR(50), -- for esports: PC, Console, Mobile
    contact_preference VARCHAR(50), -- dm, comments, external
    contact_url TEXT,
    auto_expire BOOLEAN DEFAULT TRUE,
    expires_at TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Showcase posts
CREATE TABLE IF NOT EXISTS showcase_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID REFERENCES community_branches(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    sub_profile_id UUID REFERENCES sub_profiles(id),
    title VARCHAR(80),
    description VARCHAR(500),
    media_urls TEXT[], -- JSON array of image/video/audio URLs
    media_type VARCHAR(20), -- image, video, audio, text
    skill_tags TEXT[], -- JSON array of skill IDs
    likes_count INT DEFAULT 0,
    comments_count INT DEFAULT 0,
    shares_count INT DEFAULT 0,
    is_featured BOOLEAN DEFAULT FALSE,
    featured_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Showcase post likes
CREATE TABLE IF NOT EXISTS showcase_likes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id UUID REFERENCES showcase_posts(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(post_id, user_id)
);

-- Events
CREATE TABLE IF NOT EXISTS events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID REFERENCES community_branches(id) ON DELETE CASCADE,
    created_by_user_id UUID REFERENCES users(id),
    title VARCHAR(255),
    description TEXT,
    event_type VARCHAR(50), -- tournament, game_jam, writing_contest, art_challenge, ama, workshop, listening_party, community_call
    starts_at TIMESTAMP WITH TIME ZONE,
    ends_at TIMESTAMP WITH TIME ZONE,
    timezone VARCHAR(50),
    capacity INT,
    rsvp_count INT DEFAULT 0,
    host_sub_profile_id UUID REFERENCES sub_profiles(id),
    registration_url TEXT,
    is_approved BOOLEAN DEFAULT FALSE,
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Event RSVPs
CREATE TABLE IF NOT EXISTS event_rsvps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    rsvp_status VARCHAR(20) DEFAULT 'going', -- going, interested, not_going
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(event_id, user_id)
);

-- ================== ADMIN & MODERATION ==================

-- Moderation queue
CREATE TABLE IF NOT EXISTS moderation_queue (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    content_type VARCHAR(50), -- message, post, showcase, comment, group, event, profile
    content_id UUID,
    branch_id UUID REFERENCES community_branches(id),
    reported_by_user_id UUID REFERENCES users(id),
    report_reason VARCHAR(100), -- spam, harassment, hate_speech, nsfw, misinformation, off_topic, other
    report_description TEXT,
    ai_confidence_score DECIMAL(3, 1) DEFAULT 0, -- 0-100
    status VARCHAR(20) DEFAULT 'pending', -- pending, in_review, actioned, dismissed
    priority VARCHAR(20) DEFAULT 'low', -- low, medium, high
    assigned_to_moderator_id UUID REFERENCES users(id),
    action_taken VARCHAR(50), -- dismiss, remove, warn, mute_channel, mute_branch, suspend, escalate
    moderator_notes TEXT,
    actioned_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- User warnings/violations
CREATE TABLE IF NOT EXISTS user_violations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    violation_type VARCHAR(50), -- warning, mute, suspend, ban
    duration_days INT, -- NULL for permanent
    reason TEXT,
    given_by_admin_id UUID REFERENCES users(id),
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Admin audit log
CREATE TABLE IF NOT EXISTS admin_audit_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_user_id UUID REFERENCES users(id),
    action VARCHAR(100), -- user_suspended, skill_verified, post_removed, etc.
    target_type VARCHAR(50), -- user, skill, post, community, event
    target_id UUID,
    details JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ================== CONNECTIONS & SOCIAL ==================

-- Friendships/Connections
CREATE TABLE IF NOT EXISTS connections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    requester_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    recipient_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    status VARCHAR(20) DEFAULT 'pending', -- pending, accepted, blocked, rejected
    requested_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    responded_at TIMESTAMP WITH TIME ZONE,
    UNIQUE(requester_user_id, recipient_user_id)
);

-- Follows/Followers
CREATE TABLE IF NOT EXISTS follows (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    follower_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    followed_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    followed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(follower_user_id, followed_user_id)
);

-- Collaborations
CREATE TABLE IF NOT EXISTS collaborations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    initiator_user_id UUID REFERENCES users(id),
    collaborator_user_id UUID REFERENCES users(id),
    lfg_post_id UUID REFERENCES lfg_posts(id),
    status VARCHAR(20) DEFAULT 'active', -- active, completed, failed, cancelled
    started_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ================== PROGRESSION & TRUST ==================

-- XP ledger
CREATE TABLE IF NOT EXISTS xp_ledger (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    xp_amount INT,
    source_type VARCHAR(50), -- daily_login, message_reaction, showcase_save, help_answer, event_attendance, collaboration_complete, skill_verified, blog_featured, referral
    source_id UUID, -- e.g., message_id, event_id, etc.
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Level history
CREATE TABLE IF NOT EXISTS level_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    old_level VARCHAR(20),
    new_level VARCHAR(20),
    reason TEXT,
    changed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Trust score breakdown (for analytics)
CREATE TABLE IF NOT EXISTS trust_score_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    verified_skills_score DECIMAL(5, 2),
    community_quality_score DECIMAL(5, 2),
    reports_penalty DECIMAL(5, 2),
    account_age_score DECIMAL(5, 2),
    collaboration_score DECIMAL(5, 2),
    referral_score DECIMAL(5, 2),
    total_trust_score DECIMAL(3, 1),
    calculated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ================== COMPANY PROFILES ==================

CREATE TABLE IF NOT EXISTS company_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(255),
    logo_url TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    company_type VARCHAR(50), -- studio, publisher, esports_org, platform, agency, indie, educational
    company_size VARCHAR(50), -- 1_10, 11_50, 51_200, 201_500, 500_plus
    founded_year INT,
    hq_location VARCHAR(100),
    is_remote_friendly BOOLEAN DEFAULT FALSE,
    website_url TEXT,
    description TEXT,
    mission_statement VARCHAR(200),
    created_by_user_id UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Company employees
CREATE TABLE IF NOT EXISTS company_employees (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID REFERENCES company_profiles(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    role_title VARCHAR(100),
    is_visible_on_profile BOOLEAN DEFAULT FALSE, -- Employee opt-in to appear on company page
    linked_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(company_id, user_id)
);

-- Company talent pool (saved profiles for hiring)
CREATE TABLE IF NOT EXISTS company_talent_pool (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID REFERENCES company_profiles(id) ON DELETE CASCADE,
    target_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    role_tag VARCHAR(50),
    pipeline_status VARCHAR(50), -- saved, contacted, in_review, interview, offer_sent, hired, rejected
    internal_notes TEXT,
    saved_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ================== INDICES for Performance ==================

-- Users
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);

-- Master Profiles
CREATE INDEX idx_master_profiles_user_id ON master_profiles(user_id);
CREATE INDEX idx_master_profiles_username ON master_profiles(username);

-- Sub-profiles
CREATE INDEX idx_sub_profiles_user_id ON sub_profiles(user_id);
CREATE INDEX idx_sub_profiles_domain ON sub_profiles(domain);
CREATE INDEX idx_sub_profiles_user_domain ON sub_profiles(user_id, domain);

-- Skills
CREATE INDEX idx_user_skills_sub_profile_id ON user_skills(sub_profile_id);
CREATE INDEX idx_user_skills_verified ON user_skills(is_verified);

-- Community
CREATE INDEX idx_community_members_branch_user ON community_members(branch_id, user_id);
CREATE INDEX idx_messages_channel_id ON messages(channel_id);
CREATE INDEX idx_messages_user_id ON messages(user_id);
CREATE INDEX idx_messages_created_at ON messages(created_at);
CREATE INDEX idx_groups_branch_id ON groups(branch_id);
CREATE INDEX idx_group_members_group_id ON group_members(group_id);
CREATE INDEX idx_lfg_posts_branch_id ON lfg_posts(branch_id);
CREATE INDEX idx_lfg_posts_active ON lfg_posts(is_active, expires_at);
CREATE INDEX idx_showcase_posts_branch_id ON showcase_posts(branch_id);
CREATE INDEX idx_showcase_posts_featured ON showcase_posts(is_featured);
CREATE INDEX idx_events_branch_id ON events(branch_id);
CREATE INDEX idx_events_approved ON events(is_approved);

-- Moderation
CREATE INDEX idx_moderation_queue_status ON moderation_queue(status);
CREATE INDEX idx_moderation_queue_created_at ON moderation_queue(created_at);

-- XP & Progression
CREATE INDEX idx_xp_ledger_user_id ON xp_ledger(user_id);
CREATE INDEX idx_xp_ledger_created_at ON xp_ledger(created_at);

-- Company
CREATE INDEX idx_company_profiles_slug ON company_profiles(slug);
CREATE INDEX idx_company_employees_company_id ON company_employees(company_id);
CREATE INDEX idx_company_talent_pool_company_id ON company_talent_pool(company_id);
