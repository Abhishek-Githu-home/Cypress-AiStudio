# Cypress Test Automation - Quick Reference Guide

## Project Structure Summary

```
📦 cypress-aistudio
├── 📂 cypress/
│   ├── 📂 e2e/
│   │   ├── 📄 AiStudio.cy.js (Main test cases)
│   │   ├── 📄 railway_booking.feature (BDD scenarios)
│   │   └── 📂 stepDefinitions/
│   │       └── 📄 railway_booking.steps.js
│   ├── 📂 pageobjects/
│   │   ├── 📄 BasePage.js (Common methods)
│   │   └── 📄 RailwayBookingPage.js (Page-specific methods)
│   ├── 📂 support/
│   │   ├── 📄 commands.js (Custom commands)
│   │   └── 📄 e2e.js (Global hooks)
│   ├── 📂 fixtures/
│   │   ├── 📄 example.json
│   │   └── 📄 railway_booking.json (Test data)
│   ├── 📂 screenshots/ (Failed test images)
│   └── 📂 videos/ (Test recordings)
├── 📂 mochawesomeReports/ (Generated reports)
├── 📄 cypress.config.js
├── 📄 package.json
├── 📄 .cypress-cucumber-preprocessorrc.json
└── 📄 README.md
```

---

## Key Features Implemented

### ✅ Page Object Model (POM)
- **BasePage.js**: Reusable methods for common actions
- **RailwayBookingPage.js**: Domain-specific methods
- Centralized selectors
- Easy maintenance and scalability

### ✅ BDD with Cucumber
- Feature files in Gherkin language
- Step definitions mapped to scenarios
- Human-readable test scenarios
- Better stakeholder communication

### ✅ Assertions & Reliability
- Comprehensive assertions on each action
- Explicit waits before actions
- Timeout management
- Error handling

### ✅ Custom Commands
- Reusable utility commands
- Simplified test code
- Consistent interactions
- Pre-built validations

### ✅ Mochawesome Reports
- HTML report generation
- Pass/Fail statistics
- Screenshots on failures
- Detailed timing information

---

## Running Tests

### Interactive Mode
```bash
npm test
# Opens Cypress GUI - Run tests interactively
```

### Headless Mode
```bash
npm run test:headless
# Run all tests without opening browser
```

### Cucumber Tests
```bash
npm run test:cucumber
# Run feature file scenarios
```

### With Report
```bash
npm run test:report
# Run tests and generate HTML report
# Report: mochawesomeReports/report.html
```

---

## Test Cases Overview

### 1. Verification of placing the order - Full Journey
**Covers**: Complete booking flow from search to confirmation
**Assertions**: 20+ assertions at each step
**Duration**: ~5-10 minutes

**Flow**:
1. Close modal popup
2. Navigate to railway section
3. Search for trains
4. Apply filters (quota, class, time)
5. Select train
6. Add 2 passengers
7. Edit/remove passengers
8. Fill contact details
9. Select payment method
10. Fill GST information
11. Confirm booking
12. View summary

### 2. Verification of search and filter functionality
**Covers**: Search form and filter features
**Assertions**: Filter validation, result count
**Duration**: ~2-3 minutes

### 3. Verification of passenger addition and removal
**Covers**: Passenger management features
**Assertions**: List operations, data validation
**Duration**: ~3-4 minutes

---

## Assertion Examples

### Element Visibility
```javascript
// Assert element is visible
cy.get('[data-cy="submit"]').should('be.visible');

// Assert element is not visible
cy.get('[data-cy="modal"]').should('not.be.visible');
```

### Form Input Values
```javascript
// Assert input has specific value
cy.get('[name="name"]').should('have.value', 'Abhishek K M');

// Assert input is empty
cy.get('[name="email"]').should('have.value', '');
```

### Checkbox/Radio States
```javascript
// Assert checkbox is checked
cy.get('#AC').should('be.checked');

// Assert checkbox is unchecked
cy.get('#SL').should('not.be.checked');
```

### Text Content
```javascript
// Assert element contains text
cy.get('[data-cy="message"]').should('contain', 'Booking Confirmed');

// Assert exact text match
cy.get('h1').should('have.text', 'Railway Booking');
```

### Element Count
```javascript
// Assert list has items
cy.get('#travellersData li').should('have.length', 2);

// Assert more than X items
cy.get('[data-testid="listing-card"]').should('have.length.greaterThan', 0);
```

### URL Changes
```javascript
// Assert URL contains path
cy.url().should('include', '/booking');

// Assert exact URL match
cy.url().should('eq', 'https://www.makemytrip.com/booking');
```

### Enabled/Disabled State
```javascript
// Assert button is enabled
cy.get('button').should('not.be.disabled');

// Assert button is disabled
cy.get('button').should('be.disabled');
```

---

## Command Documentation Format

Each test includes inline documentation:

```javascript
// STEP 1: Close Initial Modal
// Command: cy.get().click() - Gets element and clicks it
// Assertion: Modal should be closed (should not exist)

cy.get('[data-cy="closeModal"]').click();
cy.get('[data-cy="closeModal"]').should('not.exist');
```

