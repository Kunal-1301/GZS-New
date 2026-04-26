"""
GzoneSphere Phase 2 Database Models
Using SQLAlchemy ORM for all Phase 2 entities
"""
from sqlalchemy import Column, String, Integer, Float, DateTime, Boolean, UUID, ForeignKey, Text, JSON, Numeric, func, Index
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid

Base = declarative_base()

# ================== MASTER PROFILE & SUB-PROFILES ==================

class User(Base):
    """Master user account"""
    __tablename__ = "users"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    username = Column(String(50), unique=True, nullable=False, index=True)
    email = Column(String(255), unique=True, nullable=False, index=True)
    password_hash = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    updated_at = Column(DateTime(timezone=True), default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    master_profile = relationship("MasterProfile", back_populates="user", uselist=False)
    sub_profiles = relationship("SubProfile", back_populates="user")
    skills = relationship("UserSkill", back_populates="user")
    connections_initiated = relationship("Connection", foreign_keys="Connection.requester_user_id")
    connections_received = relationship("Connection", foreign_keys="Connection.recipient_user_id")


class MasterProfile(Base):
    """Public identity representing the real person"""
    __tablename__ = "master_profiles"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), unique=True, nullable=False)
    username = Column(String(50), unique=True, nullable=False, index=True)
    real_name = Column(String(100))
    avatar_url = Column(Text)
    banner_url = Column(Text)
    location = Column(String(100))
    platform_level = Column(String(20), default="Beginner")  # Beginner, Hustler, Extreme, Pro
    trust_score = Column(Numeric(3, 1), default=5.0)  # 1.0-10.0
    verified_checkmark = Column(Boolean, default=False)
    bio = Column(Text)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow, index=True)
    updated_at = Column(DateTime(timezone=True), default=datetime.utcnow, onupdate=datetime.utcnow)
    username_changed_at = Column(DateTime(timezone=True))
    username_change_count = Column(Integer, default=0)
    
    # Relationships
    user = relationship("User", back_populates="master_profile")
    
    __table_args__ = (Index("idx_master_profiles_username", "username"),)


class SubProfile(Base):
    """Domain-specific professional identity"""
    __tablename__ = "sub_profiles"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False, index=True)
    domain = Column(String(20), nullable=False)  # dev, esports, content, business, art, writing, audio
    username = Column(String(50), nullable=False)
    primary_role = Column(String(100))
    featured_roles = Column(JSON)  # Array of up to 3 secondary roles
    headline = Column(String(80))
    experience_level = Column(String(20))  # Beginner, Intermediate, Advanced, Expert
    bio = Column(Text)
    avatar_url = Column(Text)
    visibility = Column(String(20), default="public")  # public, connections_only, private
    status = Column(String(20), default="Active")  # Active, Idle, Dormant
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    updated_at = Column(DateTime(timezone=True), default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    user = relationship("User", back_populates="sub_profiles")
    skills = relationship("UserSkill", back_populates="sub_profile")
    tools = relationship("Tool", back_populates="sub_profile")
    projects = relationship("Project", back_populates="sub_profile")
    availability = relationship("Availability", back_populates="sub_profile", uselist=False)
    
    __table_args__ = (
        Index("idx_sub_profiles_user_domain", "user_id", "domain"),
        Index("idx_sub_profiles_domain", "domain"),
    )


# ================== SKILLS & VERIFICATION ==================

class SkillsTaxonomy(Base):
    """Reference table of all available skills"""
    __tablename__ = "skills_taxonomy"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(100), unique=True, nullable=False)
    domain = Column(String(20), nullable=False)  # dev, esports, content, business, art, writing, audio
    category = Column(String(100))
    description = Column(Text)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)


