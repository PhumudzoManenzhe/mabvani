/**
 * Contains business rules related to student profiles.
 * Full student profiles functionality will be implemented in a later phase.
 */
const profileRepository = require("../repositories/profileRepository");

class ProfileService {
  async getProfileByUserId(userId) {
    const profile = await profileRepository.findProfileByUserId(userId);

    if (!profile) {
      return null;
    }

    return profile;
  }

  async updateProfileByUserId(userId, profile) {
    const profileCompletionPercentage =
      this.calculateProfileCompletionPercentage(profile);

    await profileRepository.updateProfileByUserId(userId, {
      ...profile,
      profile_completion_percentage: profileCompletionPercentage,
    });

    return profileRepository.findProfileByUserId(userId);
  }

  calculateProfileCompletionPercentage(profile) {
    const fields = [
      "first_name",
      "last_name",
      "email",
      "id_number",
      "date_of_birth",
      "gender",
      "citizenship",
      "home_language",
      "disability_status",
      "address_line1",
      "city",
      "province",
      "postal_code",
    ];

    const completedFields = fields.filter((field) => {
      const value = profile[field];
      return value !== null && value !== undefined && String(value).trim();
    });

    return Math.round((completedFields.length / fields.length) * 100);
  }
}

module.exports = new ProfileService();
