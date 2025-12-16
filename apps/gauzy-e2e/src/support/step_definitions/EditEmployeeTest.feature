Feature: Edit employee test

  Scenario: Login with default credentials and prepare employee
    Given Login with default credentials
    And User adds a new employee with random data
    And User adds project, tag, and contact

  Scenario: Edit account data
    When User selects the employee
    And User edits account data (username, email, first name, last name, language)

  Scenario: Edit network data
    When User edits network data (LinkedIn, GitHub, Upwork)

  Scenario: Edit employment data
    When User edits employment data (description)

  Scenario: Edit hiring data
    When User edits hiring data (offer date, accept date)

  Scenario: Edit location data
    When User edits location data (country, city, postcode, street)

  Scenario: Edit rates data
    When User edits rates data (pay period, weekly limit, bill rate)

  Scenario: Edit projects data
    When User adds project to employee

  Scenario: Edit contacts data
    When User adds contact to employee
    Then Employee data should be saved successfully
