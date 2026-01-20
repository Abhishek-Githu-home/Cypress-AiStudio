# Cypress project built up with AI studio + Github copilot

## This project is completely created using advanced cypress AI studio feature, prompting and Github copilot. Created the complete E2E project within 20 mins.

This is a comprehensive end-to-end testing framework built with Cypress, featuring Page Object Model (POM), BDD with Cucumber, and Mochawesome reporting.

```
cypress-aistudio/
├── cypress/
│   ├── e2e/
│   │   ├── AiStudio.cy.js                 # Main test cases with assertions
│   │   ├── railway_booking.feature         # BDD Cucumber feature files
│   │   └── stepDefinitions/
│   │       └── railway_booking.steps.js    # Cucumber step definitions
│   ├── pageobjects/
│   │   ├── BasePage.js                     # Base page object with common methods
│   │   └── RailwayBookingPage.js           # Railway booking page object
│   ├── support/
│   │   ├── commands.js                     # Custom Cypress commands
│   │   └── e2e.js                          # Global hooks and configuration
│   ├── fixtures/
│   │   └── example.json                    # Test data fixtures
│   ├── screenshots/                        # Failed test screenshots
│   ├── videos/                             # Test execution videos
│
├── mochawesomeReports/                     # Mochawesome generated reports
├── cypress.config.js                       # Cypress configuration
├── package.json                            # Project dependencies
└── README.md                                # This file
```

---

## Installation

### Prerequisites
- Node.js v14+ installed
- npm v6+ installed

### Setup Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Verify Installation**
   ```bash
   npx cypress --version
   ```

---

## Project Components

### 1. **Page Object Model (POM)**

**Location**: `cypress/pageobjects/`

#### BasePage.js
Contains reusable methods for all page objects:
- Element interaction methods (`clickElement`, `typeText`, `checkElement`)
- Assertion methods (`assertElementVisible`, `assertElementContains`)
- Wait methods (`waitForElement`)
- Command documentation as comments

#### RailwayBookingPage.js
Specific to railway booking functionality:
- Selectors for all UI elements
- Methods for each booking step
- Inline command and assertion documentation

**Usage Example**:
```javascript
const railwayPage = new RailwayBookingPage();
railwayPage.searchTrains('Bengaluru', 'Chennai');
railwayPage.applyFilters();
```

### 2. **BDD with Cucumber**

**Location**: `cypress/e2e/`

#### Feature Files (railway_booking.feature)
Define test scenarios in Gherkin language:
- Given: Preconditions
- When: Actions
- Then: Assertions

**Example**:
```gherkin
Scenario: Book a train ticket with passenger details
  When User searches for trains from "Bengaluru" to "Chennai"
  And User applies filters for General Quota and AC class
  Then User should see the train selection confirmation
```

#### Step Definitions (railway_booking.steps.js)
Map feature steps to actual test code:
- Implements Given, When, Then steps
- Includes command documentation as comments
- Contains assertions for each step

**Command Usage Pattern**:
```javascript
// cy.get() - Selects the element
// Command: Gets the element from DOM
// Assertion: .should('be.visible') - Element should be visible

cy.get('[data-cy="submit"]').click();
cy.get('[data-cy="submit"]').should('be.visible');
```

### 3. **Improved Test Cases with Assertions**

**Location**: `cypress/e2e/AiStudio.cy.js`

Features:
- Comprehensive test cases with detailed assertions
- Each step documented with comments
- Commands explained (cy.get, cy.type, cy.click, etc.)
- Assertions shown for each interaction
- Multiple test cases for different scenarios

**Test Case Structure**:
```javascript
// STEP 1: Close Initial Modal
// Command: cy.get().click() - Closes the modal popup
// Assertion: Modal should not be visible after closing
cy.get('[data-cy="closeModal"]').click();
cy.get('[data-cy="closeModal"]').should('not.exist');
```

### 4. **Custom Commands**

**Location**: `cypress/support/commands.js`

Pre-built commands for common operations:
- `cy.login(email, password)` - Login functionality
- `cy.waitAndClick(selector)` - Wait and click element
- `cy.typeText(selector, text)` - Type with validation
- `cy.selectDropdown(selector, optionText)` - Select dropdown
- `cy.verifyText(selector, text)` - Verify element text
- `cy.isVisible(selector)` - Check visibility
- `cy.uploadFile(selector, filePath)` - Upload files
- `cy.interceptAndVerify(method, url)` - API testing
- `cy.scrollToElement(selector)` - Scroll to element
- `cy.waitForUrlChange(url)` - Wait for URL change

