const BasePage = require('./BasePage');

/**
 * Railway Booking Page Object
 * Contains all locators and methods for railway booking flow
 */
class RailwayBookingPage extends BasePage {
  constructor() {
    super();
    // Modal and Navigation Selectors
    this.closeModalBtn = '[data-cy="closeModal"]';
    this.minimizeBtn = 'img[alt="minimize"]';
    this.railwayTab = 'li:nth-of-type(5) [data-cy="item-wrapper"] a.column';

    // Search Form Selectors
    this.fromCityField = '[data-cy="fromCity"]';
    this.fromCityInput = '[data-cy="RailSearchWidget_338"] input.react-autosuggest__input';
    this.toCityInput = '[data-cy="RailSearchWidget_339"] input.react-autosuggest__input';
    this.cityOption = '.sr_city';
    this.dateField = '[data-cy="RailSearchWidget_340"] div[aria-label="Sat Feb 14 2026"]';
    this.searchBtn = '[data-cy="submit"]';

    // Filters Selectors
    this.quotaLabel = 'label[for="General Quota"] div.flexOne';
    this.quotaCheckbox = '#General\\ Quota';
    this.classLabel = 'label[for="AC"] b';
    this.classCheckbox = '#AC';
    this.departureTimeFilter = 'div:nth-of-type(5) [data-testid="filter-option-12am - 6am"] div.FilterTabs_tabSection__0k758';

    // Train Selection Selectors
    this.trainCard = '[data-testid="listing-card"]';
    this.bookTrainBtn = '#root a.spaceBetween';

    // Passenger Details Selectors
    this.nameInput = '[name="name"]';
    this.ageInput = '[name="age"]';
    this.genderField = '#mmt-rails-add-traveller div.genderField div.noSelection';
    this.genderOption = '#mmt-rails-add-traveller ul.quotaCurtainDown li:nth-child(1) span.appendRight30';
    this.berthPreference = '#mmt-rails-add-traveller div:nth-child(5) div.noSelection';
    this.berthOption = '#mmt-rails-add-traveller ul.quotaCurtainDown li:nth-child(3)';
    this.addPassengerBtn = '#mmt-rails-add-traveller button.latoBold';

    // Edit Passenger Selectors
    this.editPassenger = '#travellersData li:nth-child(2) span.editBtn';
    this.editBtn = '#mmt-rails-edit-traveller a.editBtn';
    this.removePassenger = '#travellersData li:nth-child(2) span.active';

    // Contact Details Selectors
    this.emailInput = '[name="email id"]';
    this.mobileInput = '[name="Mobile Number"]';
    this.paymentSection = '#root section.leftSection';

    // Payment Selectors
    this.radioBox = '#root li.radioBox > label';
    this.couponInput = '#root [name="coupon"]';
    this.proceedBtn = '#root a.whiteText span';

    // GST Selectors
    this.gstInfo = '[data-cy="dt_state_gst_info"]';
    this.gstActiveItem = '[data-cy="dt_gstn_container"] li.activeItem';
    this.gstCheckbox = '[data-cy="dt_cb_input_container_gst_info"] b';

    // Booking Summary
    this.bookingSummary = 'li:nth-of-type(6) [data-cy="item-wrapper"] span.headerIconWrapper';
    this.jsonData = 'div.json-formatter-container';
  }

  /**
   * Close initial modal popup
   * Command: cy.get().click()
   * Assertion: Modal should be closed
   */
  closeInitialModal() {
    // cy.get() - Gets the close modal button element
    cy.get(this.closeModalBtn).click();
    // .should('not.be.visible') - Assert modal is closed
    cy.get(this.closeModalBtn).should('not.exist');
  }

  /**
   * Navigate to railway booking
   * Command: cy.get().click()
   */
  navigateToRailway() {
    // cy.get() - Gets the minimize button
    cy.get(this.minimizeBtn).click();
    // cy.get() - Gets and clicks the railway tab
    cy.get(this.railwayTab).click();
  }

  /**
   * Search for trains
   * Command: cy.get().click(), cy.get().type()
   * @param {string} fromCity - Departure city
   * @param {string} toCity - Arrival city
   * @param {string} date - Date in "Sat Feb 14 2026" format
   */
  searchTrains(fromCity, toCity) {
    // cy.get() - Gets the from city field and clicks
    cy.get(this.fromCityField).click();
    // cy.get().type() - Types the departure city
    cy.get(this.fromCityInput).type(fromCity);
    // cy.get().contains() - Finds and clicks the city option
    cy.get(this.cityOption).contains(fromCity).click();

    // cy.get().type() - Types the destination city
    cy.get(this.toCityInput).type(toCity);
    // cy.get().contains() - Finds and clicks the destination city option
    cy.get(this.cityOption).contains(toCity).click();

    // cy.get() - Gets and clicks the date field
    cy.get(this.dateField).click();
  }

  /**
   * Apply filters for quota and class
   * Command: cy.get().click()
   * Assertion: Filters should be applied and visible
   */
  applyFilters() {
    // cy.get().click() - Clicks quota filter
    cy.get(this.quotaLabel).click();
    // cy.get().check() - Checks the General Quota checkbox
    cy.get(this.quotaCheckbox).check({ force: true });

    // cy.get().click() - Clicks class filter
    cy.get(this.classLabel).click();
    // cy.get().check() - Checks the AC checkbox
    cy.get(this.classCheckbox).check({ force: true });

    // cy.get().click() - Applies departure time filter
    cy.get(this.departureTimeFilter).click();

    // Assertion: .should('be.checked') - Assert filters are applied
    cy.get(this.quotaCheckbox).should('be.checked');
    cy.get(this.classCheckbox).should('be.checked');
  }

