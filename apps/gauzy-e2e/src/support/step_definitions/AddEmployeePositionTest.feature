Feature: Add employee position
  Scenario: Login with email
    Given Login with default credentials
  Scenario: Add new employee position
    Then User can go to Employee positions page
    And User will see grid button
    And User can click on second grid button to change view
    And User can see Add new position button
    When User click on Add new position button
    Then User can see new position input
    And User can add data for new position
    And User can see tag multi-select
    When User click on tag multi-select
    Then User can pick tag from dropdown menu
    And User can see save position button
    When User click on save position button
    Then Notification message will appear
  Scenario: Еdit employee position
    When User selects position to edit
    When User click on table position row
    Then User can see edit newly position button
    When User click on edit new position button
    Then User can edit previously created position
    And User can see tag multi-select
    When User click on tag multi-select
    Then User can pick tag from dropdown menu
    And User can see update position button
    When User click on update position button
    Then Notification message will appear
  Scenario: Delete employee position
    When User selects position to delete
    And User can see delete position button
    When User click on delete position button
    Then User can see confirm delete button
    When User click on confirm delete button
    And User will see a notification message
