-- ========================================================================
-- GZONESPHERE COMPANIES DATABASE
-- Core profiles, products, events, playtests, hiring, and posts
-- ========================================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";  -- For gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS "pg_trgm";   -- For text search optimization

-- Set timezone
SET timezone = 'UTC';

-- ----------------------------------------------------------------------------
-- TABLE: companies
-- Purpose: Core company/organization profiles
-- ----------------------------------------------------------------------------

CREATE TABLE companies (
    -- Primary Key
    company_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Basic Identity
    company_name VARCHAR(255) NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    
    -- Visual Identity
    logo_url VARCHAR(500),
    banner_url VARCHAR(500),
    
    -- Company Classification
    company_types JSONB DEFAULT '[]'::JSONB,
    
    company_size VARCHAR(50),
    
    -- Location
    location_country VARCHAR(100),
    location_city VARCHAR(100),
    
    -- About
    company_bio TEXT,
    mission_statement TEXT,
    
    -- Contact & Social
    website_url VARCHAR(500),
    contact_email VARCHAR(255),
    social_links JSONB DEFAULT '{}'::JSONB,
    
    -- Working Style (Optional)
    team_structure VARCHAR(50),
    collaboration_style TEXT,
    ai_usage_policy TEXT,
    credit_ethics_policy TEXT,
    
    -- Verification & Trust
    verification_status VARCHAR(50) DEFAULT 'unverified' NOT NULL,
    verified_date TIMESTAMP,
    trust_score FLOAT DEFAULT 0.0 NOT NULL,
    platform_standing VARCHAR(50) DEFAULT 'good' NOT NULL,
    
    -- Metrics (Auto-calculated)
    total_products INTEGER DEFAULT 0 NOT NULL,
    total_events INTEGER DEFAULT 0 NOT NULL,
    total_playtests INTEGER DEFAULT 0 NOT NULL,
    follower_count INTEGER DEFAULT 0 NOT NULL,
    
    -- Metadata
    founded_year INTEGER,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    last_active TIMESTAMP,
    
    -- Constraints
    CONSTRAINT chk_company_size CHECK (
        company_size IN ('1-10', '11-50', '51-200', '201-500', '500+')
    ),
    CONSTRAINT chk_verification_status CHECK (
        verification_status IN ('unverified', 'pending', 'verified')
    ),
    CONSTRAINT chk_platform_standing CHECK (
        platform_standing IN ('good', 'limited', 'restricted')
    ),
    CONSTRAINT chk_team_structure CHECK (
        team_structure IS NULL OR team_structure IN ('remote', 'hybrid', 'office', 'flexible')
    ),
    CONSTRAINT chk_founded_year CHECK (
        founded_year IS NULL OR founded_year >= 1900
    )
);

-- Indexes
CREATE INDEX idx_companies_username ON companies(username);
CREATE INDEX idx_companies_verification ON companies(verification_status);
CREATE INDEX idx_companies_standing ON companies(platform_standing);
CREATE INDEX idx_companies_created ON companies(created_at DESC);
CREATE INDEX idx_companies_name_trgm ON companies USING gin(company_name gin_trgm_ops);
CREATE INDEX idx_companies_types ON companies USING gin(company_types);

-- Comments
COMMENT ON TABLE companies IS 'Core company and organization profiles';
COMMENT ON COLUMN companies.company_id IS 'Auto-generated UUID primary key';
COMMENT ON COLUMN companies.username IS 'Unique username for URL slugs (e.g., /company/username)';

-- ----------------------------------------------------------------------------
-- TABLE: company_products
-- Purpose: Games, tools, engines, platforms created by companies
-- ----------------------------------------------------------------------------

