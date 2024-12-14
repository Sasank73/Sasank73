import { defineConfig } from 'cypress'
import browserify from '@cypress/browserify-preprocessor'
import { verifyDownloadTasks } from 'cy-verify-downloads';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  retries: 1,
  defaultCommandTimeout: 90000,
  pageLoadTimeout: 120000,
  requestTimeout: 150000,
  responseTimeout: 150000,
  viewportWidth: 1920,
  viewportHeight: 1080,
  watchForFileChanges: true,
  experimentalMemoryManagement: true,
  numTestsKeptInMemory: 0,
  experimentalWebKitSupport: true,
  experimentalInteractiveRunEvents: true,
  video: false,
  videoCompression: false,
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/results',
    overwrite: false,
    html: false,
    json: true,
    screenshotOnRunFailure: true,
    embeddedScreenshots: true,
  },
  hosts: {
    '*.localhost': '127.0.0.1',
  },
  projectId: 'orhqoo',
  e2e: {
    setupNodeEvents(on, config) {
      on('task', verifyDownloadTasks);
      on('task', {
        isFileDownloaded(pattern) {
          const downloadsFolder = path.resolve(__dirname, 'cypress', 'downloads');
          if (!fs.existsSync(downloadsFolder)) {
            fs.mkdirSync(downloadsFolder, { recursive: true });
          }
          const files = fs.readdirSync(downloadsFolder);
          const fileExists = files.some(file => file.startsWith(pattern) && file.endsWith('.pdf'));
          return fileExists;
        }
      });
      on(
        'file:preprocessor',
        browserify({
          typescript: require.resolve('typescript'),
        }),
      )
      return config
    },
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    excludeSpecPattern: ['cypress/e2e/surveyForms/*'],
    experimentalOriginDependencies: true,
  },
})
