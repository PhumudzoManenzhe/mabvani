/**
 * Placeholder APS strategy for UP.
 */
const BaseApsStrategy = require("./BaseApsStrategy");

class UpApsStrategy extends BaseApsStrategy {
  calculate() {
    throw new Error("UpApsStrategy.calculate is not implemented.");
  }
}

module.exports = UpApsStrategy;
