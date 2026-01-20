# Configuration Guide

## Cypress Configuration (cypress.config.js)

### Base Settings
```javascript
baseUrl: "https://www.makemytrip.com/"
// URL used when cy.visit() called without full URL

viewportWidth: 1280
viewportHeight: 720
// Default browser window size for tests
```

### Timeout Settings
```javascript
defaultCommandTimeout: 10000
// Max wait time for cy commands (ms)

pageLoadTimeout: 30000
// Max wait time for page load

requestTimeout: 10000
// Max wait time for XHR requests

responseTimeout: 10000
// Max wait time for HTTP responses
```

### File Paths
```javascript
specPattern: "cypress/e2e/**/*.{cy.js,feature}"
// Pattern for test files (JS and feature files)

supportFile: "cypress/support/e2e.js"
// Global support file

screenshotOnRunFailure: true
// Capture screenshot when test fails

screenshotsFolder: "cypress/screenshots"
// Where to save screenshots

videosFolder: "cypress/videos"
// Where to save videos

video: true
// Record video for each test run
```

### Reporters Configuration
```javascript
const reporterOptions = {
  reportDir: "mochawesomeReports",
  // Directory for reports
  
  reportFilename: "mochawesome-[hash]",
  // Report file name pattern
  
  html: true,
  // Generate HTML report
  
  json: true,
  // Generate JSON report
  
  timestamp: "longDate"
  // Timestamp format
};
```

---

## Package.json Scripts

### Available Commands

```json
"test": "cypress open"
// Open Cypress GUI - Interactive mode

"test:headless": "cypress run"
// Run all tests without opening browser

"test:cucumber": "cypress run --spec 'cypress/e2e/**/*.feature'"
// Run only Cucumber feature files

"test:report": "cypress run && mochawesome-merge && mochawesome-report-generator"
// Run tests and generate HTML report
```

### Running Specific Tests

```bash
# Run specific test file
npx cypress run --spec "cypress/e2e/AiStudio.cy.js"

# Run with specific browser
npx cypress run --browser chrome

# Run in headed mode (show browser)
npx cypress run --headed

# Run with environment variables
npx cypress run --env baseUrl=https://staging.makemytrip.com

# Run with specific tag
npx cypress run --env grepTags=@smoke

# Parallel execution (requires plugin)
npx cypress run --parallel --record
```

---

## Environment Variables

### Creating .env File

```bash
# .env file (add to .gitignore)
CYPRESS_baseUrl=https://www.makemytrip.com
CYPRESS_username=testuser
CYPRESS_password=testpass123
CYPRESS_API_KEY=your_api_key
```

### Using Environment Variables in Tests

```javascript
// Access in tests
cy.visit(Cypress.env('baseUrl'));
const username = Cypress.env('username');
const password = Cypress.env('password');

// Or via command line
npx cypress run --env username=test,password=pass123
```

---

## Browser Configurations

### Chrome Configuration

```javascript
// cypress.config.js
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // Chrome specific settings
    chromeWebSecurity: false,
    // Disable web security for testing
    
    // Chrome user preferences
    chromePreferences: {
      download_prompt_for_type: 0,
      // No download prompt
    }
  }
});
```

### Firefox Configuration

```javascript
module.exports = defineConfig({
  e2e: {
    // Firefox specific settings
    firefoxGcInterval: {
      runMode: 1,
      openMode: null
    }
  }
});
```

### Edge Configuration

```javascript
// Use similar to Chrome since Edge uses Chromium
module.exports = defineConfig({
  e2e: {
    // Edge inherits Chrome configurations
    chromeWebSecurity: false
  }
});
```

---

## Cucumber Preprocessor Configuration

### .cypress-cucumber-preprocessorrc.json

```json
{
  "stepDefinitions": "cypress/e2e/stepDefinitions/**/*.{js,ts}",
  // Location of step definition files
  
  "features": "cypress/e2e/**/*.feature",
  // Location of feature files
  
  "html": "mochawesomeReports/cucumber-report.html",
  // HTML report output location
  
  "json": "mochawesomeReports/cucumber-report.json"
  // JSON report output location
}
```

---

## Custom Reporter Configuration

### Mochawesome Options

```javascript
// cypress.config.js - setupNodeEvents hook

const reporterOptions = {
  reportDir: "mochawesomeReports",
  // Report directory
  
  reportFilename: "mochawesome-[hash]",
  // File naming pattern
  // [hash] - generates unique hash
  // [datetime] - uses timestamp
  
  html: true,
  // Generate HTML report
  
  json: true,
  // Generate JSON report
  
  overwrite: false,
  // Don't overwrite existing reports
  
  timestamp: "longDate",
  // Timestamp format: longDate, shortDate, isoDate
  
  charts: true,
  // Include charts in HTML report
  
  showPassed: true,
  // Show passed tests in report
  
  showFailed: true,
  // Show failed tests in report
  
  showPending: true,
  // Show pending tests in report
  
  showSkipped: true,
  // Show skipped tests in report
  
  showHooks: true
  // Show hook execution in report
};
```

---

## Retry Configuration

### Enable Test Retries

```javascript
// cypress.config.js
module.exports = defineConfig({
  e2e: {
    retries: {
      runMode: 2,
      // Retry failed tests 2 times in headless mode
      
      openMode: 0
      // No retries in interactive mode
    }
  }
});
```

### Run-specific Retries

```bash
# Run with 3 retries
npx cypress run --retries 3
```

---

## Remote Execution Configuration

### Cypress Cloud Recording

