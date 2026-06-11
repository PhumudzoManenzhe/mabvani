/**
 * Factory placeholder for creating future notification payloads.
 */
class NotificationFactory {
  create(type, payload = {}) {
    return {
      type,
      payload,
      status: "placeholder",
    };
  }
}

module.exports = new NotificationFactory();
