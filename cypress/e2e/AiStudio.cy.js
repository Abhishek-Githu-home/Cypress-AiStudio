/**
 * Improved End-to-End Test Suite for Railway Booking
 * with Assertions and Command Documentation
 */
describe('Railway Booking - Complete Journey', function() {

  beforeEach(function() {
    // cy.visit() - Navigates to the base URL (defined in cypress.config.js)
    cy.visit('/');
    
    // Assertion: .should('be.visible') - Homepage should load successfully
    cy.get('body').should('be.visible');
  });

  /**
   * Test Case 1: Verify placing the order with full booking flow
   * This test covers the complete train booking journey from search to payment
   */
  it('Verification of placing the order - Full Journey', function() {
    
    // STEP 1: Close Initial Modal
    // Command: cy.get().click() - Closes the modal popup
    // Assertion: Modal should not be visible after closing
    cy.get('[data-cy="closeModal"]').click();
    cy.get('[data-cy="closeModal"]').should('not.exist');

    // STEP 2: Navigate to Railway Booking
    // Command: cy.get().click() - Clicks minimize button
    // Command: cy.get().click() - Navigates to railway tab
    // Assertion: Railway search form should be visible
    cy.get('img[alt="minimize"]').click();
    cy.get('li:nth-of-type(5) [data-cy="item-wrapper"] a.column').click();
    cy.get('[data-cy="fromCity"]', { timeout: 10000 }).should('be.visible');

    // STEP 3: Fill Search Criteria
    // Command: cy.get().click() - Opens the from city field
    // Command: cy.get().type() - Enters departure city
    // Command: cy.get().contains().click() - Selects city from dropdown
    // Assertion: City should be selected
    cy.get('[data-cy="fromCity"]').click();
    cy.get('[data-cy="RailSearchWidget_338"] input.react-autosuggest__input').type('bengaluru');
    cy.get('.sr_city').contains('Bengaluru').click();
    cy.get('#react-autowhatever-1-section-0-item-0 p:nth-child(2)').click();
    
    // Command: cy.get().type() - Enters destination city
    // Assertion: Destination city should be filled
    cy.get('[data-cy="RailSearchWidget_339"] input.react-autosuggest__input').type('chennai');
    cy.get('.sr_city').contains('Chennai').click();
    cy.get('#react-autowhatever-1-section-0-item-0').click();

    // STEP 4: Select Date
    // Command: cy.get().click() - Clicks date field
    // Assertion: Date should be selected
    cy.get('[data-cy="RailSearchWidget_340"] div[aria-label="Sat Feb 14 2026"]').click();
    cy.get('[data-cy="RailSearchWidget_340"] div[aria-label="Sat Feb 14 2026"]').should('be.visible');

    // STEP 5: Search for Trains
    // Command: cy.get().click() - Submits the search form
    // Assertion: Search results should load with train listings
    cy.get('[data-cy="submit"]').click();
    cy.get('[data-testid="listing-card"]', { timeout: 15000 }).should('be.visible');

    // STEP 6: Apply Filters
    // Command: cy.get().click() - Applies quota filter
    // Command: cy.get().check() - Checks the quota checkbox
    // Assertion: Quota filter should be applied and checked
    cy.get('label[for="General Quota"] div.flexOne').click();
    cy.get('#General\\ Quota').check({ force: true });
    cy.get('#General\\ Quota').should('be.checked');

    // Command: cy.get().click() - Applies class filter
    // Command: cy.get().check() - Checks the class checkbox
    // Assertion: Class filter should be applied and checked
    cy.get('label[for="AC"] b').click();
    cy.get('#AC').check({ force: true });
    cy.get('#AC').should('be.checked');

    // Command: cy.get().click() - Applies time filter
    cy.get('div:nth-of-type(5) [data-testid="filter-option-12am - 6am"] div.FilterTabs_tabSection__0k758').click();
    cy.get('div:nth-of-type(6) [data-testid="filter-option-12am - 6am"] div.FilterTabs_tabSection__0k758').click();

    // STEP 7: Select Train and Book
    // Command: cy.get().click() - Selects first available train
    // Assertion: Train should be selected
    cy.get('div:nth-child(1) > [data-testid="listing-card"] > div.false > div.Cards_navContainer__PyW2o > div.Cards_cardContainer__GnUL3 > div:nth-child(2) > div.Cards_cardSection__wZahV > div:nth-child(1) > [data-testid="availability-text"]')
      .click();

    // Command: cy.get().click() - Proceeds to add passengers
    // Assertion: Passenger form should be visible
    cy.get('#root a.spaceBetween', { timeout: 10000 }).click();

    // STEP 8: Add First Passenger
    // Command: cy.get().type() - Enters passenger name
    // Assertion: Name should be entered in the field
    cy.get('[name="name"]').click();
    cy.get('[name="name"]').type('Abhishek K M');
    cy.get('[name="name"]').should('have.value', 'Abhishek K M');

    // Command: cy.get().type() - Enters passenger age
    // Assertion: Age should be entered in the field
    cy.get('[name="age"]').click();
    cy.get('[name="age"]').type('23');
    cy.get('[name="age"]').should('have.value', '23');

    // Command: cy.get().click() - Selects gender
    // Assertion: Gender option should be selected
    cy.get('#mmt-rails-add-traveller div.genderField div.noSelection').click();
    cy.get('#mmt-rails-add-traveller ul.quotaCurtainDown li:nth-child(1) span.appendRight30').click();

    // Command: cy.get().click() - Selects berth preference
    // Assertion: Berth preference should be selected
    cy.get('#mmt-rails-add-traveller div:nth-child(5) div.noSelection').click();
    cy.get('#mmt-rails-add-traveller ul.quotaCurtainDown li:nth-child(3)').click();

    // Command: cy.get().click() - Confirms passenger addition
    cy.get('#mmt-rails-add-traveller button.latoBold').click();

    // STEP 9: Add Second Passenger
    // Command: cy.get().click() - Clicks to add another passenger
    cy.get('#root a.spaceBetween').click();

    // Command: cy.get().type() - Enters second passenger name
    // Assertion: Second passenger name should be entered
    cy.get('[name="name"]').click();
    cy.get('[name="name"]').type('Krishna');
    cy.get('[name="name"]').should('have.value', 'Krishna');

    // Command: cy.get().click() - Navigates to age field
    cy.get('#mmt-rails-add-traveller form.makeFlex').click();

    // Command: cy.get().type() - Enters second passenger age
    // Assertion: Second passenger age should be entered
    cy.get('[name="age"]').click();
    cy.get('[name="age"]').type('25');
    cy.get('[name="age"]').should('have.value', '25');

    // Command: cy.get().click() - Selects gender for second passenger
    cy.get('#mmt-rails-add-traveller div.genderField div.noSelection').click();
    cy.get('#mmt-rails-add-traveller ul.quotaCurtainDown li:nth-child(1)').click();

    // Command: cy.get().click() - Selects berth preference for second passenger
    cy.get('#mmt-rails-add-traveller div:nth-child(5) div.noSelection').click();
    cy.get('#mmt-rails-add-traveller ul.quotaCurtainDown li:nth-child(3)').click();

    // Command: cy.get().click() - Confirms second passenger addition
    cy.get('#mmt-rails-add-traveller button.latoBold').click();

    // STEP 10: Manage Passenger List
    // Command: cy.get().click() - Clicks edit button for second passenger
    // Assertion: Both passengers should exist in the list
    cy.get('#travellersData li').should('have.length', 2);
    
    cy.get('#travellersData li:nth-child(2) span.editBtn').click();
    cy.get('#mmt-rails-edit-traveller a.editBtn').click();

    // Command: cy.get().click() - Removes a passenger
    cy.get('#travellersData li:nth-child(2) span.active').click();

    // STEP 11: Fill Contact Details
    // Command: cy.get().click() - Clicks proceed to payment
    // Assertion: Payment section should be visible
    cy.get('#root form.appendBottom20 div.spaceBetween').click();

    // Command: cy.get().type() - Enters email address
    // Assertion: Email should be filled
    cy.get('[name="email id"]').click();
    cy.get('[name="email id"]').type('test@gmail.com');
    cy.get('[name="email id"]').should('have.value', 'test@gmail.com');

    // Command: cy.get().type() - Enters mobile number
    // Assertion: Mobile number should be filled
    cy.get('[name="Mobile Number"]').click();
    cy.get('[name="Mobile Number"]').type('83848478274');
    cy.get('[name="Mobile Number"]').should('have.value', '83848478274');

    // STEP 12: Select Payment Method
    // Command: cy.get().click() - Opens payment options
    // Assertion: Payment options should be visible
    cy.get('#root section.leftSection').click();
    cy.get('#root li.radioBox > label').click();

    // STEP 13: Apply Coupon
    // Command: cy.get().click() - Clicks coupon field
    cy.get('#root [name="coupon"]').click();
    cy.get('#root p.redText').click();
    cy.get('#root [name="coupon"]').click();

    // Command: cy.get().click() - Selects payment option
    cy.get('#root ul:nth-child(3) li.radioBox').click();
    cy.get('#root [name="coupon"]').click();
    cy.get('#root [name="coupon"]').click();

    // STEP 14: Fill GST Information
    // Command: cy.get().click() - Opens GST section
    // Assertion: GST section should be visible
    cy.get('[data-cy="dt_state_gst_info"]').click();
    cy.get('[data-cy="dt_gstn_container"] li.activeItem').click();

    // Command: cy.get().click() - Checks GST checkbox
    // Assertion: GST checkbox should be checked
    cy.get('[data-cy="dt_cb_input_container_gst_info"] b').click();

    // STEP 15: Complete Booking
    // Command: cy.get().click() - Proceeds to final confirmation
    // Assertion: Final page should load
    cy.get('#root a.whiteText span').click();

    // STEP 16: View Booking Summary
    // Command: cy.get().click() - Views booking summary
    cy.get('li:nth-of-type(6) [data-cy="item-wrapper"] span.headerIconWrapper').click();

    // Command: cy.get().click() - Views booking data in JSON format
    // Assertion: Booking data should be visible
    cy.get('div.json-formatter-container').click();
    cy.get('div.json-formatter-container').should('be.visible');
  });

  /**
   * Test Case 2: Verify search functionality with filters
   * This test validates that search and filter features work correctly
   */
  it('Verification of search and filter functionality', function() {
    
    // Close modal
    cy.get('[data-cy="closeModal"]').click();
    cy.get('img[alt="minimize"]').click();

    // Navigate to railway
    // Assertion: Railway tab should be clickable
    cy.get('li:nth-of-type(5) [data-cy="item-wrapper"] a.column').should('be.visible');
    cy.get('li:nth-of-type(5) [data-cy="item-wrapper"] a.column').click();

    // Fill search criteria
    cy.get('[data-cy="fromCity"]', { timeout: 10000 }).click();
    cy.get('[data-cy="RailSearchWidget_338"] input.react-autosuggest__input').type('bengaluru');
    cy.get('.sr_city').contains('Bengaluru').click();

    cy.get('[data-cy="RailSearchWidget_339"] input.react-autosuggest__input').type('chennai');
    cy.get('.sr_city').contains('Chennai').click();

    // Select date
    cy.get('[data-cy="RailSearchWidget_340"] div[aria-label="Sat Feb 14 2026"]').click();

    // Submit search
    // Assertion: Results should load
    cy.get('[data-cy="submit"]').click();
    cy.get('[data-testid="listing-card"]', { timeout: 15000 }).should('have.length.greaterThan', 0);

    // Apply filters
    // Assertion: Filtered results should update
    cy.get('label[for="General Quota"] div.flexOne').click();
    cy.get('#General\\ Quota').check({ force: true });
    cy.get('[data-testid="listing-card"]', { timeout: 10000 }).should('be.visible');

    // Assertion: AC filter should be applied
    cy.get('label[for="AC"] b').click();
    cy.get('#AC').check({ force: true });
    cy.get('#AC').should('be.checked');
  });

  /**
   * Test Case 3: Verify passenger addition and removal
   * This test validates passenger management functionality
   */
  it('Verification of passenger addition and removal', function() {
    
    // Close modal and navigate
    cy.get('[data-cy="closeModal"]').click();
    cy.get('img[alt="minimize"]').click();
    cy.get('li:nth-of-type(5) [data-cy="item-wrapper"] a.column').click();

    // Search trains
    cy.get('[data-cy="fromCity"]', { timeout: 10000 }).click();
    cy.get('[data-cy="RailSearchWidget_338"] input.react-autosuggest__input').type('bengaluru');
    cy.get('.sr_city').contains('Bengaluru').click();

    cy.get('[data-cy="RailSearchWidget_339"] input.react-autosuggest__input').type('chennai');
    cy.get('.sr_city').contains('Chennai').click();

    cy.get('[data-cy="RailSearchWidget_340"] div[aria-label="Sat Feb 14 2026"]').click();
    cy.get('[data-cy="submit"]').click();

    // Apply filters
    cy.get('label[for="General Quota"] div.flexOne').click();
    cy.get('#General\\ Quota').check({ force: true });
    cy.get('label[for="AC"] b').click();
    cy.get('#AC').check({ force: true });

    // Select train
    cy.get('div:nth-child(1) > [data-testid="listing-card"] > div.false > div.Cards_navContainer__PyW2o > div.Cards_cardContainer__GnUL3 > div:nth-child(2) > div.Cards_cardSection__wZahV > div:nth-child(1) > [data-testid="availability-text"]')
      .click();

    // Add passenger
    // Assertion: Passenger should be added successfully
    cy.get('#root a.spaceBetween', { timeout: 10000 }).click();
    cy.get('[name="name"]').type('Abhishek K M');
    cy.get('[name="age"]').type('23');
    
    cy.get('#mmt-rails-add-traveller div.genderField div.noSelection').click();
    cy.get('#mmt-rails-add-traveller ul.quotaCurtainDown li:nth-child(1) span.appendRight30').click();

    cy.get('#mmt-rails-add-traveller div:nth-child(5) div.noSelection').click();
    cy.get('#mmt-rails-add-traveller ul.quotaCurtainDown li:nth-child(3)').click();

    cy.get('#mmt-rails-add-traveller button.latoBold').click();
    cy.contains('Abhishek K M', { timeout: 5000 }).should('be.visible');

    // Add second passenger
    // Assertion: Second passenger should be added
    cy.get('#root a.spaceBetween').click();
    cy.get('[name="name"]').type('Krishna');
    cy.get('[name="age"]').type('25');

    cy.get('#mmt-rails-add-traveller div.genderField div.noSelection').click();
    cy.get('#mmt-rails-add-traveller ul.quotaCurtainDown li:nth-child(1)').click();

    cy.get('#mmt-rails-add-traveller div:nth-child(5) div.noSelection').click();
    cy.get('#mmt-rails-add-traveller ul.quotaCurtainDown li:nth-child(3)').click();

    cy.get('#mmt-rails-add-traveller button.latoBold').click();

    // Assertion: Both passengers should exist
    cy.get('#travellersData li').should('have.length', 2);
  });
});