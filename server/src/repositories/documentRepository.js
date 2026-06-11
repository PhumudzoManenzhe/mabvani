/**
 * Contains PostgreSQL queries related to document metadata.
 * SQL for document metadata must remain inside this repository or migrations.
 */
class DocumentRepository {
  async findPlaceholder() {
    throw new Error("DocumentRepository.findPlaceholder is not implemented.");
  }
}

module.exports = new DocumentRepository();