CREATE TABLE company_products (
    -- Primary Key
    product_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Foreign Key
    company_id UUID NOT NULL REFERENCES companies(company_id) ON DELETE CASCADE,
    
    -- Product Details
    product_name VARCHAR(255) NOT NULL,
    product_type VARCHAR(50) NOT NULL,
    
    -- Status
    status VARCHAR(50) NOT NULL,
    
    -- Game/Product Info
    platforms JSONB DEFAULT '[]'::JSONB,
    genres JSONB DEFAULT '[]'::JSONB,
    
    -- Media
    cover_image_url VARCHAR(500),
    trailer_url VARCHAR(500),
    screenshots JSONB DEFAULT '[]'::JSONB,
    
    -- Description
    short_description TEXT,
    full_description TEXT,
    
    -- External Links
    steam_url VARCHAR(500),
    epic_url VARCHAR(500),
    itch_url VARCHAR(500),
    website_url VARCHAR(500),
    
    -- Dates
    announced_date DATE,
    release_date DATE,
    
    -- Visibility
    visible BOOLEAN DEFAULT TRUE NOT NULL,
    featured BOOLEAN DEFAULT FALSE NOT NULL,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    
    -- Constraints
    CONSTRAINT chk_product_type CHECK (
        product_type IN ('game', 'engine', 'tool', 'platform', 'service', 'hardware')
    ),
    CONSTRAINT chk_product_status CHECK (
        status IN ('concept', 'in_development', 'early_access', 'live', 'maintenance', 'archived', 'cancelled')
    )
);

-- Indexes
CREATE INDEX idx_products_company ON company_products(company_id);
CREATE INDEX idx_products_status ON company_products(status);
CREATE INDEX idx_products_visible ON company_products(visible);
CREATE INDEX idx_products_featured ON company_products(featured);
CREATE INDEX idx_products_name_trgm ON company_products USING gin(product_name gin_trgm_ops);
CREATE INDEX idx_products_platforms ON company_products USING gin(platforms);
CREATE INDEX idx_products_genres ON company_products USING gin(genres);

-- ----------------------------------------------------------------------------
-- TABLE: company_events
-- Purpose: Events, tournaments, conferences organized by companies
-- ----------------------------------------------------------------------------

CREATE TABLE company_events (
    -- Primary Key
    event_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Foreign Key
    company_id UUID NOT NULL REFERENCES companies(company_id) ON DELETE CASCADE,
    
    -- Event Details
    event_name VARCHAR(255) NOT NULL,
    event_type VARCHAR(50) NOT NULL,
    description TEXT,
    
    -- Schedule
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    timezone VARCHAR(100) DEFAULT 'UTC',
    
    -- Location
    location_type VARCHAR(50) NOT NULL,
    location_details TEXT,
    venue_name VARCHAR(255),
    venue_address TEXT,
    
    -- Registration
    registration_required BOOLEAN DEFAULT FALSE NOT NULL,
    registration_url VARCHAR(500),
    registration_deadline TIMESTAMP,
    max_participants INTEGER,
    current_participants INTEGER DEFAULT 0 NOT NULL,
    
    -- Media
    event_image_url VARCHAR(500),
    event_banner_url VARCHAR(500),
    
    -- Status
    status VARCHAR(50) NOT NULL,
    
    -- Visibility
    public BOOLEAN DEFAULT TRUE NOT NULL,
    featured BOOLEAN DEFAULT FALSE NOT NULL,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    
    -- Constraints
    CONSTRAINT chk_event_type CHECK (
        event_type IN ('tournament', 'showcase', 'conference', 'workshop', 'hackathon', 
                       'game_jam', 'launch_party', 'meetup', 'webinar', 'expo')
    ),
    CONSTRAINT chk_location_type CHECK (
        location_type IN ('online', 'in_person', 'hybrid')
    ),
    CONSTRAINT chk_event_status CHECK (
        status IN ('draft', 'announced', 'registration_open', 'registration_closed', 
                   'ongoing', 'completed', 'cancelled')
    ),
    CONSTRAINT chk_event_dates CHECK (end_date >= start_date),
    CONSTRAINT chk_participants CHECK (current_participants >= 0),
    CONSTRAINT chk_max_participants CHECK (
        max_participants IS NULL OR max_participants > 0
    )
);

