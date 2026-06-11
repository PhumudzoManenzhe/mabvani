/**
 * Base email adapter interface.
 */
class BaseEmailAdapter {
  async execute() {
    throw new Error("BaseEmailAdapter.execute must be implemented.");
  }
}

module.exports = BaseEmailAdapter;
