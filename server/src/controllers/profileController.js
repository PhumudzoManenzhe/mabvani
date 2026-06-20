/**
 * Handles REST requests for the profile feature.
 */
const profileService = require("../services/profileService");
const { validateProfileRequest } = require("../validators/profileValidator");

const getProfile = async (request, response, next) => {
  try {
    const profile = await profileService.getProfileByUserId(request.user.id);

    response.json({
      success: true,
      data: profile,
    });
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (request, response, next) => {
  try {
    const validation = validateProfileRequest(request.body);

    if (!validation.valid) {
      response.status(400).json({
        success: false,
        message: validation.error,
      });
      return;
    }

    const profile = await profileService.updateProfileByUserId(
      request.user.id,
      request.body
    );

    response.json({
      success: true,
      data: profile,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProfile,
  updateProfile,
};
