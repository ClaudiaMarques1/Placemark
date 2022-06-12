import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        log(message) {
          console.log(message);
          return null;
        }
      });
      return config;
    },
    env: {
      email: "bart@simpson.com"
      //password: "bartssecret"
    },
    baseUrl: 'http://localhost:3000',
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/e2e.js",
    viewportHeight: 960,
    viewportWidth: 1536,
    excludeSpecPattern: ["**/__snapshots__/*", "**/__image_snapshots__/*"],
    responseTimeout: 1000000,
    defaultCommandTimeout: 1000000,
  },
});
