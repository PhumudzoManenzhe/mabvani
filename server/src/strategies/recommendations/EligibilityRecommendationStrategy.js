/**
 * Placeholder recommendation strategy based on eligibility.
 */
const BaseRecommendationStrategy = require("./BaseRecommendationStrategy");

class EligibilityRecommendationStrategy extends BaseRecommendationStrategy {
  recommend() {
    throw new Error("EligibilityRecommendationStrategy.recommend is not implemented.");
  }
}

module.exports = EligibilityRecommendationStrategy;
