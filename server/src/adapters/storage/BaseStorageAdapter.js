/**
 * Base storage adapter interface for uploaded assets.
 */
class BaseStorageAdapter {
  async upload() {
    throw new Error("upload() must be implemented.");
  }

  async remove() {
    throw new Error("remove() must be implemented.");
  }

  async getSecureUrl() {
    throw new Error("getSecureUrl() must be implemented.");
  }
}

module.exports = BaseStorageAdapter;