-- Indexes
CREATE INDEX idx_events_company ON company_events(company_id);
CREATE INDEX idx_events_dates ON company_events(start_date, end_date);
CREATE INDEX idx_events_status ON company_events(status);
CREATE INDEX idx_events_type ON company_events(event_type);
CREATE INDEX idx_events_public ON company_events(public);

-- ----------------------------------------------------------------------------
-- TABLE: playtest_programs
-- Purpose: Beta testing and playtesting programs
-- ----------------------------------------------------------------------------

CREATE TABLE playtest_programs (
    -- Primary Key
    program_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Foreign Keys
    company_id UUID NOT NULL REFERENCES companies(company_id) ON DELETE CASCADE,
    product_id UUID REFERENCES company_products(product_id) ON DELETE SET NULL,
    
    -- Program Details
    program_name VARCHAR(255) NOT NULL,
    description TEXT,
    
    -- Requirements
    target_profiles TEXT,
    skill_requirements TEXT,
    
    -- Program Settings
    nda_required BOOLEAN DEFAULT FALSE NOT NULL,
    age_requirement INTEGER,
    platform_requirements JSONB DEFAULT '[]'::JSONB,
    
    -- Timeline
    start_date DATE,
    end_date DATE,
    
    -- Capacity
    tester_slots INTEGER,
    current_testers INTEGER DEFAULT 0 NOT NULL,
    
    -- Status
    status VARCHAR(50) NOT NULL,
    
    -- Feedback
    feedback_type VARCHAR(50),
    feedback_instructions TEXT,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    
    -- Constraints
    CONSTRAINT chk_program_status CHECK (
        status IN ('draft', 'recruiting', 'active', 'paused', 'completed', 'cancelled')
    ),
    CONSTRAINT chk_feedback_type CHECK (
        feedback_type IS NULL OR 
        feedback_type IN ('survey', 'interview', 'bug_report', 'open_feedback', 'structured_form')
    ),
    CONSTRAINT chk_age_requirement CHECK (
        age_requirement IS NULL OR (age_requirement >= 13 AND age_requirement <= 100)
    ),
    CONSTRAINT chk_program_dates CHECK (
        end_date IS NULL OR start_date IS NULL OR end_date >= start_date
    ),
    CONSTRAINT chk_tester_slots CHECK (
        tester_slots IS NULL OR tester_slots > 0
    )
);

-- Indexes
CREATE INDEX idx_programs_company ON playtest_programs(company_id);
CREATE INDEX idx_programs_product ON playtest_programs(product_id);
CREATE INDEX idx_programs_status ON playtest_programs(status);

-- ----------------------------------------------------------------------------
-- TABLE: talent_requirements
-- Purpose: Job postings and hiring requirements
-- ----------------------------------------------------------------------------

