/**
 * Future AWS S3 storage adapter placeholder.
 */
const BaseStorageAdapter = require("./BaseStorageAdapter");

class S3StorageAdapter extends BaseStorageAdapter {
  async upload() {
    throw new Error("S3StorageAdapter.upload is not implemented.");
  }

  async remove() {
    throw new Error("S3StorageAdapter.remove is not implemented.");
  }

  async getSecureUrl() {
    throw new Error("S3StorageAdapter.getSecureUrl is not implemented.");
  }
}

module.exports = S3StorageAdapter;
