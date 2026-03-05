# GzoneSphere Database Architecture

This directory contains the SQL schema definitions for the GzoneSphere platform. The database follows a distributed schema architecture to ensure scalability, security, and clear separation of concerns.

## Schema Overview

The database is structured into **8 core schemas** for users and a consolidated company database.

### 1. User Profiles ([user_profiles.sql](./user_profiles.sql))
- **Master Schema (public)**: Contains `master_profiles` (central identity) and `skills_catalog` (shared skills).
- **Profile Schemas (7 Total)**: Each profile type has its own isolated schema with an identical structure:
    - `game_creation_development`
    - `esports_play_performance`
    - `content_media_community`
    - `business_strategy_future`
    - `art_visual_character`
    - `writing_narrative_editorial`
    - `music_audio_sound`

Each profile schema contains:
- `sub_profiles`, `profile_specific_data`, `user_skills`, `projects`, `project_skills`, `user_posts`, `verification_requests`.

### 2. Company Database ([companies.sql](./companies.sql))
A single source of truth for all corporate entities on the platform.
- **Tables**: `companies`, `company_products`, `company_events`, `playtest_programs`, `talent_requirements`, `company_posts`.

## Key Relationships

### Primary Linking Key: `user_id`
Every sub-profile in the 7 profile schemas links back to `public.master_profiles` using the `user_id` (UUID).

```mermaid
graph TD
    MP[public.master_profiles] --> GCD[game_creation_development.sub_profiles]
    MP --> EPP[esports_play_performance.sub_profiles]
    MP --> CMC[content_media_community.sub_profiles]
    MP --> BSF[business_strategy_future.sub_profiles]
    MP --> AVC[art_visual_character.sub_profiles]
    MP --> WNE[writing_narrative_editorial.sub_profiles]
    MP --> MAS[music_audio_sound.sub_profiles]
    
    SC[public.skills_catalog] --> GCD_S[game_creation_development.user_skills]
    SC --> EPP_S[esports_play_performance.user_skills]
```

## Benefits of this Structure
1. **Scalability**: New profile types can be added as new schemas without affecting existing ones.
2. **Isolation**: High-traffic profile schemas can be optimized independently.
3. **Integrity**: Strong foreign key constraints between the master schema and sub-profiles.