class UserSkill(Base):
    """User's declared or verified skills"""
    __tablename__ = "user_skills"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    sub_profile_id = Column(UUID(as_uuid=True), ForeignKey("sub_profiles.id"), nullable=False, index=True)
    skill_id = Column(UUID(as_uuid=True), ForeignKey("skills_taxonomy.id"), nullable=False)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)  # Denormalized for convenience
    is_verified = Column(Boolean, default=False, index=True)
    verification_method = Column(String(50))  # project_demo, github_code, cert, employer_letter, live_test, portfolio, peer_review
    verification_proof_url = Column(Text)
    verification_proof_text = Column(Text)
    verified_by_user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    verified_at = Column(DateTime(timezone=True))
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    updated_at = Column(DateTime(timezone=True), default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    sub_profile = relationship("SubProfile", back_populates="skills")
    user = relationship("User", foreign_keys=[user_id])
    
    __table_args__ = (Index("idx_user_skills_verified", "is_verified"),)


class VerificationQueue(Base):
    """Skill verification requests awaiting admin review"""
    __tablename__ = "verification_queue"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_skill_id = Column(UUID(as_uuid=True), ForeignKey("user_skills.id"), nullable=False)
    submitted_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    reviewed_by_user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    status = Column(String(20), default="pending")  # pending, approved, rejected, requesting_more_info
    reviewer_notes = Column(Text)
    reviewed_at = Column(DateTime(timezone=True))
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)


# ================== PROFILE CONTENT SECTIONS ==================

class Tool(Base):
    """Section 4: Tools & Stack"""
    __tablename__ = "tools"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    sub_profile_id = Column(UUID(as_uuid=True), ForeignKey("sub_profiles.id"), nullable=False)
    tool_name = Column(String(100))
    category = Column(String(50))  # engine, language, platform, software
    proficiency_level = Column(String(20))  # Beginner, Intermediate, Advanced, Expert
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    
    # Relationships
    sub_profile = relationship("SubProfile", back_populates="tools")


class Project(Base):
    """Section 5: Projects / Portfolio"""
    __tablename__ = "projects"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    sub_profile_id = Column(UUID(as_uuid=True), ForeignKey("sub_profiles.id"), nullable=False)
    title = Column(String(255))
    description = Column(Text)
    media_urls = Column(JSON)  # Array of URLs
    skills_demonstrated = Column(JSON)  # Array of skill IDs
    team_size = Column(String(50))  # Solo, 2-5, 6-15, 16-50, 50+
    year = Column(Integer)
    demo_url = Column(Text)
    source_code_url = Column(Text)
    # Domain-specific fields
    genre = Column(String(50))  # For Dev: RPG, FPS, Strategy, etc.
    engine_used = Column(String(100))
    platforms = Column(JSON)  # PC, Console, Mobile, VR
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    updated_at = Column(DateTime(timezone=True), default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    sub_profile = relationship("SubProfile", back_populates="projects")


class Availability(Base):
    """Section 7: Availability"""
    __tablename__ = "availability"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    sub_profile_id = Column(UUID(as_uuid=True), ForeignKey("sub_profiles.id"), unique=True, nullable=False)
    timezone = Column(String(50))
    collaboration_type = Column(String(50))  # full_time, contract, freelance, open_to_offers
    weekly_hours_available = Column(String(50))  # part_time, full_time, flexible
    rate_range_start = Column(Integer)
    rate_range_end = Column(Integer)
    rate_currency = Column(String(10))
    visible_to_others = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    updated_at = Column(DateTime(timezone=True), default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    sub_profile = relationship("SubProfile", back_populates="availability")


# ================== COMMUNITY SYSTEM ==================

class CommunityBranch(Base):
    """Community branches (dev, esports, content, etc.)"""
    __tablename__ = "community_branches"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    slug = Column(String(50), unique=True, nullable=False)
    name = Column(String(100))
    description = Column(Text)
    icon_url = Column(Text)
    color_accent = Column(String(20))
    status = Column(String(20), default="Active")
    moderation_level = Column(String(20), default="Standard")
    member_count = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    
    # Relationships
    channels = relationship("Channel", back_populates="branch")
    members = relationship("CommunityMember", back_populates="branch")


class CommunityMember(Base):
    """Community branch membership"""
    __tablename__ = "community_members"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    branch_id = Column(UUID(as_uuid=True), ForeignKey("community_branches.id"), nullable=False)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    sub_profile_id = Column(UUID(as_uuid=True), ForeignKey("sub_profiles.id"))
    joined_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    opted_out = Column(Boolean, default=False)
    role = Column(String(20), default="member")  # member, moderator, admin
    
    # Relationships
    branch = relationship("CommunityBranch", back_populates="members")
    
    __table_args__ = (Index("idx_community_members_branch_user", "branch_id", "user_id"),)


class Channel(Base):
    """Channels within community branches"""
    __tablename__ = "channels"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    branch_id = Column(UUID(as_uuid=True), ForeignKey("community_branches.id"), nullable=False)
    name = Column(String(100))
    description = Column(Text)
    channel_type = Column(String(20), default="text")  # text, announcement, resource
    slowmode_seconds = Column(Integer, default=0)
    min_level_to_post = Column(String(20), default="Beginner")
    is_default = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    
    # Relationships
    branch = relationship("CommunityBranch", back_populates="channels")
    messages = relationship("Message", back_populates="channel")


class Message(Base):
    """Messages in channels"""
    __tablename__ = "messages"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    channel_id = Column(UUID(as_uuid=True), ForeignKey("channels.id"), nullable=False, index=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), index=True)
    sub_profile_id = Column(UUID(as_uuid=True), ForeignKey("sub_profiles.id"))
    content = Column(Text)
    media_urls = Column(JSON)
    edited_at = Column(DateTime(timezone=True))
    deleted_at = Column(DateTime(timezone=True))
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow, index=True)
    
    # Relationships
    channel = relationship("Channel", back_populates="messages")
    reactions = relationship("MessageReaction", back_populates="message")
    
    __table_args__ = (Index("idx_messages_created_at", "created_at"),)


