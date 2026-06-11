/**
 * Contains PostgreSQL queries related to notifications.
 * SQL for notifications must remain inside this repository or migrations.
 */
class NotificationRepository {
  async findPlaceholder() {
    throw new Error("NotificationRepository.findPlaceholder is not implemented.");
  }
}

module.exports = new NotificationRepository();
