/**
 * Demo adapter placeholder for payment processing.
 */
const BasePaymentAdapter = require("./BasePaymentAdapter");

class DemoPaymentAdapter extends BasePaymentAdapter {
  async execute() {
    throw new Error("DemoPaymentAdapter.execute is not implemented.");
  }
}

module.exports = DemoPaymentAdapter;
