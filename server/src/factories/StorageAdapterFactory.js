/**
 * Factory for selecting the active storage adapter.
 */
const { env } = require("../config/environment");
const CloudinaryStorageAdapter = require("../adapters/storage/CloudinaryStorageAdapter");
const S3StorageAdapter = require("../adapters/storage/S3StorageAdapter");

class StorageAdapterFactory {
  create(provider = env.storageProvider) {
    if (provider === "cloudinary") {
      return new CloudinaryStorageAdapter();
    }

    if (provider === "s3") {
      return new S3StorageAdapter();
    }

    throw new Error(`Unsupported storage provider: ${provider}`);
  }
}

module.exports = new StorageAdapterFactory();
