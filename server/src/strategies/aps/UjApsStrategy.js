/**
 * Placeholder APS strategy for UJ.
 */
const BaseApsStrategy = require("./BaseApsStrategy");

class UjApsStrategy extends BaseApsStrategy {
  calculate() {
    throw new Error("UjApsStrategy.calculate is not implemented.");
  }
}

module.exports = UjApsStrategy;
