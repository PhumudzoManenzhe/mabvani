/**
 * Starts the Express server for local development and Render.
 */
const app = require("./app");
const { env, logMissingConfiguration } = require("./config/environment");
const logger = require("./config/logger");

logMissingConfiguration(logger);

const server = app.listen(env.port, () => {
  const address = server.address();
  const boundPort = typeof address === "object" && address ? address.port : env.port;

  logger.info(`UniApply SA API listening on port ${boundPort}.`);
});

module.exports = server;
