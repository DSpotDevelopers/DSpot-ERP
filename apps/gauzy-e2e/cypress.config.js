const { defineConfig } = require('cypress');

module.exports = defineConfig({
    projectId: "2n3iur",
    fileServerFolder: ".",
    fixturesFolder: "./src/fixtures",
    downloadsFolder: "../../dist/cypress/apps/gauzy-e2e/downloads",
    videosFolder: "../../dist/cypress/apps/gauzy-e2e/videos",
    screenshotsFolder: "../../dist/cypress/apps/gauzy-e2e/screenshots",
    video: false,
    chromeWebSecurity: false,
    viewportWidth: 1920,
    viewportHeight: 1080,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 15000,
    taskTimeout: 10000,
    requestTimeout: 10000,
    execTimeout: 5000,
    responseTimeout: 20000,
    retries: {
        runMode: 1,
        openMode: 0
    },
    env: {
        coverage: false,
        codeCoverage: {
            url: "http://localhost:3001/__coverage__"
        }
    },
    e2e: {
        // Use environment variable for baseUrl, fallback to localhost for local development
        baseUrl: process.env.WEBAPP_URL || "http://localhost:4200",
        specPattern: "./src/e2e/**/*.{ts,tsx}",
        supportFile: "./src/support/index.ts",
        setupNodeEvents(on, config) {
            // Update baseUrl from environment variable if present
            if (process.env.WEBAPP_URL) {
                config.baseUrl = process.env.WEBAPP_URL;
            }
            return require('./src/plugins/index')(on, config);
        }
    }
});
