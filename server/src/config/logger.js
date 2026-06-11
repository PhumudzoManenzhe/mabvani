/**
 * Minimal logger facade so structured logging can be added later.
 */
module.exports = {
  info: (...args) => console.info(...args),
  warn: (...args) => console.warn(...args),
  error: (...args) => console.error(...args),
};
