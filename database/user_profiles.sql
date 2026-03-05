-- ========================================================================
-- GZONESPHERE USER DATABASE - RESTRUCTURED
-- Master Profile in Public Schema + 7 Profile-Specific Schemas
-- ========================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";  -- For gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS "pg_trgm";   -- For text search optimization

-- Set timezone
SET timezone = 'UTC';

-- ========================================================================
-- SCHEMA: public (Master Profile)
-- ========================================================================

-- ------------------------------------------------------------------------
-- TABLE: master_profiles
-- Purpose: Core user identity - one per user (MASTER TABLE)
-- ------------------------------------------------------------------------
CREATE TABLE public.master_profiles (
    -- Primary Key
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Identity & Account
    display_name VARCHAR(255) NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    profile_photo_url VARCHAR(500),
    
    -- Authentication
    email VARCHAR(255) UNIQUE NOT NULL,
    email_verified BOOLEAN DEFAULT FALSE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    
    -- Location
    location_country VARCHAR(100),
    location_city VARCHAR(100),
    location_timezone VARCHAR(100) DEFAULT 'UTC',
    
    -- Languages
    languages JSONB DEFAULT '[]'::JSONB,
    
    -- Availability
    overall_availability_status VARCHAR(50) DEFAULT 'selective' NOT NULL,
    open_to_hiring BOOLEAN DEFAULT FALSE NOT NULL,
    open_to_freelance BOOLEAN DEFAULT FALSE NOT NULL,
    open_to_collaboration BOOLEAN DEFAULT FALSE NOT NULL,
    open_to_playtesting BOOLEAN DEFAULT FALSE NOT NULL,
    
    -- Aggregated Metrics (auto-calculated by application)
    total_sub_profiles INTEGER DEFAULT 0 NOT NULL,
    total_skills INTEGER DEFAULT 0 NOT NULL,
    total_verified_skills INTEGER DEFAULT 0 NOT NULL,
    
    -- Trust & Reputation (system-managed)
    trust_level VARCHAR(50) DEFAULT 'medium' NOT NULL,
    reliability_indicator VARCHAR(50),
    platform_standing VARCHAR(50) DEFAULT 'good' NOT NULL,
    
    -- Platform Activity Counts (auto-calculated)
    companies_worked_with INTEGER DEFAULT 0 NOT NULL,
    commissions_completed INTEGER DEFAULT 0 NOT NULL,
    hires_completed INTEGER DEFAULT 0 NOT NULL,
    playtests_participated INTEGER DEFAULT 0 NOT NULL,
    events_joined INTEGER DEFAULT 0 NOT NULL,
    
    -- Bio & Links
    bio TEXT,
    portfolio_url VARCHAR(500),
    resume_url VARCHAR(500),
    social_links JSONB DEFAULT '{}'::JSONB,
    
    -- Timestamps
    joined_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    last_active TIMESTAMP,
    
    -- Constraints
    CONSTRAINT chk_availability CHECK (
        overall_availability_status IN ('open', 'selective', 'not_available')
    ),
    CONSTRAINT chk_trust_level CHECK (
        trust_level IN ('low', 'medium', 'high')
    ),
    CONSTRAINT chk_platform_standing CHECK (
        platform_standing IN ('good', 'limited', 'restricted', 'banned')
    )
);

-- Indexes for master_profiles
CREATE INDEX idx_master_username ON public.master_profiles(username);
CREATE INDEX idx_master_email ON public.master_profiles(email);
CREATE INDEX idx_master_joined ON public.master_profiles(joined_date DESC);
CREATE INDEX idx_master_availability ON public.master_profiles(overall_availability_status);
CREATE INDEX idx_master_standing ON public.master_profiles(platform_standing);
CREATE INDEX idx_master_name_trgm ON public.master_profiles USING gin(display_name gin_trgm_ops);
CREATE INDEX idx_master_verified_skills ON public.master_profiles(total_verified_skills DESC);

-- Comments
COMMENT ON TABLE public.master_profiles IS 'Master user profile - single source of truth for each user';
COMMENT ON COLUMN public.master_profiles.user_id IS 'Auto-generated UUID primary key - links to all 7 profile schemas';

-- ========================================================================
-- SHARED CATALOG TABLE (in public schema)
-- ========================================================================

CREATE TABLE public.skills_catalog (
    skill_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    skill_name VARCHAR(255) UNIQUE NOT NULL,
    skill_category VARCHAR(50) NOT NULL,
    skill_group VARCHAR(100) NOT NULL,
    profile_type VARCHAR(50) NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT chk_skill_category CHECK (
        skill_category IN ('design', 'art', 'audio', 'systems', 'writing', 'business', 'esports')
    ),
    CONSTRAINT chk_skill_profile_type CHECK (
        profile_type IN (
            'game_creation_development',
            'esports_play_performance',
            'content_media_community',
            'business_strategy_future',
            'art_visual_character',
            'writing_narrative_editorial',
            'music_audio_sound'
        )
    )
);

CREATE INDEX idx_skills_name ON public.skills_catalog(skill_name);
CREATE INDEX idx_skills_category ON public.skills_catalog(skill_category);
CREATE INDEX idx_skills_profile_type ON public.skills_catalog(profile_type);
CREATE INDEX idx_skills_active ON public.skills_catalog(is_active);
CREATE INDEX idx_skills_name_trgm ON public.skills_catalog USING gin(skill_name gin_trgm_ops);

