Feature: Railway Booking on MakeMyTrip
  As a user
  I want to book a train ticket on MakeMyTrip
  So that I can travel from one city to another

  Background:
    Given User is on the MakeMyTrip homepage
    And User closes the initial modal popup

  Scenario: Book a train ticket with passenger details
    When User navigates to railway booking section
    And User searches for trains from "Bengaluru" to "Chennai" for "14-02-2026"
    And User applies filters for General Quota and AC class
    And User selects the first available train
    Then User should see the train selection confirmation

  Scenario: Add multiple passengers and complete booking
    When User navigates to railway booking section
    And User searches for trains from "Bengaluru" to "Chennai" for "14-02-2026"
    And User applies filters for General Quota and AC class
    And User selects the first available train
    And User adds first passenger with name "Abhishek K M" and age "23"
    And User selects gender and berth preference for passenger
    And User adds second passenger with name "Krishna" and age "25"
    And User selects gender and berth preference for second passenger
    Then Passengers should be added to the booking list

  Scenario: Manage passenger details
    When User navigates to railway booking section
    And User searches for trains from "Bengaluru" to "Chennai" for "14-02-2026"
    And User applies filters for General Quota and AC class
    And User selects the first available train
    And User adds first passenger with name "Abhishek K M" and age "23"
    And User adds second passenger with name "Krishna" and age "25"
    And User edits the second passenger details
    Then The edit form should be displayed

  Scenario: Fill contact and payment information
    When User navigates to railway booking section
    And User searches for trains from "Bengaluru" to "Chennai" for "14-02-2026"
    And User applies filters for General Quota and AC class
    And User selects the first available train
    And User adds first passenger with name "Abhishek K M" and age "23"
    And User fills contact details with email "test@gmail.com" and mobile "8384847827"
    And User selects payment method
    And User fills GST information
    Then Booking details should be ready for confirmation

  Scenario: Complete full train booking journey
    When User navigates to railway booking section
    And User searches for trains from "Bengaluru" to "Chennai" for "14-02-2026"
    And User applies filters for General Quota and AC class
    And User selects the first available train
    And User adds first passenger with name "Abhishek K M" and age "23"
    And User adds second passenger with name "Krishna" and age "25"
    And User fills contact details with email "test@gmail.com" and mobile "8384847827"
    And User selects payment method
    And User fills GST information
    Then User should be able to view the booking summary
