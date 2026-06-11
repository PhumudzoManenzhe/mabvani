/**
 * Contains PostgreSQL queries related to applications.
 * SQL for applications must remain inside this repository or migrations.
 */
class ApplicationRepository {
  async findPlaceholder() {
    throw new Error("ApplicationRepository.findPlaceholder is not implemented.");
  }
}

module.exports = new ApplicationRepository();