-- ========================================================================
-- PROFILE SCHEMAS (Template-based for brevity)
-- ========================================================================

-- NOTE: The following logic is applied identically to all 7 schemas:
-- 1. game_creation_development
-- 2. esports_play_performance
-- 3. content_media_community
-- 4. business_strategy_future
-- 5. art_visual_character
-- 6. writing_narrative_editorial
-- 7. music_audio_sound

-- [Schema-wide Triggers]
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_master_profiles_updated_at BEFORE UPDATE ON public.master_profiles
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- [Dynamic Schema Creation Helper - for documentation purpose, expanded below for the first schema]

-- ========================================================================
-- SCHEMA 1: game_creation_development (and others follows this structure)
-- ========================================================================
CREATE SCHEMA IF NOT EXISTS game_creation_development;

CREATE TABLE game_creation_development.sub_profiles (
    sub_profile_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.master_profiles(user_id) ON DELETE CASCADE,
    primary_role VARCHAR(255) NOT NULL,
    secondary_roles JSONB DEFAULT '[]'::JSONB,
    experience_level VARCHAR(50),
    availability_override JSONB,
    active BOOLEAN DEFAULT TRUE NOT NULL,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT chk_experience_level CHECK (experience_level IS NULL OR experience_level IN ('beginner', 'intermediate', 'advanced', 'expert')),
    CONSTRAINT unique_user_profile UNIQUE (user_id)
);

CREATE TABLE game_creation_development.profile_specific_data (
    data_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sub_profile_id UUID NOT NULL UNIQUE REFERENCES game_creation_development.sub_profiles(sub_profile_id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.master_profiles(user_id) ON DELETE CASCADE,
    data JSONB NOT NULL DEFAULT '{}'::JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE game_creation_development.user_skills (
    user_skill_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.master_profiles(user_id) ON DELETE CASCADE,
    sub_profile_id UUID NOT NULL REFERENCES game_creation_development.sub_profiles(sub_profile_id) ON DELETE CASCADE,
    skill_id UUID NOT NULL REFERENCES public.skills_catalog(skill_id) ON DELETE CASCADE,
    skill_level INTEGER NOT NULL CHECK (skill_level BETWEEN 1 AND 5),
    proof_type VARCHAR(50),
    proof_urls JSONB DEFAULT '[]'::JSONB,
    proof_description TEXT,
    verification_status VARCHAR(50) DEFAULT 'unverified' NOT NULL,
    verification_date TIMESTAMP,
    verified_by VARCHAR(100),
    rejection_reason TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT unique_user_skill UNIQUE (user_id, skill_id)
);

CREATE TABLE game_creation_development.projects (
    project_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.master_profiles(user_id) ON DELETE CASCADE,
    sub_profile_id UUID REFERENCES game_creation_development.sub_profiles(sub_profile_id) ON DELETE SET NULL,
    project_name VARCHAR(255) NOT NULL,
    project_type VARCHAR(50) NOT NULL,
    role_in_project VARCHAR(255),
    description TEXT,
    media_urls JSONB DEFAULT '[]'::JSONB,
    thumbnail_url VARCHAR(500),
    project_url VARCHAR(500),
    repository_url VARCHAR(500),
    start_date DATE,
    end_date DATE,
    status VARCHAR(50) NOT NULL,
    public BOOLEAN DEFAULT TRUE NOT NULL,
    featured BOOLEAN DEFAULT FALSE NOT NULL,
    team_size VARCHAR(50),
    collaborators TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE game_creation_development.project_skills (
    project_skill_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES game_creation_development.projects(project_id) ON DELETE CASCADE,
    skill_id UUID NOT NULL REFERENCES public.skills_catalog(skill_id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT unique_project_skill UNIQUE (project_id, skill_id)
);

CREATE TABLE game_creation_development.user_posts (
    post_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.master_profiles(user_id) ON DELETE CASCADE,
    sub_profile_id UUID REFERENCES game_creation_development.sub_profiles(sub_profile_id) ON DELETE SET NULL,
    post_type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    media_urls JSONB DEFAULT '[]'::JSONB,
    featured_image_url VARCHAR(500),
    linked_skills JSONB DEFAULT '[]'::JSONB,
    linked_projects JSONB DEFAULT '[]'::JSONB,
    visibility VARCHAR(50) DEFAULT 'public' NOT NULL,
    view_count INTEGER DEFAULT 0 NOT NULL,
    published_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE game_creation_development.verification_requests (
    request_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_skill_id UUID NOT NULL REFERENCES game_creation_development.user_skills(user_skill_id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.master_profiles(user_id) ON DELETE CASCADE,
    submitted_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    reviewed_date TIMESTAMP,
    reviewer_id VARCHAR(100),
    reviewer_type VARCHAR(50),
    status VARCHAR(50) DEFAULT 'pending' NOT NULL,
    admin_notes TEXT,
    rejection_reason TEXT,
    priority VARCHAR(50) DEFAULT 'normal',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- NOTE: For production, repeat the above table creation for the other 6 schemas:
-- esports_play_performance, content_media_community, business_strategy_future,
-- art_visual_character, writing_narrative_editorial, music_audio_sound.
