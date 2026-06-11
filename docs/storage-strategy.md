# Storage Strategy

Uploaded files will go through a storage adapter interface.

```text
StorageAdapter
      ->
CloudinaryStorageAdapter initially
      ->
S3StorageAdapter later
```

Application code should depend on `BaseStorageAdapter` and the `StorageAdapterFactory`, not Cloudinary directly.

Render PostgreSQL will store file metadata and provider identifiers. It will not store raw file contents.
