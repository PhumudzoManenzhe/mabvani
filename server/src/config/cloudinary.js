/**
 * Cloudinary SDK configuration for the initial storage provider.
 * Upload workflows will call Cloudinary through the storage adapter.
 */
const cloudinary = require("cloudinary").v2;
const { env } = require("./environment");

const isCloudinaryConfigured = Boolean(
  env.cloudinaryCloudName && env.cloudinaryApiKey && env.cloudinaryApiSecret
);

if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: env.cloudinaryCloudName,
    api_key: env.cloudinaryApiKey,
    api_secret: env.cloudinaryApiSecret,
    secure: true,
  });
}

module.exports = {
  cloudinary,
  isCloudinaryConfigured,
};
