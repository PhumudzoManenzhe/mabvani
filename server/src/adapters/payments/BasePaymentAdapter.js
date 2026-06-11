/**
 * Base payment adapter interface.
 */
class BasePaymentAdapter {
  async execute() {
    throw new Error("BasePaymentAdapter.execute must be implemented.");
  }
}

module.exports = BasePaymentAdapter;
