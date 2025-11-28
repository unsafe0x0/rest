# Notifications

Notifications REST API (TypeScript + Prisma MongoDB) using NodeJS.

## Overview

Provides:

- Create notifications
- Emit notifications via socket (real-time updates)

## Environment

Required:

- DATABASE_URL (MongoDB connection string)
- CORS_ORIGIN (CORS origin URL)

Optional:

- PORT (default 3000)

## Install & Run

```
bun install
bun run dev
```

## Core Endpoints

- POST `/notification/new`
