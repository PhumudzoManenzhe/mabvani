/**
 * Reads environment variables for the Express API.
 * Missing secrets are reported at startup without crashing foundation checks.
 */
require("dotenv").config({ quiet: true });

const parseClientUrls = (value) =>
  (value || "http://localhost:5500")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

const env = Object.freeze({
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT || 3000),
  clientUrls: parseClientUrls(process.env.CLIENT_URL),
  databaseUrl: process.env.DATABASE_URL || "",
  supabaseUrl: process.env.SUPABASE_URL || "",
  supabaseAnonKey: process.env.SUPABASE_ANON_KEY || "",
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || "",
  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME || "",
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY || "",
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET || "",
  storageProvider: process.env.STORAGE_PROVIDER || "cloudinary",
  awsRegion: process.env.AWS_REGION || "",
  awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
  awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  awsS3Bucket: process.env.AWS_S3_BUCKET || "",
  isProduction: process.env.NODE_ENV === "production",
});

const getMissingConfiguration = () => {
  const checks = {
    DATABASE_URL: env.databaseUrl,
    SUPABASE_URL: env.supabaseUrl,
    SUPABASE_SERVICE_ROLE_KEY: env.supabaseServiceRoleKey,
    CLOUDINARY_CLOUD_NAME: env.cloudinaryCloudName,
    CLOUDINARY_API_KEY: env.cloudinaryApiKey,
    CLOUDINARY_API_SECRET: env.cloudinaryApiSecret,
  };

  return Object.entries(checks)
    .filter(([, value]) => !value)
    .map(([key]) => key);
};

const logMissingConfiguration = (logger = console) => {
  const missing = getMissingConfiguration();

  if (missing.length > 0) {
    logger.warn(
      `UniApply SA is running with missing optional startup configuration: ${missing.join(", ")}.`
    );
  }
};

module.exports = {
  env,
  getMissingConfiguration,
  logMissingConfiguration,
};
