const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://qc-community.com/WABP_QC3.0/AdminTool",

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },

    downloadsFolder: "cypress/Downloads/",
    experimentalSessionAndOrigin: true,

    retries: { 
      runMode: 1,  // retry failed tests 3 times in "cypress run"""
      openMode: 1  // no retries in "cypress open"
    }
  },
});