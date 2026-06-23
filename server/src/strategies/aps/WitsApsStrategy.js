/**
 * WitsApsStrategy.js
 * Calculates Admission Point Score based on specific Wits university rules.
 */
class WitsApsStrategy {
  /**
   * Calculates the standard Wits base APS.
   * @param {number} mark - The subject percentage.
   * @returns {number} The base APS.
   */
  getBaseAPS(mark) {
    if (mark >= 90) return 8;
    if (mark >= 80) return 7;
    if (mark >= 70) return 6;
    if (mark >= 60) return 5;
    if (mark >= 50) return 4;
    if (mark >= 40) return 3;
    return 0;
  }

  /**
   * Calculates APS for English and Mathematics, applying the +2 bonus rule.
   * @param {number} mark - The subject percentage.
   * @returns {number} The bonus-adjusted APS.
   */
  getEnglishMathAPS(mark) {
    const baseAps = this.getBaseAPS(mark);
    // Add +2 bonus only if the base APS is 5 (60%) or higher
    return baseAps >= 5 ? baseAps + 2 : baseAps;
  }

  /**
   * Calculates APS for Life Orientation on its unique capped scale.
   * @param {number} mark - The LO percentage.
   * @returns {number} The LO APS.
   */
  getLifeOrientationAPS(mark) {
    if (mark >= 90) return 4;
    if (mark >= 80) return 3;
    if (mark >= 70) return 2;
    if (mark >= 60) return 1;
    return 0;
  }

  /**
   * Main calculation strategy for Wits APS.
   * @param {Array<{name: string, percentage: number}>} subjects - Array of student subjects.
   * @returns {{totalAPS: number, subjectsUsed: Array}} The total score and breakdown.
   */
  calculateWitsAPS(subjects) {
    const validEnglishNames = [
      "english hl",
      "english home language",
      "english fal",
      "english first additional language"
    ];

    // 1. Validate mandatory subjects
    const hasEnglish = subjects.some(sub => 
      validEnglishNames.includes(sub.name.toLowerCase().trim())
    );
    if (!hasEnglish) {
      throw new Error("A valid English subject is required to calculate Wits APS.");
    }

    const hasLifeOrientation = subjects.some(
      sub => sub.name.toLowerCase().trim() === "life orientation"
    );
    if (!hasLifeOrientation) {
      throw new Error("Life Orientation is required to calculate Wits APS.");
    }

    // 2. Map subjects with their calculated APS
    const subjectsWithAPS = subjects.map(sub => {
      const nameLower = sub.name.toLowerCase().trim();
      let aps = 0;

      if (nameLower === "life orientation") {
        aps = this.getLifeOrientationAPS(sub.percentage);
      } else if (validEnglishNames.includes(nameLower) || nameLower === "mathematics") {
        aps = this.getEnglishMathAPS(sub.percentage);
      } else {
        aps = this.getBaseAPS(sub.percentage);
      }

      return {
        name: sub.name,
        percentage: sub.percentage,
        aps: aps
      };
    });

    // 3. Separate LO from the rest of the subjects
    const lifeOrientation = subjectsWithAPS.find(
      sub => sub.name.toLowerCase().trim() === "life orientation"
    );
    const nonLOSubjects = subjectsWithAPS.filter(
      sub => sub.name.toLowerCase().trim() !== "life orientation"
    );

    // 4. Sort non-LO subjects by APS (highest to lowest)
    // If APS is tied, optionally sort by percentage as a tie-breaker
    nonLOSubjects.sort((a, b) => b.aps - a.aps || b.percentage - a.percentage);

    // 5. Select the six highest non-LO subjects
    const top6NonLO = nonLOSubjects.slice(0, 6);

    // 6. Combine top 6 subjects + LO
    const subjectsUsed = [...top6NonLO, lifeOrientation];

    // 7. Calculate total APS
    const totalAPS = subjectsUsed.reduce((sum, sub) => sum + sub.aps, 0);

    return {
      totalAPS,
      subjectsUsed
    };
  }
}

export default WitsApsStrategy;