```bash
# Record tests to Cypress Cloud
npx cypress run --record --key <your_key>

# Parallel execution with recording
npx cypress run --record --parallel
```

### Jenkins Integration

```groovy
pipeline {
  stages {
    stage('Test') {
      steps {
        sh 'npm install'
        sh 'npm run test:report'
      }
    }
    
    stage('Report') {
      steps {
        publishHTML([
          reportDir: 'mochawesomeReports',
          reportFiles: 'report.html',
          reportName: 'Cypress Test Report'
        ])
      }
    }
  }
}
```

---

## Performance Tuning

### Optimize Test Execution

```javascript
// cypress.config.js

module.exports = defineConfig({
  e2e: {
    // Reduce default command timeout if stable
    defaultCommandTimeout: 5000,
    
    // Minimize wait times
    waitForUrlTimeout: 5000,
    
    // Disable screenshots for faster runs
    screenshotOnRunFailure: false,
    
    // Disable videos to save disk space
    video: false,
    
    // Parallel execution
    numTestsKeptInMemory: 5
  }
});
```

### Headless Mode Optimization

```bash
# Use headless Chrome for faster execution
npx cypress run --headless --browser chrome
```

---

## Debugging Configuration

### Debug Mode

```javascript
// In test file
it('test with debugging', () => {
  // Set breakpoint
  debugger;
  
  // Step through
  cy.get('[selector]').debug();
  
  // Log values
  cy.log('Message');
});
```

### Enable Detailed Logging

```bash
# Run with debug logging
DEBUG=cypress:* npx cypress run

# Log only specific module
DEBUG=cypress:runner npx cypress run
```

### Browser DevTools

```javascript
// Pause on next click
cy.get('[selector]').click({ log: true }).pause();

// Launch DevTools
cy.pause();
```

---

## Security Configuration

### Handle Sensitive Data

```javascript
// cypress.config.js

module.exports = defineConfig({
  e2e: {
    // Mask sensitive data in screenshots
    setupNodeEvents(on, config) {
      on('after:screenshot', (details) => {
        // Process and mask sensitive info
      });
      return config;
    }
  }
});
```

### Secure Credentials

```javascript
// Use environment variables, not hardcoded
const username = Cypress.env('TEST_USERNAME');
const password = Cypress.env('TEST_PASSWORD');

// Load from .env (not committed to repo)
```

---

## CI/CD Pipeline Configuration

### GitHub Actions Example

```yaml
name: Cypress Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        node-version: [14.x, 16.x]
    
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node
        uses: actions/setup-node@v2
        with:
          node-version: ${{ matrix.node-version }}
      
      - name: Install Dependencies
        run: npm install
      
      - name: Run Tests
        run: npm run test:report
      
      - name: Upload Report
        if: always()
        uses: actions/upload-artifact@v2
        with:
          name: mochawesome-report
          path: mochawesomeReports/
      
      - name: Upload Screenshots
        if: failure()
        uses: actions/upload-artifact@v2
        with:
          name: cypress-screenshots
          path: cypress/screenshots/
```

### GitLab CI Example

```yaml
stages:
  - test

cypress_tests:
  stage: test
  image: cypress/base:latest
  
  script:
    - npm install
    - npm run test:report
  
  artifacts:
    when: always
    paths:
      - mochawesomeReports/
      - cypress/screenshots/
    reports:
      junit: mochawesomeReports/report.json
```

---

## Browser Console Configuration

### Handle Browser Console Errors

```javascript
// cypress/support/e2e.js

cy.on('uncaught:exception', (err, runnable) => {
  // Suppress specific errors
  if (err.message.includes('ResizeObserver')) {
    return false; // Prevents test failure
  }
  // Let other errors fail the test
  throw err;
});
```

---

## Network and API Mocking

### Mock API Responses

```javascript
// In test file
cy.intercept('GET', '/api/trains', {
  statusCode: 200,
  body: {
    trains: [
      { id: 1, name: 'Express', fare: 1000 }
    ]
  }
}).as('getTrains');

cy.visit('/');
cy.wait('@getTrains');
```

### Delay Responses

```javascript
cy.intercept('GET', '/api/**', (req) => {
  req.reply((res) => {
    res.delay(2000); // 2 second delay
  });
});
```

---

## Report Configuration

### Custom Report Title and Metadata

```javascript
// cypress/support/e2e.js

// Set report metadata
window.reportConfig = {
  title: 'Railway Booking E2E Tests',
  environment: 'Production',
  branch: 'main',
  testType: 'End-to-End'
};
```

---

## Useful Configuration Snippets

### Base Configuration Template

```javascript
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.makemytrip.com/",
    
    viewportWidth: 1280,
    viewportHeight: 720,
    
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 30000,
    
    specPattern: "cypress/e2e/**/*.{cy.js,feature}",
    supportFile: "cypress/support/e2e.js",
    
    screenshotOnRunFailure: true,
    screenshotsFolder: "cypress/screenshots",
    
    video: true,
    videosFolder: "cypress/videos",
    
    setupNodeEvents(on, config) {
      // Configure plugins here
      return config;
    },
  },
});
```

---

## Configuration Troubleshooting

| Issue | Solution |
|-------|----------|
| Config not loading | Check JSON syntax in config files |
| Env vars not working | Prefix with CYPRESS_ or use cy.env() |
| Report not generating | Verify plugin versions in package.json |
| Browser not launching | Check browser path, use --browser flag |
| Tests timing out | Increase timeout values in config |
| Baseurl not working | Ensure baseUrl set correctly in config |

---

**Last Updated**: January 20, 2026
