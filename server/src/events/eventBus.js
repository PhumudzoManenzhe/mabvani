/**
 * Shared event bus for future observer-style workflows.
 */
const EventEmitter = require("events");

module.exports = new EventEmitter();
