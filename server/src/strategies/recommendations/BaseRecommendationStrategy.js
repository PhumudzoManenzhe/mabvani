/**
 * Base interface for future programme recommendation strategies.
 */
class BaseRecommendationStrategy {
  recommend() {
    throw new Error("BaseRecommendationStrategy.recommend must be implemented.");
  }
}

module.exports = BaseRecommendationStrategy;
