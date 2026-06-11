/**
 * Contains PostgreSQL queries related to universities.
 * SQL for universities must remain inside this repository or migrations.
 */
class UniversityRepository {
  async findPlaceholder() {
    throw new Error("UniversityRepository.findPlaceholder is not implemented.");
  }
}

module.exports = new UniversityRepository();
