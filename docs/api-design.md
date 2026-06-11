# API Design

The API is a REST API served by Express on Render.

Current implemented endpoint:

```http
GET /api/health
```

Feature routes are mounted as placeholders and return HTTP 501 until their services, repositories, validators, and controllers are implemented.

Routes should stay thin. Controllers should translate HTTP requests and responses. Services should hold business rules. Repositories should hold parameterised PostgreSQL queries.