**Usage Example**:
```javascript
cy.waitAndClick('[data-cy="submit"]');
cy.typeText('[name="email"]', 'test@example.com');
cy.verifyText('[data-cy="message"]', 'Success');
```

### 5. **Global Hooks & Configuration**

**Location**: `cypress/support/e2e.js`

Global setup and teardown:
- `beforeEach` - Sets viewport, disables exceptions
- `afterEach` - Clears cookies and localStorage
- Error handling and logging

### 6. **Mochawesome Reporter**

Configuration in `cypress.config.js`:
- Generates HTML reports
- Creates JSON reports for merging
- Captures screenshots on failure
- Generates videos for each test

---

## Running Tests

### 1. **Open Cypress Test Runner (Interactive Mode)**
```bash
npm test
```
- Opens Cypress GUI
- Run tests interactively
- See real-time test execution
- Debug with browser DevTools

### 2. **Run Tests in Headless Mode**
```bash
npm run test:headless
```
- Runs all tests without opening browser
- Faster execution
- Suitable for CI/CD pipelines

### 3. **Run Cucumber Feature Tests**
```bash
npm run test:cucumber
```
- Runs only Cucumber feature files
- BDD test execution

### 4. **Run Tests with Report Generation**
```bash
npm run test:report
```
- Executes all tests
- Merges all JSON reports
- Generates HTML Mochawesome report
- Report location: `mochawesomeReports/report.html`

### 5. **Run Specific Test File**
```bash
npx cypress run --spec "cypress/e2e/AiStudio.cy.js"
```

### 6. **Run Specific Test with Options**
```bash
npx cypress run --spec "cypress/e2e/AiStudio.cy.js" --headed --browser chrome
```

---

## Test Case Explanation

### Main Test: "Verification of placing the order - Full Journey"

This comprehensive test covers the complete railway booking flow:

**Steps**:
1. **Close Modal** - Removes initial popup
2. **Navigate to Railway** - Accesses railway booking section
3. **Search Trains** - Enters source, destination, and date
4. **Apply Filters** - Selects quota and class preferences
5. **Select Train** - Chooses available train
6. **Add Passengers** - Enters passenger details (2 passengers)
7. **Manage Passengers** - Edit/remove passengers
8. **Contact Details** - Fills email and phone
9. **Payment** - Selects payment method
10. **GST Info** - Enters GST details
11. **Confirm Booking** - Completes booking
12. **View Summary** - Views booking confirmation

**Assertions Used**:
- `.should('be.visible')` - Element visibility
- `.should('have.value')` - Input field values
- `.should('be.checked')` - Checkbox/radio states
- `.should('contain')` - Text content verification
- `.should('have.length')` - List item count
- `.should('not.exist')` - Element non-existence

---

## Command Documentation Format

Each test includes command and assertion comments:

```javascript
// STEP 3: Fill Search Criteria
// Command: cy.get().click() - Opens the from city field
// Command: cy.get().type() - Enters departure city
// Command: cy.get().contains().click() - Selects city from dropdown
// Assertion: City should be selected

cy.get('[data-cy="fromCity"]').click();
cy.get('[data-cy="RailSearchWidget_338"] input').type('bengaluru');
cy.get('.sr_city').contains('Bengaluru').click();
```

---

## Key Cypress Commands Used

| Command | Usage | Purpose |
|---------|-------|---------|
| `cy.visit()` | `cy.visit('/path')` | Navigate to URL |
| `cy.get()` | `cy.get('[selector]')` | Select element |
| `cy.click()` | `cy.click()` | Click element |
| `cy.type()` | `cy.type('text')` | Type into input |
| `cy.clear()` | `cy.clear()` | Clear input field |
| `cy.check()` | `cy.check()` | Check checkbox |
| `cy.should()` | `cy.should('be.visible')` | Assert condition |
| `cy.contains()` | `cy.contains('text')` | Find by text |
| `cy.intercept()` | `cy.intercept(method, url)` | Intercept API |
| `cy.wait()` | `cy.wait('@alias')` | Wait for action |
| `cy.screenshot()` | `cy.screenshot()` | Capture screenshot |
| `cy.select()` | `cy.select('value')` | Select dropdown |

---

## Assertions Used

