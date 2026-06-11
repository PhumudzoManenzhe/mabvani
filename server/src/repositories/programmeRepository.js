/**
 * Contains PostgreSQL queries related to programmes.
 * SQL for programmes must remain inside this repository or migrations.
 */
class ProgrammeRepository {
  async findPlaceholder() {
    throw new Error("ProgrammeRepository.findPlaceholder is not implemented.");
  }
}

module.exports = new ProgrammeRepository();
