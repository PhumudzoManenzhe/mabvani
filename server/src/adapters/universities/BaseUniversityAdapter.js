/**
 * Base university adapter interface.
 */
class BaseUniversityAdapter {
  async execute() {
    throw new Error("BaseUniversityAdapter.execute must be implemented.");
  }
}

module.exports = BaseUniversityAdapter;
