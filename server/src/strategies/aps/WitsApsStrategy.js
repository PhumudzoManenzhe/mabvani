/**
 * Placeholder APS strategy for WITS.
 */
const BaseApsStrategy = require("./BaseApsStrategy");

class WitsApsStrategy extends BaseApsStrategy {
  calculate() {
    throw new Error("WitsApsStrategy.calculate is not implemented.");
  }
}

module.exports = WitsApsStrategy;
