# Architecture

UniApply SA uses a static frontend, Supabase Auth, a Render-hosted REST API, and Render PostgreSQL.

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

The project is prepared for MVC, services, repositories, strategies, factories, adapters, observers, and middleware. Feature implementation is intentionally deferred.