class MessageReaction(Base):
    """Emoji reactions on messages"""
    __tablename__ = "message_reactions"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    message_id = Column(UUID(as_uuid=True), ForeignKey("messages.id"), nullable=False)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    emoji_name = Column(String(50))
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    
    # Relationships
    message = relationship("Message", back_populates="reactions")


class Group(Base):
    """Groups within community branches"""
    __tablename__ = "groups"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    branch_id = Column(UUID(as_uuid=True), ForeignKey("community_branches.id"), nullable=False)
    name = Column(String(100))
    description = Column(Text)
    is_public = Column(Boolean, default=True)
    max_members = Column(Integer, default=100)
    member_count = Column(Integer, default=0)
    cover_image_url = Column(Text)
    created_by_user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    updated_at = Column(DateTime(timezone=True), default=datetime.utcnow, onupdate=datetime.utcnow)


class GroupMember(Base):
    """Group membership"""
    __tablename__ = "group_members"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    group_id = Column(UUID(as_uuid=True), ForeignKey("groups.id"), nullable=False)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    role = Column(String(20), default="member")  # member, moderator, owner
    joined_at = Column(DateTime(timezone=True), default=datetime.utcnow)


class LFGPost(Base):
    """Looking-for-group posts"""
    __tablename__ = "lfg_posts"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    branch_id = Column(UUID(as_uuid=True), ForeignKey("community_branches.id"), nullable=False)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False, index=True)
    sub_profile_id = Column(UUID(as_uuid=True), ForeignKey("sub_profiles.id"))
    goal_type = Column(String(50))
    description = Column(Text)
    required_skills = Column(JSON)  # Array of skill IDs
    availability_window = Column(String(50))
    availability_date = Column(DateTime(timezone=True))
    timezone = Column(String(50))
    platform_type = Column(String(50))
    contact_preference = Column(String(50))
    contact_url = Column(Text)
    auto_expire = Column(Boolean, default=True)
    expires_at = Column(DateTime(timezone=True))
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    updated_at = Column(DateTime(timezone=True), default=datetime.utcnow, onupdate=datetime.utcnow)
    
    __table_args__ = (Index("idx_lfg_posts_active", "is_active", "expires_at"),)


