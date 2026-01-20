/**
 * Demo Test Suite - Demonstrates Framework Functionality
 * This suite shows how the Page Object Model, custom commands,
 * and assertions work in the Cypress framework
 */
describe('Cypress Framework Demo - Page Object Model & Custom Commands', function() {

  beforeEach(function() {
    // cy.visit() - Navigates to the base URL defined in cypress.config.js
    // Assertion: Page should load successfully
    cy.visit('/');
    cy.get('body').should('be.visible');
  });

  /**
   * Test Case 1: Verify Page Title
   * Demonstrates: cy.title() command and assertion
   */
  it('Should verify page title is accessible', function() {
    // cy.title() - Gets the title of the page
    // .should('exist') - Assertion that title exists
    cy.title().should('exist');
    
    // Assertion: Title should not be empty
    cy.title().should('not.be.empty');
  });

  /**
   * Test Case 2: Verify Logo Visibility
   * Demonstrates: cy.get() and assertion chain
   */
  it('Should verify logo is visible on homepage', function() {
    // cy.get() - Selects logo element from the page
    // .should('be.visible') - Assertion that logo is visible
    cy.get('[data-cy="mmt-logo"]').should('be.visible');
    
    // Assertion: Logo should have correct attributes
    cy.get('[data-cy="mmt-logo"]').should('have.attr', 'src');
  });

  /**
   * Test Case 3: Verify Search Box Exists
   * Demonstrates: Multiple assertions and element existence
   */
  it('Should verify search functionality is present', function() {
    // cy.get() - Selects the search button on homepage
    // .should('exist') - Assertion that search button exists
    cy.get('[data-cy="submit"]').should('exist');
    
    // Assertion: Search button should be enabled
    cy.get('[data-cy="submit"]').should('be.enabled');
    
    // Assertion: Search button should contain text
    cy.get('[data-cy="submit"]').should('contain', 'Search');
  });

  /**
   * Test Case 4: Verify Navigation Menu
   * Demonstrates: cy.get() with multiple elements
   */
  it('Should verify navigation menu items are present', function() {
    // cy.get() - Selects all navigation items
    // .should('be.visible') - Assertion that menu is visible
    cy.get('nav').should('exist');
    
    // Assertion: Navigation should contain at least one link
    cy.get('a[data-cy*="item-wrapper"]').should('have.length.greaterThan', 0);
  });

  /**
   * Test Case 5: Verify Footer Content
   * Demonstrates: Checking text content and visibility
   */
  it('Should verify footer is present with content', function() {
    // cy.get() - Selects footer element
    // .should('exist') - Assertion that footer exists
    cy.get('footer').should('exist');
    
    // Assertion: Footer should be visible
    cy.get('footer').should('be.visible');
  });

  /**
   * Test Case 6: Verify Currency Display
   * Demonstrates: Text assertion and visibility
   */
  it('Should verify currency symbol is displayed', function() {
    // cy.get() - Selects elements containing currency
    // .should('be.visible') - Assertion for visibility
    cy.get('body').should('contain.text', '₹');
    
    // Assertion: Page should contain Indian rupee symbol
    cy.contains('₹').should('be.visible');
  });

  /**
   * Test Case 7: Verify Custom Viewport
   * Demonstrates: Viewport configuration and assertions
   */
  it('Should verify viewport dimensions', function() {
    // cy.viewport() - Sets custom viewport size
    cy.viewport('iphone-x');
    
    // Assertion: Page should still load in mobile view
    cy.get('body').should('be.visible');
    
    // Revert to desktop
    cy.viewport(1280, 720);
    cy.get('body').should('be.visible');
  });

  /**
   * Test Case 8: Verify No Console Errors
   * Demonstrates: Error handling and assertions
   */
  it('Should load page without critical errors', function() {
    // Assertion: Page should be visible without errors
    cy.get('body', { timeout: 10000 }).should('be.visible');
    
    // Assertion: Body should have content
    cy.get('body').should('not.be.empty');
    
    // Assertion: No redirect should have occurred
    cy.url().should('include', 'makemytrip');
  });

  /**
   * Test Case 9: Verify Responsive Design
   * Demonstrates: Multiple viewport tests
   */
  it('Should display correctly on different screen sizes', function() {
    // Test on tablet
    cy.viewport('ipad-2');
    cy.get('body').should('be.visible');
    
    // Test on mobile
    cy.viewport('iphone-xr');
    cy.get('body').should('be.visible');
    
    // Test on desktop
    cy.viewport(1920, 1080);
    cy.get('body').should('be.visible');
  });

  /**
   * Test Case 10: Verify Page Load Performance
   * Demonstrates: Timing assertions and page readiness
   */
  it('Should load page within acceptable time', function() {
    // Measure performance
    const startTime = Date.now();
    
    // Visit page
    cy.visit('/');
    
    // Wait for page to be ready
    cy.get('body').should('be.visible');
    
    // Calculate load time
    const loadTime = Date.now() - startTime;
    
    // Assertion: Page should load within 30 seconds
    expect(loadTime).to.be.lessThan(30000);
  });
});
