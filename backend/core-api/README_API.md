# GzoneSphere Phase 2 API Documentation

**Base URL**: `http://localhost:8000`  
**API Version**: 2.0.0  
**Phase**: Phase 2 - Profiles, Community, Admin, Progression

## Quick Start

### 1. Start the API
```bash
cd backend/core-api
pip install -r requirements.txt
python -m uvicorn main:app --reload
```

### 2. Access API Documentation
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

### 3. Create .env file
Copy `.env.example` to `.env` and update with your PostgreSQL credentials.

---

## Authentication

All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer {access_token}
```

### Login Flow
```bash
# 1. Sign up
curl -X POST http://localhost:8000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "username": "testuser", "password": "securepassword123"}'

# Response: { "access_token": "...", "user_id": "...", ... }

# 2. Use token for subsequent requests
curl -X GET http://localhost:8000/profiles/me \
  -H "Authorization: Bearer {access_token}"
```

---

## API Endpoints by Category

### Auth Routes (`/auth`)

| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| POST | `/auth/signup` | ❌ | Register new user |
| POST | `/auth/login` | ❌ | Login and get token |
| POST | `/auth/refresh` | ✅ | Refresh access token |
| GET | `/auth/me` | ✅ | Get current user info |

**Example - Signup**:
```bash
curl -X POST http://localhost:8000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "username": "gamedev123",
    "password": "SecurePassword123!"
  }'
```

---

### Profile Routes (`/profiles`)

| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| GET | `/profiles/me` | ✅ | Get my master profile |
| GET | `/profiles/public/{username}` | ❌ | Get public profile |
| PATCH | `/profiles/me` | ✅ | Update my master profile |
| POST | `/profiles/sub` | ✅ | Create sub-profile (domain-specific) |
| GET | `/profiles/sub/{domain}` | ✅ | Get my sub-profile for domain (dev, esports, etc.) |
| PATCH | `/profiles/sub/{domain}` | ✅ | Update my sub-profile |
| POST | `/profiles/sub/{domain}/skills` | ✅ | Add skill to sub-profile |
| GET | `/profiles/sub/{domain}/skills` | ✅ | Get skills for sub-profile |

**Example - Create Sub-Profile**:
```bash
curl -X POST http://localhost:8000/profiles/sub \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
    "domain": "dev",
    "username": "gamedev_pro",
    "primary_role": "Game Designer",
    "headline": "Indie game designer specializing in narrative-driven RPGs",
    "experience_level": "Advanced"
  }'
```

---

### Community Routes (`/community`)

| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| GET | `/community/branches` | ❌ | List all branches |
| GET | `/community/branches/{slug}` | ❌ | Get branch details |
| GET | `/community/branches/{slug}/channels` | ❌ | List branch channels |
| POST | `/community/channels/{id}/messages` | ✅ | Post message to channel |
| GET | `/community/channels/{id}/messages` | ❌ | Get channel messages |
| POST | `/community/branches/{slug}/lfg` | ✅ | Create LFG post |
| GET | `/community/branches/{slug}/lfg` | ❌ | Get LFG posts |
| POST | `/community/branches/{slug}/showcase` | ✅ | Create showcase post |
| GET | `/community/branches/{slug}/showcase` | ❌ | Get showcase posts |
| POST | `/community/branches/{slug}/events` | ✅ | Create event |
| GET | `/community/branches/{slug}/events` | ❌ | Get events |
| POST | `/community/events/{id}/rsvp` | ✅ | RSVP to event |

**Example - Post Message to Channel**:
```bash
curl -X POST http://localhost:8000/community/channels/general-dev/messages \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Just finished implementing networked gameplay for my indie game!",
    "media_urls": ["https://example.com/screenshot.png"]
  }'
```

**Example - Create LFG Post**:
```bash
curl -X POST http://localhost:8000/community/branches/dev/lfg \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
    "goal_type": "find_collaborators",
    "description": "Looking for UI/UX designer for indie RPG project. 6-month commitment.",
    "availability_window": "ongoing",
    "timezone": "UTC",
    "contact_preference": "dm"
  }'
```

---

### Admin Routes (`/admin`)

| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| GET | `/admin/users` | ✅ Admin | List all users |
| GET | `/admin/users/{id}` | ✅ Admin | Get user details |
| POST | `/admin/users/{id}/suspend` | ✅ Admin | Suspend user |
| POST | `/admin/users/{id}/ban` | ✅ Super | Ban user permanently |
| GET | `/admin/verifications` | ✅ Admin | List verification queue |
| POST | `/admin/verifications/{id}/{action}` | ✅ Admin | Review skill verification |
| GET | `/admin/moderation` | ✅ Admin | List moderation queue |
| POST | `/admin/moderation/{id}/{action}` | ✅ Admin | Take moderation action |
| GET | `/admin/companies` | ✅ Admin | List companies |
| POST | `/admin/companies/{id}/verify` | ✅ Super | Verify company |

**Example - List Users**:
```bash
curl -X GET "http://localhost:8000/admin/users?platform_level=Hustler&trust_score_min=5.0" \
  -H "Authorization: Bearer {admin_token}"