class ShowcasePost(Base):
    """Showcase posts (creative/professional work)"""
    __tablename__ = "showcase_posts"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    branch_id = Column(UUID(as_uuid=True), ForeignKey("community_branches.id"), nullable=False)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    sub_profile_id = Column(UUID(as_uuid=True), ForeignKey("sub_profiles.id"), nullable=False)
    title = Column(String(80))
    description = Column(String(500))
    media_urls = Column(JSON)  # Array of URLs
    media_type = Column(String(20))  # image, video, audio, text
    skill_tags = Column(JSON)  # Array of skill IDs
    likes_count = Column(Integer, default=0)
    comments_count = Column(Integer, default=0)
    shares_count = Column(Integer, default=0)
    is_featured = Column(Boolean, default=False, index=True)
    featured_at = Column(DateTime(timezone=True))
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)


class ShowcaseLike(Base):
    """Likes on showcase posts"""
    __tablename__ = "showcase_likes"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    post_id = Column(UUID(as_uuid=True), ForeignKey("showcase_posts.id"), nullable=False)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)


class Event(Base):
    """Community events"""
    __tablename__ = "events"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    branch_id = Column(UUID(as_uuid=True), ForeignKey("community_branches.id"), nullable=False)
    created_by_user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    title = Column(String(255))
    description = Column(Text)
    event_type = Column(String(50))  # tournament, game_jam, writing_contest, etc.
    starts_at = Column(DateTime(timezone=True))
    ends_at = Column(DateTime(timezone=True))
    timezone = Column(String(50))
    capacity = Column(Integer)
    rsvp_count = Column(Integer, default=0)
    host_sub_profile_id = Column(UUID(as_uuid=True), ForeignKey("sub_profiles.id"))
    registration_url = Column(Text)
    is_approved = Column(Boolean, default=False, index=True)
    is_featured = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)


class EventRSVP(Base):
    """Event RSVPs"""
    __tablename__ = "event_rsvps"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    event_id = Column(UUID(as_uuid=True), ForeignKey("events.id"), nullable=False)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    rsvp_status = Column(String(20), default="going")  # going, interested, not_going
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)


# ================== ADMIN & MODERATION ==================

class ModerationQueue(Base):
    """Flagged content for moderation review"""
    __tablename__ = "moderation_queue"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    content_type = Column(String(50))  # message, post, showcase, comment, etc.
    content_id = Column(UUID(as_uuid=True))
    branch_id = Column(UUID(as_uuid=True), ForeignKey("community_branches.id"))
    reported_by_user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    report_reason = Column(String(100))
    report_description = Column(Text)
    ai_confidence_score = Column(Numeric(3, 1), default=0)
    status = Column(String(20), default="pending", index=True)
    priority = Column(String(20), default="low")
    assigned_to_moderator_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    action_taken = Column(String(50))
    moderator_notes = Column(Text)
    actioned_at = Column(DateTime(timezone=True))
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow, index=True)


class UserViolation(Base):
    """User warnings/suspensions/bans"""
    __tablename__ = "user_violations"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    violation_type = Column(String(50))  # warning, mute, suspend, ban
    duration_days = Column(Integer)  # NULL for permanent
    reason = Column(Text)
    given_by_admin_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    expires_at = Column(DateTime(timezone=True))
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)


class AdminAuditLog(Base):
    """Audit trail of admin actions"""
    __tablename__ = "admin_audit_log"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    admin_user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    action = Column(String(100))
    target_type = Column(String(50))
    target_id = Column(UUID(as_uuid=True))
    details = Column(JSON)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)


# ================== CONNECTIONS & SOCIAL ==================

