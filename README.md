# UniApply SA

UniApply SA is a planned web application for South African matric students who need one place to manage university applications.

This repository currently contains only the project foundation. It prepares the folders, starter files, configuration, documentation, and deployment shape for future development.

## Main Users

- Matric students applying to South African universities.
- Administrators who will later process applications and monitor statuses.

## Planned Features

- Student profiles and academic records.
- Supporting document uploads.
- University and programme browsing.
- University-specific APS calculations.
- Programme recommendations.
- Application selection cart.
- Fees, payments, tracking, and notifications.
- Admin processing tools.

## Technology Stack

- Frontend: semantic HTML5, plain CSS3, vanilla JavaScript, browser ES modules, Fetch API, Supabase JavaScript client, Vercel.
- Backend: Node.js, Express.js, CommonJS, REST API, Render Web Service.
- Authentication: Supabase Auth only.
- Database: Render PostgreSQL through the pg package.
- File storage: Cloudinary initially, with an adapter path for future AWS S3.

## Authentication Approach

The frontend authenticates users with Supabase Auth and sends the Supabase access token to the Render API:

```http
Authorization: Bearer <supabase-access-token>
```

The backend verifies that token with Supabase before protected endpoints are allowed. UniApply SA must not create custom passwords, custom JWTs, bcrypt password hashes, or password tables.

## Database Approach

Render PostgreSQL stores application data. Supabase stores authentication identities. Application records will link to Supabase users through `supabase_user_id UUID UNIQUE NOT NULL`. SQL belongs in repository modules and migration files.

## File-Storage Approach

The application will depend on a storage adapter interface. Cloudinary is the initial provider and AWS S3 is reserved as a future provider.

## Architecture

```text
Vercel frontend
HTML + CSS + browser JavaScript
    ->
Supabase Auth
Registration, login and access tokens
    ->
Render REST API
Express routes and controllers
    ->
Service layer
Business rules
    ->
Repository layer
PostgreSQL queries
    ->
Render PostgreSQL
Application data
```

## Repository Structure

```text
client/       Static frontend pages, CSS, browser JavaScript, and Vercel config
server/       Express REST API, middleware, services, repositories, tests
database/     SQL schema, seed, migrations, and seed folders
docs/         Architecture, auth, database, API, deployment, and roadmap docs
scripts/      Local utility scripts for syntax checks and static serving
render.yaml   Render Web Service starter configuration
```

## Installation

```bash
cd uniapply-sa/server
npm install
```

## Environment Setup

Copy `.env.example` to `.env` for local backend development and fill in real values. Never commit `.env`.

## Development Commands

```bash
npm run dev
npm run dev:client
npm run check:syntax
npm test
```

The API runs on `http://localhost:3000`. The static frontend helper serves `client/` on `http://localhost:5500`.

## Deployment Overview

- GitHub stores the source code.
- Vercel deploys `client/` as a static frontend.
- Render deploys `server/` as a Node Web Service.
- Render PostgreSQL stores application data.
- Supabase Auth handles registration, login, sessions, and access tokens.
- Cloudinary stores uploaded files at first.

## Current Project Status

Foundation only. The project starts, exposes `GET /api/health`, and includes placeholders for future feature work.

## Recommended Next Feature

Implement Supabase authentication screens and user synchronisation with Render PostgreSQL.
