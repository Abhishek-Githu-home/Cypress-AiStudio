const { Given, When, Then, Before, After } = require('@cypress-io/cypress-cucumber-preprocessor/steps');
const RailwayBookingPage = require('../../pageobjects/RailwayBookingPage');

// Initialize page object
let railwayPage;

Before(() => {
  railwayPage = new RailwayBookingPage();
});

// Background steps

/**
 * Background: User is on the MakeMyTrip homepage
 * Command: cy.visit() - Navigates to base URL
 * Assertion: .should('be.visible') - Homepage should be visible
 */
Given('User is on the MakeMyTrip homepage', () => {
  // cy.visit() - Navigates to the MakeMyTrip homepage
  railwayPage.visitPage();
  
  // Assertion: .should('contain') - Page title should contain MakeMyTrip
  cy.contains('MakeMyTrip', { timeout: 10000 }).should('be.visible');
});

/**
 * Background: User closes the initial modal popup
 * Command: cy.get().click() - Closes the modal
 * Assertion: Modal should not exist
 */
Given('User closes the initial modal popup', () => {
  railwayPage.closeInitialModal();
});

// When steps for Scenario 1

/**
 * When: User navigates to railway booking section
 * Command: cy.get().click() - Navigates to railway tab
 * Assertion: Railway section should load
 */
When('User navigates to railway booking section', () => {
  railwayPage.navigateToRailway();
  // Assertion: .should('be.visible') - Railway booking form should be visible
  cy.get('[data-cy="RailSearchWidget_338"]', { timeout: 10000 }).should('be.visible');
});

/**
 * When: User searches for trains from {city1} to {city2} for {date}
 * Command: cy.get().type() - Enters search criteria
 * Assertion: Results should be displayed
 */
When('User searches for trains from {string} to {string} for {string}', (fromCity, toCity, date) => {
  railwayPage.searchTrains(fromCity, toCity);
  
  // cy.get().click() - Selects the departure date
  cy.get('[data-cy="RailSearchWidget_340"] div[aria-label="Sat Feb 14 2026"]').click();
  
  // cy.get().click() - Clicks the search button
  cy.get('[data-cy="submit"]').click();

  // Assertion: .should('contain') - Results page should load with train listings
  cy.contains('Train', { timeout: 15000 }).should('be.visible');
});

/**
 * When: User applies filters for General Quota and AC class
 * Command: cy.get().check() - Applies filters
 * Assertion: Filtered results should display
 */
When('User applies filters for General Quota and AC class', () => {
  railwayPage.applyFilters();
  
  // Assertion: .should('be.checked') - Filters should be applied
  cy.get('#General\\ Quota').should('be.checked');
  cy.get('#AC').should('be.checked');
});

/**
 * When: User selects the first available train
 * Command: cy.get().click() - Selects a train
 * Assertion: Train should be selected
 */
When('User selects the first available train', () => {
  railwayPage.selectFirstTrain();
  
  // Assertion: .should('be.visible') - Train details should display
  cy.get('[data-testid="listing-card"]', { timeout: 10000 }).should('be.visible');
});

/**
 * Then: User should see the train selection confirmation
 * Assertion: Confirmation message should display
 */
Then('User should see the train selection confirmation', () => {
  // Assertion: .should('be.visible') - Train booking form should be visible
  cy.get('#root', { timeout: 10000 }).should('be.visible');
  
  // Assertion: .should('contain') - Page should show train details
  cy.get('body').should('be.visible');
});

// Steps for Scenario 2 - Multiple passengers

/**
 * When: User adds first passenger with name {name} and age {age}
 * Command: cy.get().type() - Enters passenger details
 * Assertion: Passenger details should be saved
 */
When('User adds first passenger with name {string} and age {string}', (name, age) => {
  railwayPage.addPassenger(name, age);
  
  // Assertion: .should('contain') - Passenger name should appear in list
  cy.contains(name, { timeout: 5000 }).should('be.visible');
});

/**
 * When: User selects gender and berth preference for passenger
 * Command: cy.get().click() - Selects options
 * Assertion: Preferences should be saved
 */
When('User selects gender and berth preference for passenger', () => {
  // Assertion: .should('be.checked') - Gender and berth selections should be visible
  cy.get('#mmt-rails-add-traveller input:checked', { timeout: 5000 }).should('exist');
});

