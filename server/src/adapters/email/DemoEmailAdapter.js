/**
 * Demo adapter placeholder for email delivery.
 */
const BaseEmailAdapter = require("./BaseEmailAdapter");

class DemoEmailAdapter extends BaseEmailAdapter {
  async execute() {
    throw new Error("DemoEmailAdapter.execute is not implemented.");
  }
}

module.exports = DemoEmailAdapter;
