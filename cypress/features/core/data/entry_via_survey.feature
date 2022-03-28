Feature: Data Entry through the Survey

  As a REDCap end user
  I want to see that Data Entry through the Survey is functioning as expected

  Scenario: An external user visits a public survey
    Given I visit the public survey URL for Project ID 3
    Then I should see "Example Survey" in the title

  Scenario: A standard user enters data into a public survey
    And I visit the public survey URL for Project ID 9
    When I enter "user1@yahoo.com" into the "E-mail address" survey text input field
    And I click on the button labeled "Submit"
    Then I should see "Thank you for taking the survey"
