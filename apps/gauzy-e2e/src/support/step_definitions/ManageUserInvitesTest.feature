Feature: Manage user invites test

  Scenario: Login with email
    Given Login with default credentials and visit Users page
    Then User can visit Candidates invites page

  Scenario: Create new invite
    Then User can see manage invites button
    When User click on manage invites button
    Then User will see grid button
    And User can click on second grid button to change view
    And User can see invite button
    When User click on invite button
    And User can see email input field
    And User can enter value for email
    And User can see date input field
    And User can enter value for date
    When User can see roles select
    Then User click on roles select
    When User can see roles dropdown
    Then User click see roles dropdown
    Then User can see invitation expiration select
    When User clicks invitation expiration select
    Then User can see invitation expiration dropdown
    And User selects invitation expiration option
    And User can see save button
    When User click on save button
    Then Notification message will appear

  Scenario: Resend invite
    When User click on invites table row with "INVITED" status
    Then Resend invite button will become active
    When User click on resend invite button
    Then User can see confirm resend invite button
    When User click on confirm resend invite button
    Then Notification message will appear

  Scenario: Copy invite
    And User can see invites table
    When User click on invites table row with "INVITED" status
    Then Copy invite button will become active
    When User click on copy invite button
    Then Notification message will appear

  Scenario: Delete invite
    When User click on invites table row with "INVITED" status
    Then Delete button will become active
    When User click on delete button
    Then User can see confirm delete button
    When User click on confirm delete button
    Then Notification message will appear