  /**
   * Select first available train
   * Command: cy.get().click()
   * Assertion: Train selection should be visible
   */
  selectFirstTrain() {
    // cy.get() - Gets the first train card
    cy.get(this.trainCard).first().within(() => {
      cy.get('[data-testid="availability-text"]').click();
    });
    // Assertion: .should('be.visible') - Assert train is selected
    cy.get(this.trainCard).first().should('be.visible');
  }

  /**
   * Add passenger details
   * Command: cy.get().type()
   * @param {string} name - Passenger name
   * @param {string} age - Passenger age
   */
  addPassenger(name, age) {
    // cy.get().click() - Clicks the add passenger button
    cy.get(this.bookTrainBtn).click();

    // cy.get().type() - Types passenger name
    cy.get(this.nameInput).click();
    cy.get(this.nameInput).type(name);

    // cy.get().type() - Types passenger age
    cy.get(this.ageInput).click();
    cy.get(this.ageInput).type(age);

    // cy.get().click() - Selects gender
    cy.get(this.genderField).click();
    cy.get(this.genderOption).click();

    // cy.get().click() - Selects berth preference
    cy.get(this.berthPreference).click();
    cy.get(this.berthOption).click();

    // cy.get().click() - Confirms passenger addition
    cy.get(this.addPassengerBtn).click();

    // Assertion: .should('have.value') - Assert name is entered
    cy.get(this.nameInput).should('have.value', name);
    // Assertion: .should('have.value') - Assert age is entered
    cy.get(this.ageInput).should('have.value', age);
  }

  /**
   * Edit passenger details
   * Command: cy.get().click()
   */
  editPassengerDetails() {
    // cy.get().click() - Clicks edit button for second passenger
    cy.get(this.editPassenger).click();
    cy.get(this.editBtn).click();

    // Assertion: .should('be.visible') - Assert edit form is visible
    cy.get(this.nameInput).should('be.visible');
  }

  /**
   * Remove a passenger
   * Command: cy.get().click()
   * Assertion: Passenger should be removed from list
   */
  removePassengerFromList() {
    // cy.get().click() - Clicks remove button for second passenger
    cy.get(this.removePassenger).click();

    // Assertion: List should update after removal
    cy.get('#travellersData li').should('have.length.lessThan', 2);
  }

  /**
   * Fill contact details
   * Command: cy.get().type()
   * @param {string} email - Email address
   * @param {string} mobile - Mobile number
   */
  fillContactDetails(email, mobile) {
    // cy.get().type() - Types email address
    cy.get(this.emailInput).click();
    cy.get(this.emailInput).type(email);

    // cy.get().type() - Types mobile number
    cy.get(this.mobileInput).click();
    cy.get(this.mobileInput).type(mobile);

    // Assertion: .should('have.value') - Assert email is entered
    cy.get(this.emailInput).should('have.value', email);
    // Assertion: .should('have.value') - Assert mobile is entered
    cy.get(this.mobileInput).should('have.value', mobile);
  }

  /**
   * Complete payment
   * Command: cy.get().click()
   * Assertion: Payment section should be filled
   */
  completePayment() {
    // cy.get().click() - Clicks payment section
    cy.get(this.paymentSection).click();

    // cy.get().click() - Selects payment option
    cy.get(this.radioBox).click();

    // cy.get().click() - Applies coupon
    cy.get(this.couponInput).click();

    // Assertion: .should('be.visible') - Assert payment options are visible
    cy.get(this.radioBox).should('be.visible');
  }

  /**
   * Fill GST information
   * Command: cy.get().click()
   * Assertion: GST details should be filled
   */
  fillGSTInfo() {
    // cy.get().click() - Clicks GST info
    cy.get(this.gstInfo).click();
    // cy.get().click() - Selects active GST item
    cy.get(this.gstActiveItem).click();
    // cy.get().click() - Checks GST checkbox
    cy.get(this.gstCheckbox).click();

    // Assertion: .should('be.checked') - Assert GST checkbox is checked
    cy.get(this.gstCheckbox).should('be.checked');
  }

  /**
   * Proceed to booking confirmation
   * Command: cy.get().click()
   * Assertion: Page should navigate to confirmation
   */
  proceedToConfirmation() {
    // cy.get().click() - Clicks proceed button
    cy.get(this.proceedBtn).click();

    // Assertion: URL should contain booking confirmation
    cy.url().should('include', 'confirmation');
  }

  /**
   * View booking summary
   * Command: cy.get().click()
   * Assertion: Booking summary should be visible
   */
  viewBookingSummary() {
    // cy.get().click() - Clicks booking summary
    cy.get(this.bookingSummary).click();
    // cy.get().click() - Views JSON data
    cy.get(this.jsonData).click();

    // Assertion: .should('be.visible') - Assert booking data is visible
    cy.get(this.jsonData).should('be.visible');
  }
}

module.exports = RailwayBookingPage;
