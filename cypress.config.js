const { defineConfig } = require("cypress")
module.exports = defineConfig({
  e2e: {
    baseUrl: "http://sdetchallenge.fetch.com/",
    viewportHeight: 1080,
    viewportWidth: 1920,
    watchForFileChanges: false,

    setupNodeEvents(on, config) {
      return config;
    },
  },
});