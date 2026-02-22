CREATE SCHEMA IF NOT EXISTS gamepost;

CREATE TABLE IF NOT EXISTS gamepost.game_posts (
    game_post_id SERIAL PRIMARY KEY,
    slug VARCHAR(200) UNIQUE,
    status VARCHAR(20) DEFAULT 'draft',
    publish_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS gamepost.hero (
    hero_id SERIAL PRIMARY KEY,
    game_post_id INT NOT NULL REFERENCES gamepost.game_posts(game_post_id) ON DELETE CASCADE,
    game_title TEXT NOT NULL,
    game_desc_short TEXT,
    background_img TEXT
);

CREATE TABLE IF NOT EXISTS gamepost.storyline (
    storyline_id SERIAL PRIMARY KEY,
    game_post_id INT NOT NULL REFERENCES gamepost.game_posts(game_post_id) ON DELETE CASCADE,
    paragraphs TEXT
);

CREATE TABLE IF NOT EXISTS gamepost.gameplay (
    gameplay_id SERIAL PRIMARY KEY,
    game_post_id INT NOT NULL REFERENCES gamepost.game_posts(game_post_id) ON DELETE CASCADE,
    paragraph TEXT,
    gameplay_title TEXT,
    gameplay_title_desc TEXT
);

CREATE TABLE IF NOT EXISTS gamepost.quick_control_overview (
    qco_id SERIAL PRIMARY KEY,
    game_post_id INT NOT NULL REFERENCES gamepost.game_posts(game_post_id) ON DELETE CASCADE,
    qco_title TEXT,
    qco_title_desc TEXT
);

CREATE TABLE IF NOT EXISTS gamepost.system_requirement (
    sys_req_id SERIAL PRIMARY KEY,
    game_post_id INT NOT NULL REFERENCES gamepost.game_posts(game_post_id) ON DELETE CASCADE,
    os_min TEXT,
    os_rec TEXT,
    processor_min TEXT,
    processor_rec TEXT,
    memory_min TEXT,
    memory_rec TEXT,
    graphics_min TEXT,
    graphics_rec TEXT,
    storage_min TEXT,
    storage_rec TEXT,
    directx_min TEXT,
    directx_rec TEXT
);

CREATE TABLE IF NOT EXISTS gamepost.get_game (
    get_game_id SERIAL PRIMARY KEY,
    game_post_id INT NOT NULL REFERENCES gamepost.game_posts(game_post_id) ON DELETE CASCADE,
    affiliate_links TEXT
);

CREATE TABLE IF NOT EXISTS gamepost.game_info (
    info_id SERIAL PRIMARY KEY,
    game_post_id INT NOT NULL REFERENCES gamepost.game_posts(game_post_id) ON DELETE CASCADE,
    developer TEXT,
    publisher TEXT,
    release_date DATE,
    genres TEXT,
    platforms TEXT,
    profile_size_photo TEXT
);

CREATE TABLE IF NOT EXISTS gamepost.carousel (
    carousel_id SERIAL PRIMARY KEY,
    game_post_id INT NOT NULL REFERENCES gamepost.game_posts(game_post_id) ON DELETE CASCADE,
    yt_url_official TEXT,
    upload TEXT
);

CREATE TABLE IF NOT EXISTS gamepost.modes (
    modes_id SERIAL PRIMARY KEY,
    game_post_id INT NOT NULL REFERENCES gamepost.game_posts(game_post_id) ON DELETE CASCADE,
    mode_title TEXT,
    mode_titledesc TEXT
);

CREATE TABLE IF NOT EXISTS gamepost.dlcs (
    dlc_id SERIAL PRIMARY KEY,
    game_post_id INT NOT NULL REFERENCES gamepost.game_posts(game_post_id) ON DELETE CASCADE,
    dlc_pt TEXT,
    description TEXT,
    image_url TEXT
);

CREATE TABLE IF NOT EXISTS gamepost.awards_and_achievements (
    aa_id SERIAL PRIMARY KEY,
    game_post_id INT NOT NULL REFERENCES gamepost.game_posts(game_post_id) ON DELETE CASCADE,
    aa_pt TEXT
);

CREATE TABLE IF NOT EXISTS gamepost.join_our_community (
    community_id SERIAL PRIMARY KEY,
    game_post_id INT NOT NULL REFERENCES gamepost.game_posts(game_post_id) ON DELETE CASCADE,
    platform_name TEXT,
    platform_link TEXT
);

CREATE TABLE IF NOT EXISTS gamepost.mechanics (
    mechanic_id SERIAL PRIMARY KEY,
    game_post_id INT NOT NULL REFERENCES gamepost.game_posts(game_post_id) ON DELETE CASCADE,
    mechanic_text TEXT
);

CREATE TABLE IF NOT EXISTS gamepost.controls (
    control_id SERIAL PRIMARY KEY,
    game_post_id INT NOT NULL REFERENCES gamepost.game_posts(game_post_id) ON DELETE CASCADE,
    category TEXT,
    control_text TEXT
);

CREATE TABLE IF NOT EXISTS gamepost.expert_reviews (
    review_id SERIAL PRIMARY KEY,
    game_post_id INT NOT NULL REFERENCES gamepost.game_posts(game_post_id) ON DELETE CASCADE,
    site TEXT,
    quote TEXT,
    rating FLOAT,
    max_rating FLOAT
);

CREATE TABLE IF NOT EXISTS gamepost.user_reviews (
    review_id SERIAL PRIMARY KEY,
    game_post_id INT NOT NULL REFERENCES gamepost.game_posts(game_post_id) ON DELETE CASCADE,
    username TEXT,
    comment TEXT,
    rating INT
);

CREATE TABLE IF NOT EXISTS gamepost.achievements (
    achievement_id SERIAL PRIMARY KEY,
    game_post_id INT NOT NULL REFERENCES gamepost.game_posts(game_post_id) ON DELETE CASCADE,
    title TEXT,
    description TEXT
);
