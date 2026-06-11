# AGENTS.md

Future coding agents working on UniApply SA must follow these rules:

- Use semantic HTML.
- Use plain CSS.
- Use vanilla frontend JavaScript.
- Use browser ES modules.
- Use Supabase only for authentication.
- Use Render PostgreSQL for application data.
- Never store passwords in Render PostgreSQL.
- Never expose the Supabase service-role key.
- Never expose Cloudinary API secrets.
- Send Supabase access tokens to the backend with the Authorization Bearer header.
- Verify authentication in backend middleware.
- Keep routes thin.
- Keep controllers small.
- Put business rules in services.
- Put PostgreSQL queries in repositories.
- Use parameterised SQL.
- Use the storage adapter instead of calling Cloudinary directly.
- Preserve compatibility with a future AWS S3 migration.
- Avoid inline CSS and JavaScript.
- Avoid duplicate code.
- Add tests when features are implemented.
- Update documentation when architecture changes.