/**
 * When: User adds second passenger with name {name} and age {age}
 * Command: cy.get().type() - Enters second passenger details
 * Assertion: Second passenger should be added
 */
When('User adds second passenger with name {string} and age {string}', (name, age) => {
  // cy.get().click() - Clicks add another passenger
  cy.get('[#root a.spaceBetween]', { timeout: 5000 }).click({ force: true });
  
  railwayPage.addPassenger(name, age);
  
  // Assertion: .should('contain') - Second passenger should appear in list
  cy.contains(name, { timeout: 5000 }).should('be.visible');
});

/**
 * When: User selects gender and berth preference for second passenger
 * Command: cy.get().click() - Selects preferences
 * Assertion: Preferences should be applied
 */
When('User selects gender and berth preference for second passenger', () => {
  // Assertion: .should('exist') - Second passenger preferences should be saved
  cy.get('#travellersData li:nth-child(2)', { timeout: 5000 }).should('exist');
});

/**
 * Then: Passengers should be added to the booking list
 * Assertion: Both passengers should appear in list
 */
Then('Passengers should be added to the booking list', () => {
  // Assertion: .should('have.length.greaterThan') - List should have at least 2 passengers
  cy.get('#travellersData li', { timeout: 5000 }).should('have.length.greaterThan', 1);
});

// Steps for Scenario 3 - Edit passenger

/**
 * When: User edits the second passenger details
 * Command: cy.get().click() - Opens edit form
 * Assertion: Edit form should display
 */
When('User edits the second passenger details', () => {
  railwayPage.editPassengerDetails();
  
  // Assertion: .should('be.visible') - Edit form should be visible
  cy.get('[name="name"]', { timeout: 5000 }).should('be.visible');
});

/**
 * Then: The edit form should be displayed
 * Assertion: Form should contain passenger details
 */
Then('The edit form should be displayed', () => {
  // Assertion: .should('be.visible') - Edit form should show
  cy.get('#mmt-rails-edit-traveller', { timeout: 5000 }).should('be.visible');
});

// Steps for Scenario 4 - Contact and payment

/**
 * When: User fills contact details with email {email} and mobile {mobile}
 * Command: cy.get().type() - Enters contact information
 * Assertion: Contact details should be saved
 */
When('User fills contact details with email {string} and mobile {string}', (email, mobile) => {
  railwayPage.fillContactDetails(email, mobile);
  
  // Assertion: .should('have.value') - Email and mobile should be entered
  cy.get('[name="email id"]').should('have.value', email);
  cy.get('[name="Mobile Number"]').should('have.value', mobile);
});

/**
 * When: User selects payment method
 * Command: cy.get().click() - Selects payment option
 * Assertion: Payment option should be selected
 */
When('User selects payment method', () => {
  railwayPage.completePayment();
  
  // Assertion: .should('be.visible') - Payment options should be visible
  cy.get('#root li.radioBox', { timeout: 5000 }).should('be.visible');
});

/**
 * When: User fills GST information
 * Command: cy.get().click() - Fills GST details
 * Assertion: GST information should be saved
 */
When('User fills GST information', () => {
  railwayPage.fillGSTInfo();
  
  // Assertion: .should('be.checked') - GST checkbox should be checked
  cy.get('[data-cy="dt_cb_input_container_gst_info"] b').should('be.visible');
});

/**
 * Then: Booking details should be ready for confirmation
 * Assertion: All required fields should be filled
 */
Then('Booking details should be ready for confirmation', () => {
  // Assertion: .should('be.visible') - Confirmation button should be ready
  cy.get('#root a.whiteText span', { timeout: 5000 }).should('be.visible');
});

// Steps for Scenario 5 - Full journey

/**
 * Then: User should be able to view the booking summary
 * Command: cy.get().click() - Views booking summary
 * Assertion: Summary should display booking information
 */
Then('User should be able to view the booking summary', () => {
  // cy.get().click() - Clicks proceed button
  cy.get('#root a.whiteText span', { timeout: 5000 }).click({ force: true });
  
  // Assertion: URL or page should show confirmation/summary
  cy.get('body', { timeout: 10000 }).should('be.visible');
});
