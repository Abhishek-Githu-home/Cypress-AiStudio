const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'z2guai',
  e2e: {
   // baseUrl: "https://www.makemytrip.com/",
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 30000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    specPattern: "cypress/e2e/**/*.cy.js",
    supportFile: "cypress/support/e2e.js",
    screenshotOnRunFailure: true,
    experimentalPromptCommand : true,
    screenshotsFolder: "cypress/screenshots",
    videosFolder: "cypress/videos",
    video: true,
    reporter: "mochawesome",
    reporterOptions: {
      reportDir: "mochawesomeReports",
      reportFilename: "mochawesome-[hash]",
      html: true,
      json: true,
      timestamp: "longDate"
    },
    setupNodeEvents(on, config) {
      // Implement node event listeners here if needed
      return config;
    },
  },
});
