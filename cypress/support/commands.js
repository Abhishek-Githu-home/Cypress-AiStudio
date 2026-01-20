// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

/**
 * Custom command to login user
 * Usage: cy.login(email, password)
 * Command: cy.visit(), cy.get(), cy.type(), cy.click()
 * Assertion: .should('contain')
 */
Cypress.Commands.add('login', (email, password) => {
  // cy.visit() - Navigates to login page
  cy.visit('/login');
  
  // cy.get().type() - Enters email
  cy.get('[name="email"]').type(email);
  
  // cy.get().type() - Enters password
  cy.get('[name="password"]').type(password);
  
  // cy.get().click() - Clicks login button
  cy.get('[data-cy="login-btn"]').click();
  
  // Assertion: .should('contain') - Dashboard should load
  cy.get('body').should('contain', 'Dashboard');
});

/**
 * Custom command to wait for element and perform action
 * Usage: cy.waitAndClick(selector)
 * Command: cy.get(), .should(), .click()
 * Assertion: Element should be visible before clicking
 */
Cypress.Commands.add('waitAndClick', (selector, options = {}) => {
  const timeout = options.timeout || 10000;
  
  // cy.get().should('be.visible') - Waits for element to be visible
  cy.get(selector, { timeout: timeout }).should('be.visible');
  
  // cy.get().click() - Clicks the element
  cy.get(selector).click({ force: true });
});

/**
 * Custom command to type text with clear
 * Usage: cy.typeText(selector, text)
 * Command: cy.get(), .clear(), .type()
 * Assertion: .should('have.value')
 */
Cypress.Commands.add('typeText', (selector, text) => {
  // cy.get().clear() - Clears the field
  cy.get(selector).clear();
  
  // cy.get().type() - Types the text
  cy.get(selector).type(text);
  
  // Assertion: .should('have.value') - Text should be entered
  cy.get(selector).should('have.value', text);
});

/**
 * Custom command to verify element text
 * Usage: cy.verifyText(selector, expectedText)
 * Command: cy.get(), .should()
 * Assertion: .should('contain')
 */
Cypress.Commands.add('verifyText', (selector, expectedText) => {
  // Assertion: .should('contain') - Element should contain expected text
  cy.get(selector).should('contain', expectedText);
});

/**
 * Custom command to verify element visibility
 * Usage: cy.isVisible(selector)
 * Command: cy.get(), .should()
 * Assertion: .should('be.visible')
 */
Cypress.Commands.add('isVisible', (selector) => {
  // Assertion: .should('be.visible') - Element should be visible
  cy.get(selector).should('be.visible');
  
  return cy.get(selector);
});

/**
 * Custom command to verify element is not visible
 * Usage: cy.isNotVisible(selector)
 * Command: cy.get(), .should()
 * Assertion: .should('not.be.visible')
 */
Cypress.Commands.add('isNotVisible', (selector) => {
  // Assertion: .should('not.be.visible') - Element should not be visible
  cy.get(selector).should('not.be.visible');
});

/**
 * Custom command to select dropdown option
 * Usage: cy.selectDropdown(selector, optionText)
 * Command: cy.get(), .click(), .contains()
 * Assertion: Option should be selected
 */
Cypress.Commands.add('selectDropdown', (selector, optionText) => {
  // cy.get().click() - Opens the dropdown
  cy.get(selector).click();
  
  // cy.get().contains().click() - Selects the option
  cy.contains(optionText).click();
  
  // Assertion: Dropdown should close after selection
  cy.get(selector).should('contain', optionText);
});

/**
 * Custom command to upload file
 * Usage: cy.uploadFile(inputSelector, filePath)
 * Command: cy.get(), .selectFile()
 * Assertion: File should be selected
 */
Cypress.Commands.add('uploadFile', (inputSelector, filePath) => {
  // cy.get().selectFile() - Selects the file to upload
  cy.get(inputSelector).selectFile(filePath);
  
  // Assertion: File should be attached
  cy.get(inputSelector).should('have.value', filePath.replace(/^.*[\\\/]/, ''));
});

/**
 * Custom command to assert API response
 * Usage: cy.interceptAndVerify(method, url, statusCode)
 * Command: cy.intercept(), cy.wait()
 * Assertion: Response should have correct status
 */
Cypress.Commands.add('interceptAndVerify', (method, url, statusCode = 200) => {
  // cy.intercept() - Intercepts the API call
  cy.intercept(method, url).as('apiCall');
  
  // cy.wait() - Waits for the API call to complete
  cy.wait('@apiCall', { timeout: 15000 }).then((interception) => {
    // Assertion: Response status should match expected
    expect(interception.response.statusCode).to.equal(statusCode);
  });
});

/**
 * Custom command to scroll to element
 * Usage: cy.scrollToElement(selector)
 * Command: cy.get(), .scrollIntoView()
 * Assertion: Element should be in viewport
 */
Cypress.Commands.add('scrollToElement', (selector) => {
  // cy.get().scrollIntoView() - Scrolls element into view
  cy.get(selector).scrollIntoView({ duration: 500 });
  
  // Assertion: Element should be visible after scrolling
  cy.get(selector).should('be.visible');
});

/**
 * Custom command to wait for URL change
 * Usage: cy.waitForUrlChange(expectedUrl)
 * Command: cy.url(), .should()
 * Assertion: URL should contain expected text
 */
Cypress.Commands.add('waitForUrlChange', (expectedUrl) => {
  // Assertion: .should('include') - URL should contain expected text
  cy.url({ timeout: 10000 }).should('include', expectedUrl);
});

/**
 * Custom command to take screenshot on failure
 * Usage: cy.captureScreenshot(testName)
 * Command: cy.screenshot()
 * Assertion: Screenshot should be saved
 */
Cypress.Commands.add('captureScreenshot', (testName) => {
  // cy.screenshot() - Takes a screenshot of the current page
  cy.screenshot(`${testName}-${Date.now()}`);
});