CREATE TABLE talent_requirements (
    -- Primary Key
    requirement_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Foreign Key
    company_id UUID NOT NULL REFERENCES companies(company_id) ON DELETE CASCADE,
    
    -- Position Details
    position_title VARCHAR(255) NOT NULL,
    employment_type VARCHAR(50) NOT NULL,
    
    -- Requirements
    target_profiles TEXT,
    required_skills TEXT,
    preferred_skills TEXT,
    
    -- Level & Experience
    verification_required BOOLEAN DEFAULT FALSE NOT NULL,
    experience_level VARCHAR(50),
    years_of_experience VARCHAR(50),
    
    -- Details
    description TEXT,
    responsibilities TEXT,
    qualifications TEXT,
    benefits TEXT,
    
    -- Location
    location_type VARCHAR(50) NOT NULL,
    location VARCHAR(255),
    
    -- Compensation
    salary_range VARCHAR(100),
    salary_currency VARCHAR(10) DEFAULT 'USD',
    
    -- Application
    application_url VARCHAR(500),
    application_email VARCHAR(255),
    
    -- Status
    status VARCHAR(50) NOT NULL,
    
    -- Timestamps
    posted_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deadline_date TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    filled_date TIMESTAMP,
    
    -- Constraints
    CONSTRAINT chk_employment_type CHECK (
        employment_type IN ('full_time', 'part_time', 'contract', 'freelance', 'internship', 'temporary')
    ),
    CONSTRAINT chk_experience_level CHECK (
        experience_level IS NULL OR 
        experience_level IN ('entry', 'junior', 'mid', 'senior', 'lead', 'principal', 'any')
    ),
    CONSTRAINT chk_location_type CHECK (
        location_type IN ('remote', 'hybrid', 'onsite')
    ),
    CONSTRAINT chk_requirement_status CHECK (
        status IN ('draft', 'open', 'paused', 'filled', 'closed', 'cancelled')
    )
);

-- Indexes
CREATE INDEX idx_requirements_company ON talent_requirements(company_id);
CREATE INDEX idx_requirements_status ON talent_requirements(status);
CREATE INDEX idx_requirements_posted ON talent_requirements(posted_date DESC);
CREATE INDEX idx_requirements_employment ON talent_requirements(employment_type);
CREATE INDEX idx_requirements_location ON talent_requirements(location_type);

-- ----------------------------------------------------------------------------
-- TABLE: company_posts
-- Purpose: Company updates, announcements, blog posts
-- ----------------------------------------------------------------------------

CREATE TABLE company_posts (
    -- Primary Key
    post_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Foreign Keys
    company_id UUID NOT NULL REFERENCES companies(company_id) ON DELETE CASCADE,
    linked_product_id UUID REFERENCES company_products(product_id) ON DELETE SET NULL,
    linked_event_id UUID REFERENCES company_events(event_id) ON DELETE SET NULL,
    
    -- Post Type
    post_type VARCHAR(50) NOT NULL,
    
    -- Content
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    
    -- Media
    media_urls JSONB DEFAULT '[]'::JSONB,
    featured_image_url VARCHAR(500),
    
    -- SEO
    slug VARCHAR(255) UNIQUE,
    meta_description TEXT,
    
    -- Visibility
    public BOOLEAN DEFAULT TRUE NOT NULL,
    pinned BOOLEAN DEFAULT FALSE NOT NULL,
    allow_comments BOOLEAN DEFAULT TRUE NOT NULL,
    
    -- Engagement
    view_count INTEGER DEFAULT 0 NOT NULL,
    
    -- Publishing
    published_at TIMESTAMP,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    
    -- Constraints
    CONSTRAINT chk_post_type CHECK (
        post_type IN ('announcement', 'dev_update', 'hiring', 'event', 
                      'blog', 'media', 'press_release', 'tutorial', 'news')
    )
);

-- Indexes
CREATE INDEX idx_posts_company ON company_posts(company_id);
CREATE INDEX idx_posts_type ON company_posts(post_type);
CREATE INDEX idx_posts_created ON company_posts(created_at DESC);
CREATE INDEX idx_posts_published ON company_posts(published_at DESC);
CREATE INDEX idx_posts_pinned ON company_posts(pinned, created_at DESC);
CREATE INDEX idx_posts_public ON company_posts(public, published_at DESC);
CREATE INDEX idx_posts_slug ON company_posts(slug);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_companies_updated_at BEFORE UPDATE ON companies
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_company_products_updated_at BEFORE UPDATE ON company_products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_company_events_updated_at BEFORE UPDATE ON company_events
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_playtest_programs_updated_at BEFORE UPDATE ON playtest_programs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_talent_requirements_updated_at BEFORE UPDATE ON talent_requirements
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_company_posts_updated_at BEFORE UPDATE ON company_posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
