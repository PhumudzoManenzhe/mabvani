# Deployment

```text
GitHub repository
   |-- client deployed to Vercel
   |-- server deployed to Render

Supabase Auth handles authentication
Render PostgreSQL stores application data
Cloudinary stores uploaded files
```

## Vercel Frontend

- Root Directory: `client`
- Framework Preset: `Other`
- Build Command: empty
- Output Directory: empty/default

Frontend environment values:

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `API_BASE_URL` pointing to the Render Web Service

Do not place server-only secrets in Vercel.

## Render Web Service

- Root Directory: `server`
- Build Command: `npm install`
- Start Command: `npm start`
- Health Check Path: `/api/health`

Render environment values:

- `NODE_ENV=production`
- `CLIENT_URL`
- `DATABASE_URL`
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `STORAGE_PROVIDER=cloudinary`

## Render PostgreSQL

Create the PostgreSQL database manually in Render. Copy the internal connection string into the Render Web Service as `DATABASE_URL`.

## Cloudinary

Create a Cloudinary account and add the cloud name, API key, and API secret to Render only.