```

**Example - Approve Skill Verification**:
```bash
curl -X POST http://localhost:8000/admin/verifications/verification-id/approve \
  -H "Authorization: Bearer {admin_token}" \
  -H "Content-Type: application/json" \
  -d '{
    "reviewer_notes": "GitHub repo shows solid C++ game development experience"
  }'
```

---

### Progression Routes (`/progression`)

| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| GET | `/progression/user/stats` | ✅ | Get my XP, level, trust score |
| POST | `/progression/award-xp` | ❌ | Award XP (internal) |
| GET | `/progression/user/trust-score` | ✅ | Get detailed trust score breakdown |
| POST | `/progression/recalculate-trust-scores` | ❌ | Recalculate all trust scores |

**Example - Get My Stats**:
```bash
curl -X GET http://localhost:8000/progression/user/stats \
  -H "Authorization: Bearer {token}"
```

---

## API Response Format

All responses follow this structure:

```json
{
  "success": true,
  "message": "Description of result",
  "data": {
    "key": "value"
  },
  "errors": null
}
```

**Error Response**:
```json
{
  "success": false,
  "message": "Error description",
  "errors": ["Specific error 1", "Specific error 2"]
}
```

---

## Data Models

### Platform Levels
- `Beginner` (default)
- `Hustler` (1000 XP + 20 consecutive active days)
- `Extreme` (5000 XP + 37 consecutive active days)
- `Pro` (20000 XP + tournament win)

### Sub-Profile Domains
- `dev` - Game Development
- `esports` - Esports & Competition
- `content` - Content & Streaming
- `business` - Business & Strategy
- `art` - Game Art & Design
- `writing` - Writing & Narrative
- `audio` - Audio & Sound Design

### Community Branches
- `/community/dev` - Game developers
- `/community/esports` - Competitive players
- `/community/content` - Streamers & creators
- `/community/business` - Producers & managers
- `/community/art` - Artists
- `/community/writing` - Writers
- `/community/audio` - Audio specialists
- `/community/general` - Cross-domain discussion
- `/community/newcomers` - Onboarding hub

### Trust Score Components (1.0 - 10.0)
- 30% - Verified skills
- 25% - Community contributions (likes, comments, answers)
- 15% - Reports/violations (negative)
- 10% - Account age
- 15% - Collaboration completion rate
- 10% - Referral quality

---

## Testing the API

### Using Postman
1. Import OpenAPI schema: `http://localhost:8000/openapi.json`
2. Create environment variables:
   - `base_url` = `http://localhost:8000`
   - `token` = (acquired from signup)
3. Run requests from collection

### Using curl/bash
```bash
# 1. Sign up
USER_EMAIL="test@example.com"
USER_PASS="TestPass123!"

TOKEN=$(curl -s -X POST http://localhost:8000/auth/signup \
  -H "Content-Type: application/json" \
  -d "{\"email\": \"$USER_EMAIL\", \"username\": \"testuser\", \"password\": \"$USER_PASS\"}" \
  | jq -r '.data.access_token')

# 2. Get my profile
curl -X GET http://localhost:8000/profiles/me \
  -H "Authorization: Bearer $TOKEN"

# 3. Create dev sub-profile
curl -X POST http://localhost:8000/profiles/sub \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"domain": "dev", "username": "mydevname", "primary_role": "Game Developer"}'
```

---

## Setup Checklist

- [ ] Install Python 3.10+
- [ ] Create PostgreSQL database named `gzonesphere`
- [ ] Copy `.env.example` to `.env` and configure
- [ ] Install dependencies: `pip install -r requirements.txt`
- [ ] Run database migrations (SQL schema file)
- [ ] Start API: `python -m uvicorn main:app --reload`
- [ ] Verify Swagger UI: http://localhost:8000/docs
- [ ] Create 9 default community branches
- [ ] Populate skills taxonomy
- [ ] Test signup → profile creation → skill addition flow

---

## Performance Notes

- All list endpoints paginated (default limit: 50)
- Database indexed on frequently queried fields
- Trust score calculation batched (background job recommended)
- WebSocket support (coming Phase 2E) for real-time chat

---

## Links

- **Backend Documentation**: See `backend/core-api/README.md`
- **Frontend Integration**: See `src/services/api/core.js`
- **Database Schema**: `backend/sql/GzoneSphere_Phase2_Schema.sql`
- **Models Documentation**: `backend/core-api/models.py`
