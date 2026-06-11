/**
 * Base interface for university-specific APS calculation strategies.
 */
class BaseApsStrategy {
  calculate() {
    throw new Error("BaseApsStrategy.calculate must be implemented.");
  }
}

module.exports = BaseApsStrategy;
