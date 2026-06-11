/**
 * Factory for selecting university-specific APS strategies.
 */
const WitsApsStrategy = require("../strategies/aps/WitsApsStrategy");
const UjApsStrategy = require("../strategies/aps/UjApsStrategy");
const UpApsStrategy = require("../strategies/aps/UpApsStrategy");

const strategies = {
  wits: WitsApsStrategy,
  uj: UjApsStrategy,
  up: UpApsStrategy,
};

class ApsStrategyFactory {
  create(universityCode) {
    const Strategy = strategies[String(universityCode || "").toLowerCase()];

    if (!Strategy) {
      throw new Error("APS strategy is not available for this university.");
    }

    return new Strategy();
  }
}

module.exports = new ApsStrategyFactory();
