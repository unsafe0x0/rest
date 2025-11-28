# User Management

User management REST API (Express + TypeScript + Prisma MongoDB).

## Overview

Provides:

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

Private (Authorization: Bearer <token>):

- GET `/user/dashboard`
- PUT `/user/update`
- DELETE `/user/delete`

## Auth

Login returns `{ token }`. Supply in `Authorization` header.

## Responses (Typical)

Success: resource JSON or `{ "message": "..." }`
Error: `{ "error": "..." }`

## Notes

## Quick Tasks

- Add `import "dotenv/config"` at top of `index.ts` for env loading.