| Assertion | Purpose | Example |
|-----------|---------|---------|
| `be.visible` | Element is visible | `cy.get('[selector]').should('be.visible')` |
| `have.value` | Input has value | `cy.get('input').should('have.value', 'text')` |
| `be.checked` | Checkbox is checked | `cy.get('input[type="checkbox"]').should('be.checked')` |
| `contain` | Contains text | `cy.get('[selector]').should('contain', 'text')` |
| `have.length` | Has X elements | `cy.get('li').should('have.length', 2)` |
| `not.exist` | Element doesn't exist | `cy.get('[selector]').should('not.exist')` |
| `not.be.disabled` | Element is enabled | `cy.get('button').should('not.be.disabled')` |
| `include` | URL includes text | `cy.url().should('include', '/booking')` |

---

## Page Object Methods

### BasePage Methods

```javascript
// Navigation
visitPage(url)
assertUrlContains(text)

// Element Interaction
getElement(selector)
clickElement(selector)
typeText(selector, text)
checkElement(selector)
clearInput(selector)

// Assertions
assertElementVisible(selector)
assertElementNotVisible(selector)
assertElementContainsText(selector, text)
assertElementHasValue(selector, value)
assertElementIsEnabled(selector)
assertElementIsDisabled(selector)

// Wait & Text
waitForElement(selector, timeout)
getElementText(selector)
```

### RailwayBookingPage Methods

```javascript
// Navigation
closeInitialModal()
navigateToRailway()

// Search & Filter
searchTrains(fromCity, toCity)
applyFilters()

// Train Selection
selectFirstTrain()

// Passenger Management
addPassenger(name, age)
editPassengerDetails()
removePassengerFromList()

// Payment
fillContactDetails(email, mobile)
completePayment()
fillGSTInfo()

// Confirmation
proceedToConfirmation()
viewBookingSummary()
```

---

## Report Generation

### HTML Report
- **Location**: `mochawesomeReports/report.html`
- **Features**:
  - Test execution summary
  - Pass/Fail statistics
  - Screenshots on failures
  - Execution time details

### JSON Report
- **Location**: `mochawesomeReports/mochawesome-*.json`
- Used for merging multiple reports
- Consumed by report generator

---

## Best Practices Implemented

1. **Page Object Model**: All selectors centralized in page objects
2. **DRY Principle**: Reusable base page methods
3. **Custom Commands**: Common actions as custom commands
4. **Descriptive Names**: Clear test and method naming
5. **Assertions**: Each action followed by assertion
6. **Comments**: Commands documented with purpose
7. **Error Handling**: Global error hooks
8. **Test Isolation**: Cleanup after each test
9. **Screenshots**: Captured on failures
10. **Reports**: Comprehensive test reports

---

## Troubleshooting

### Issue: Tests timeout
**Solution**: Increase timeout in cypress.config.js or specific commands:
```javascript
cy.get('[selector]', { timeout: 20000 }).should('be.visible');
```

### Issue: Element not found
**Solution**: Use `.force` option to bypass visibility checks:
```javascript
cy.get('[selector]').click({ force: true });
```

### Issue: Flaky tests
**Solution**: Add explicit waits:
```javascript
cy.get('[selector]').should('be.visible');
cy.get('[selector]').click();
```

### Issue: Report not generating
**Solution**: Ensure mochawesome is installed:
```bash
npm install mochawesome mochawesome-merge mochawesome-report-generator
```

---

## CI/CD Integration

### Example GitHub Actions
```yaml
name: Cypress Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: npm run test:report
      - uses: actions/upload-artifact@v2
        with:
          name: mochawesome-report
          path: mochawesomeReports/
```

---

## Additional Resources

- [Cypress Documentation](https://docs.cypress.io)
- [Cucumber.js Documentation](https://cucumber.io/docs/cucumber/)
- [Mochawesome Documentation](https://adamgruber.github.io/mochawesome/)
- [Page Object Model Pattern](https://www.selenium.dev/documentation/test_practices/encouraged/page_object_models/)

---

## Author
ABHISHEK K M

## License
ISC

## Version
1.0.0

---

## Quick Reference Card

```bash
# Install dependencies
npm install

# Run interactive mode
npm test

# Run headless
npm run test:headless

# Run Cucumber tests
npm run test:cucumber

# Run with report
npm run test:report

# Run specific test
npx cypress run --spec "cypress/e2e/AiStudio.cy.js"

# Open Cypress
npx cypress open
```

