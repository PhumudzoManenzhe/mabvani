# Authentication

Supabase Auth is the only authentication system.

```text
Frontend
    ->
Supabase Auth
    ->
Supabase access token
    ->
Authorization Bearer header
    ->
Render REST API
    ->
Token verification
```

The frontend registers, logs in, logs out, and obtains sessions through Supabase. The frontend sends the Supabase access token to the Render API with:

```http
Authorization: Bearer <supabase-access-token>
```

The backend verifies the token in middleware and attaches the verified Supabase user to `request.user`.

Application roles will be stored in Render PostgreSQL. Roles must never be trusted directly from frontend input.

Do not create custom JWTs, custom password hashing, bcrypt password storage, or a separate password table.
