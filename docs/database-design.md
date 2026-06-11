# Database Design

Render PostgreSQL stores application data. Supabase stores authentication identities. The `supabase_user_id` field connects Render application records to Supabase Auth users.

Passwords are not copied into Render PostgreSQL. SQL must only appear in repository modules and migration files.

Likely future tables:

```text
users
student_profiles
student_addresses
guardians
schools
student_results
student_documents
universities
programmes
admission_requirements
carts
cart_items
quotes
payments
applications
application_choices
application_status_history
notifications
audit_logs
```

The future `users` table should include fields such as `id`, `supabase_user_id`, `email`, `role`, `status`, `created_at`, and `updated_at`. It must not contain passwords.
