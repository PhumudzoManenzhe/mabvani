/**
 * Verifies Supabase Auth access tokens from Authorization Bearer headers.
 */
const { supabase } = require("../config/supabase");
const ApiError = require("../utils/ApiError");

const getBearerToken = (authorizationHeader = "") => {
  const [scheme, token] = authorizationHeader.split(" ");
  return scheme === "Bearer" && token ? token : null;
};

const authenticateSupabaseUser = async (request, response, next) => {
  try {
    const token = getBearerToken(request.headers.authorization);

    if (!token) {
      throw new ApiError(401, "Missing Supabase access token.");
    }

    if (!supabase) {
      throw new ApiError(503, "Supabase server configuration is missing.");
    }

    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data?.user) {
      throw new ApiError(401, "Invalid Supabase access token.");
    }

    request.user = data.user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authenticateSupabaseUser;
