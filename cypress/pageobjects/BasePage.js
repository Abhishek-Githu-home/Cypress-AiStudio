/**
 * Base Page Object - Contains common methods and utilities
 * All page objects should extend this class
 */
class BasePage {
  /**
   * Visit a specific URL
   * Command: cy.visit() - Navigates to a URL
   * @param {string} url - The URL to visit
   */
  visitPage(url = '') {
    cy.visit(url);
  }

  /**
   * Get element by selector and perform action
   * Command: cy.get() - Gets an element by selector
   * @param {string} selector - CSS selector
   * @returns {Cypress.Chainable} - Cypress chainable object
   */
  getElement(selector) {
    return cy.get(selector);
  }

  /**
   * Click on element
   * Command: .click() - Clicks the element
   * @param {string} selector - CSS selector
   */
  clickElement(selector) {
    cy.get(selector).click({ force: true });
  }

  /**
   * Type text into element
   * Command: .type() - Types text into the element
   * @param {string} selector - CSS selector
   * @param {string} text - Text to type
   */
  typeText(selector, text) {
    cy.get(selector).clear().type(text);
  }

  /**
   * Check checkbox or radio button
   * Command: .check() - Checks the element
   * @param {string} selector - CSS selector
   */
  checkElement(selector) {
    cy.get(selector).check({ force: true });
  }

  /**
   * Clear input field
   * Command: .clear() - Clears the input
   * @param {string} selector - CSS selector
   */
  clearInput(selector) {
    cy.get(selector).clear();
  }

  /**
   * Get text from element
   * Command: .invoke('text') - Gets the text content
   * @param {string} selector - CSS selector
   * @returns {Cypress.Chainable} - Text content
   */
  getElementText(selector) {
    return cy.get(selector).invoke('text');
  }

  /**
   * Wait for element visibility
   * Command: cy.get().should('be.visible') - Waits for element
   * @param {string} selector - CSS selector
   * @param {number} timeout - Timeout in milliseconds
   */
  waitForElement(selector, timeout = 10000) {
    cy.get(selector, { timeout: timeout }).should('be.visible');
  }

  /**
   * Assert element is visible
   * Assertion: .should('be.visible')
   * @param {string} selector - CSS selector
   */
  assertElementVisible(selector) {
    cy.get(selector).should('be.visible');
  }

  /**
   * Assert element is not visible
   * Assertion: .should('not.be.visible')
   * @param {string} selector - CSS selector
   */
  assertElementNotVisible(selector) {
    cy.get(selector).should('not.be.visible');
  }

  /**
   * Assert element contains text
   * Assertion: .should('contain')
   * @param {string} selector - CSS selector
   * @param {string} text - Text to assert
   */
  assertElementContainsText(selector, text) {
    cy.get(selector).should('contain', text);
  }

  /**
   * Assert element has value
   * Assertion: .should('have.value')
   * @param {string} selector - CSS selector
   * @param {string} value - Expected value
   */
  assertElementHasValue(selector, value) {
    cy.get(selector).should('have.value', value);
  }

  /**
   * Assert element is enabled
   * Assertion: .should('not.be.disabled')
   * @param {string} selector - CSS selector
   */
  assertElementIsEnabled(selector) {
    cy.get(selector).should('not.be.disabled');
  }

  /**
   * Assert element is disabled
   * Assertion: .should('be.disabled')
   * @param {string} selector - CSS selector
   */
  assertElementIsDisabled(selector) {
    cy.get(selector).should('be.disabled');
  }

  /**
   * Assert URL contains text
   * Assertion: cy.url().should('include')
   * @param {string} text - Text to assert in URL
   */
  assertUrlContains(text) {
    cy.url().should('include', text);
  }

  /**
   * Wait for page load with XHR intercept
   * Command: cy.intercept() - Intercepts network requests
   */
  waitForPageLoad() {
    cy.intercept('GET', '**/api/**').as('pageLoad');
    cy.wait('@pageLoad', { timeout: 30000 });
  }
}

module.exports = BasePage;
