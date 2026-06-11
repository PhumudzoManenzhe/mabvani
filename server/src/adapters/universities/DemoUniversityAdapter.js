/**
 * Demo adapter placeholder for university data.
 */
const BaseUniversityAdapter = require("./BaseUniversityAdapter");

class DemoUniversityAdapter extends BaseUniversityAdapter {
  async execute() {
    throw new Error("DemoUniversityAdapter.execute is not implemented.");
  }
}

module.exports = DemoUniversityAdapter;