**Pattern**:
```
// STEP X: Description
// Command: [Cypress command] - [What it does]
// Assertion: [Expected outcome]

// Actual test code
```

---

## Custom Commands Usage

### Wait and Click
```javascript
cy.waitAndClick('[data-cy="submit"]');
```

### Type with Validation
```javascript
cy.typeText('[name="email"]', 'test@example.com');
```

### Verify Text
```javascript
cy.verifyText('[data-cy="message"]', 'Success');
```

### Select Dropdown
```javascript
cy.selectDropdown('[name="gender"]', 'Male');
```

### Upload File
```javascript
cy.uploadFile('input[type="file"]', 'cypress/fixtures/document.pdf');
```

### Scroll to Element
```javascript
cy.scrollToElement('[id="payment-section"]');
```

### Wait for URL Change
```javascript
cy.waitForUrlChange('/confirmation');
```

### Intercept API
```javascript
cy.interceptAndVerify('GET', '/api/trains', 200);
```

---

## Page Object Usage

### Initialize Page Object
```javascript
const railwayPage = new RailwayBookingPage();
```

### Use Page Methods
```javascript
// Close modal
railwayPage.closeInitialModal();

// Navigate
railwayPage.navigateToRailway();

// Search
railwayPage.searchTrains('Bengaluru', 'Chennai');

// Apply filters
railwayPage.applyFilters();

// Add passenger
railwayPage.addPassenger('John Doe', '30');

// Fill contact
railwayPage.fillContactDetails('john@example.com', '9876543210');
```

---

## Fixture Data Usage

### Load Fixture
```javascript
cy.fixture('railway_booking.json').then((data) => {
  cy.typeText('[name="name"]', data.passengers[0].name);
  cy.typeText('[name="age"]', data.passengers[0].age);
});
```

### Fixture Structure
```json
{
  "passengers": [
    {
      "name": "John Doe",
      "age": 30,
      "gender": "Male"
    }
  ],
  "routes": [
    {
      "from": "Bengaluru",
      "to": "Chennai"
    }
  ]
}
```

---

## Best Practices Checklist

- ✅ **Use Page Objects**: All selectors in page objects
- ✅ **Add Assertions**: Every action followed by assertion
- ✅ **Document Commands**: Comment what each command does
- ✅ **Use Custom Commands**: Reduce code duplication
- ✅ **Explicit Waits**: Wait for elements explicitly
- ✅ **Unique Selectors**: Use data-cy attributes when possible
- ✅ **Error Handling**: Use error hooks for debugging
- ✅ **Test Independence**: Tests should not depend on each other
- ✅ **Descriptive Names**: Clear test and method names
- ✅ **Test Data**: Use fixtures for test data

---

## Troubleshooting Guide

| Issue | Solution |
|-------|----------|
| Test timeout | Increase timeout: `cy.get('[selector]', { timeout: 20000 })` |
| Element not found | Check selector, use DevTools, use `force: true` |
| Flaky tests | Add explicit waits before actions |
| Report not generated | Check mochawesome installation |
| Screenshots not saved | Verify path exists in config |
| API intercept fails | Check URL pattern matches correctly |
| Cucumber not recognized | Verify preprocessor config file |
| Custom command not found | Check commands.js is imported in e2e.js |

---

## Performance Tips

1. **Use headless mode for CI/CD**: Faster execution
2. **Parallel test execution**: Run multiple tests simultaneously
3. **Minimize wait times**: Use explicit waits only when needed
4. **Reduce network requests**: Mock APIs when possible
5. **Screenshot only on failure**: Reduces disk usage
6. **Archive old reports**: Manage disk space

---

## Reporting and Metrics

### Metrics Tracked
- Total test count
- Passed/Failed count
- Pass rate percentage
- Total execution time
- Average test duration
- Screenshot count

### Report Locations
- **HTML**: `mochawesomeReports/report.html`
- **JSON**: `mochawesomeReports/mochawesome-*.json`
- **Screenshots**: `cypress/screenshots/`
- **Videos**: `cypress/videos/`

---

## Integration with CI/CD

### Example Jenkins Pipeline
```groovy
pipeline {
  stages {
    stage('Install Dependencies') {
      steps {
        sh 'npm install'
      }
    }
    stage('Run Tests') {
      steps {
        sh 'npm run test:report'
      }
    }
    stage('Archive Reports') {
      steps {
        archiveArtifacts 'mochawesomeReports/**'
      }
    }
  }
}
```

---

## Contact & Support

**Project**: Cypress AI Studio + Github Copilot  
**Author**: ABHISHEK K M  
**Version**: 1.0.0  
**License**: ISC

---

## Glossary

- **POM**: Page Object Model - Design pattern for organizing test code
- **BDD**: Behavior Driven Development - Test approach using natural language
- **Cucumber**: BDD testing framework supporting Gherkin language
- **Gherkin**: Plain text language for writing test scenarios
- **Selector**: CSS path to identify HTML elements
- **Assertion**: Verification statement checking expected behavior
- **Fixture**: Static test data stored in files
- **Hook**: Setup/teardown code running before/after tests
- **Intercept**: Capturing and controlling network requests

---

**Last Updated**: January 20, 2026  
**Framework Version**: Cypress 15.9.0
