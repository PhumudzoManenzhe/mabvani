/**
 * Factory for future university data integrations.
 */
const DemoUniversityAdapter = require("../adapters/universities/DemoUniversityAdapter");

class UniversityAdapterFactory {
  create() {
    return new DemoUniversityAdapter();
  }
}

module.exports = new UniversityAdapterFactory();
