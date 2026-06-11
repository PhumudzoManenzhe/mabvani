/**
 * Planned initial storage adapter backed by Cloudinary.
 * Complete upload and deletion behaviour will be implemented later.
 */
const BaseStorageAdapter = require("./BaseStorageAdapter");
const { cloudinary } = require("../../config/cloudinary");

class CloudinaryStorageAdapter extends BaseStorageAdapter {
  constructor(client = cloudinary) {
    super();
    this.client = client;
  }

  async upload() {
    throw new Error("CloudinaryStorageAdapter.upload is not implemented.");
  }

  async remove() {
    throw new Error("CloudinaryStorageAdapter.remove is not implemented.");
  }

  async getSecureUrl() {
    throw new Error("CloudinaryStorageAdapter.getSecureUrl is not implemented.");
  }
}

module.exports = CloudinaryStorageAdapter;
