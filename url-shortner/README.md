# URL Shortener

URL shortener REST API (Express + TypeScript + Prisma MongoDB).

## Overview

Provides:

- Create short codes for long URLs
- Resolve a short code to original URL
- Track click counts
- Basic user auth (register, login, dashboard, update, delete)

## Environment

Required:

- DATABASE_URL (MongoDB connection string)
- JWT_SECRET (token signing secret)
- CORS_ORIGIN (CORS origin URL)
  Optional:
- PORT (default 3000)

## Install & Run

```
bun install
bun run dev
```

## Core Endpoints

Public:

- POST `/user/register`
- POST `/user/login`
- GET `/url/:shortCode`
- PUT `/url/:shortCode/clicks`

Private (Authorization: Bearer <token>):

- GET `/user/dashboard`
- PUT `/user/update`
- DELETE `/user/delete`
- POST `/url/new`
- PUT `/url/update`
- DELETE `/url/delete/:shortCode` (route requires leading `/` in code)

## Auth

Login returns `{ token }`. Supply in `Authorization` header.

## Responses (Typical)

Success: resource JSON or `{ "message": "..." }`
Error: `{ "error": "..." }`

## Notes

- Short codes are 6 chars A-Za-z0-9.
- Increment click count manually via dedicated endpoint.
- Consider adding redirect endpoint later.

## Quick Tasks

- Fix missing leading slash in delete URL route if not yet fixed.
- Add `import "dotenv/config"` at top of `index.ts` for env loading.
- Optionally replace getURL plain string with JSON `{ "original": "<url>" }`.
