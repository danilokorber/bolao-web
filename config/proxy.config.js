const AGENT = require("agentkeepalive").HttpsAgent;
const DEFAULT_TARGET = "https://localhost:8080";
const PROXY_CONFIG = {
  "/api/*": {
    target: $REST_API_URL || DEFAULT_TARGET,
    secure: false,
    changeOrigin: true,
    logLevel: "debug",
    agent: new AGENT({
      maxSockets: 100,
      keepAlive: true,
      maxFreeSockets: 10,
      keepAliveMsecs: 100_000,
      timeout: 6_000_000,
      freeSocketTimeout: 90_000,
    }),
  },
  "/q/*": {
    target: $REST_API_URL || DEFAULT_TARGET,
    secure: false,
    changeOrigin: false,
    logLevel: "debug",
    agent: new AGENT({
      maxSockets: 100,
      keepAlive: true,
      maxFreeSockets: 10,
      keepAliveMsecs: 100_000,
      timeout: 6_000_000,
      freeSocketTimeout: 90_000,
    }),
  },
};

module.exports = PROXY_CONFIG;
