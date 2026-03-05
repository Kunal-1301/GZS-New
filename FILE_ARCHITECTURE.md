# Frontend File Architecture & Backend Integration Guide

This document is intended for backend developers (FastAPI & Golang) to understand how the React frontend is structured to consume their APIs.

## 1. Directory Overview for API Integration

The core logic for networking and state management will be isolated in specific directories to maintain a clean separation of concerns.

```bash
src/
├── services/               # [NEW] All Network layer logic
│   ├── api/
│   │   ├── core.js         # Axios instance for Python FastAPI (Users, Auth, Profiles)
│   │   └── cms.js          # Axios instance for Golang (Admin, Content, Blogs)
│   └── mutators/           # [NEW] React Query Hook definitions
│       ├── useAuth.js
│       ├── useProfiles.js
│       └── useGamePosts.js
├── context/
│   └── ProfileContext.jsx  # Global state holding the active User Identity & SubProfiles
├── config/                 # [NEW] Environment variable validation (Zod schema)
│   └── env.js
└── utils/
    └── errorHandler.js     # Unified error parser for Axios interceptors
```

## 2. The API Splicing Strategy

Because we rely on two different backends, the frontend uses two dedicated HTTP clients.

### A. Core Client (FastAPI)
- **Target:** `VITE_FASTAPI_BASE_URL` (e.g., `https://api.gzonesphere.com/core/v1`)
- **Responsibilities:**
  - `/auth/login`, `/auth/signup`, `/auth/verify`
  - `/users/*` (Master Account Data)
  - `/profiles/*` (Esports, Art Visual, etc.)
  - `/matchmaking` or `/community-network`

### B. CMS Client (Golang)
- **Target:** `VITE_GOLANG_CMS_BASE_URL` (e.g., `https://api.gzonesphere.com/cms/v1`)
- **Responsibilities:**
  - Super Admin analytics and metric aggregations.
  - SubAdmin content approvals (Blogs, Games).
  - `/dictionary/*` (Genres, tags, platform lists).

## 3. The Authentication Handshake

1. User logs in via a React component sending credentials to FastAPI.
2. FastAPI validates and returns a short-lived `access_token` (JWT) and a `refresh_token` (HttpOnly Cookie ideally).
3. The frontend stores the `access_token` in memory or a secure LocalStorage wrapper.
4. **Interceptors:** Both `core.js` and `cms.js` Axios instances have request interceptors that attach:
   `Authorization: Bearer <access_token>`
5. **Golang Role:** When a request hits the Golang CMS, Golang *does not* check the database for the user. It simply verifies the JWT signature (using a shared secret or public key from FastAPI) and reads the embedded `role` (e.g., `role: "SuperAdmin"`) to authorize the action.

## 4. AI Endpoint Preparedness

For the upcoming AI integrations:
- Streaming text endpoints should utilize Server-Sent Events (SSE). The frontend will consume these via `EventSource` or specialized stream readers, rather than standard Axios Promises.
- Ensure CORS policies on the FastAPI server explicitly allow SSE connections from the frontend domain.

## 5. Mock Data Deprecation

Currently, the app uses `src/public/services/mockApiService.js`. 
As backend endpoints become available, we will swap out the `mockApiService` calls for the actual React Query hooks (`useQuery`, `useMutation`) defined in `src/services/mutators/`. The shape of the JSON returned by the backend *must* perfectly match the interfaces expected by the frontend components.
