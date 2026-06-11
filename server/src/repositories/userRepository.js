/**
 * Contains PostgreSQL queries related to application users.
 * SQL for application users must remain inside this repository or migrations.
 */
class UserRepository {
  async findPlaceholder() {
    throw new Error("UserRepository.findPlaceholder is not implemented.");
  }
}

module.exports = new UserRepository();
