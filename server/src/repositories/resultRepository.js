/**
 * Contains PostgreSQL queries related to academic results.
 * SQL for academic results must remain inside this repository or migrations.
 */
class ResultRepository {
  async findPlaceholder() {
    throw new Error("ResultRepository.findPlaceholder is not implemented.");
  }
}

module.exports = new ResultRepository();
