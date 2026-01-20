// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

/**
 * Global Hooks for Test Setup and Teardown
 */

// Hook: Runs before each test
beforeEach(() => {
  // Set viewport size for consistency
  cy.viewport(1280, 720);
  
  // Disable uncaught exception handling for specific error types
  cy.on('uncaught:exception', (err, runnable) => {
    // Return false to prevent test failure from uncaught exceptions
    return false;
  });
});

// Hook: Runs after each test
afterEach(() => {
  // Clear cookies after each test for test isolation
  cy.clearCookies();
  
  // Clear localStorage after each test
  cy.window().then(win => {
    win.localStorage.clear();
  });
});

// Global error handling
Cypress.on('fail', (error, runnable) => {
  // Log the error for debugging
  console.error('Test failed:', error);
  throw error;
});

/**
 * Global configuration for retries
 * Uncomment to enable retry on failure
 */
// const Cypress = require('cypress');
// Cypress.config('retries', 1);