class Connection(Base):
    """Friendships/connections between users"""
    __tablename__ = "connections"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    requester_user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    recipient_user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    status = Column(String(20), default="pending")  # pending, accepted, blocked, rejected
    requested_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    responded_at = Column(DateTime(timezone=True))


class Follow(Base):
    """Follows/followers"""
    __tablename__ = "follows"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    follower_user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    followed_user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    followed_at = Column(DateTime(timezone=True), default=datetime.utcnow)


class Collaboration(Base):
    """Tracked collaborations between users"""
    __tablename__ = "collaborations"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    initiator_user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    collaborator_user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    lfg_post_id = Column(UUID(as_uuid=True), ForeignKey("lfg_posts.id"))
    status = Column(String(20), default="active")  # active, completed, failed, cancelled
    started_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    completed_at = Column(DateTime(timezone=True))
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)


# ================== PROGRESSION & TRUST ==================

class XPLedger(Base):
    """XP earning ledger"""
    __tablename__ = "xp_ledger"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False, index=True)
    xp_amount = Column(Integer, nullable=False)
    source_type = Column(String(50))  # daily_login, message_reaction, showcase_save, etc.
    source_id = Column(UUID(as_uuid=True))
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow, index=True)


class LevelHistory(Base):
    """User level progression history"""
    __tablename__ = "level_history"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    old_level = Column(String(20))
    new_level = Column(String(20))
    reason = Column(Text)
    changed_at = Column(DateTime(timezone=True), default=datetime.utcnow)


class TrustScoreHistory(Base):
    """Trust score calculation history for analytics"""
    __tablename__ = "trust_score_history"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    verified_skills_score = Column(Numeric(5, 2))
    community_quality_score = Column(Numeric(5, 2))
    reports_penalty = Column(Numeric(5, 2))
    account_age_score = Column(Numeric(5, 2))
    collaboration_score = Column(Numeric(5, 2))
    referral_score = Column(Numeric(5, 2))
    total_trust_score = Column(Numeric(3, 1))
    calculated_at = Column(DateTime(timezone=True), default=datetime.utcnow)


# ================== COMPANY PROFILES ==================

class CompanyProfile(Base):
    """Company/organization profiles"""
    __tablename__ = "company_profiles"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    slug = Column(String(100), unique=True, nullable=False, index=True)
    name = Column(String(255))
    logo_url = Column(Text)
    is_verified = Column(Boolean, default=False)
    company_type = Column(String(50))  # studio, publisher, esports_org, etc.
    company_size = Column(String(50))  # 1_10, 11_50, 51_200, 201_500, 500_plus
    founded_year = Column(Integer)
    hq_location = Column(String(100))
    is_remote_friendly = Column(Boolean, default=False)
    website_url = Column(Text)
    description = Column(Text)
    mission_statement = Column(String(200))
    created_by_user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    updated_at = Column(DateTime(timezone=True), default=datetime.utcnow, onupdate=datetime.utcnow)


class CompanyEmployee(Base):
    """Company employee/team member links"""
    __tablename__ = "company_employees"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    company_id = Column(UUID(as_uuid=True), ForeignKey("company_profiles.id"), nullable=False)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    role_title = Column(String(100))
    is_visible_on_profile = Column(Boolean, default=False)
    linked_at = Column(DateTime(timezone=True), default=datetime.utcnow)


class CompanyTalentPool(Base):
    """Company's saved candidate profiles for hiring"""
    __tablename__ = "company_talent_pool"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    company_id = Column(UUID(as_uuid=True), ForeignKey("company_profiles.id"), nullable=False)
    target_user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    role_tag = Column(String(50))
    pipeline_status = Column(String(50))  # saved, contacted, in_review, interview, offer_sent, hired, rejected
    internal_notes = Column(Text)
    saved_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    updated_at = Column(DateTime(timezone=True), default=datetime.utcnow, onupdate=datetime.utcnow)
