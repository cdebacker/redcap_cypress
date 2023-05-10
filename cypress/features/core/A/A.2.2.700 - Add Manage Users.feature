Feature: A.2.2.700 Add/Manage users

  As a REDCap end user
  I want to see that Users failed login lockout is functioning as expected.

  Scenario: A.2.2.700.100 User account locked time
    Given I login to REDCap with the user "Test_Admin"
    And I click on the link labeled "Control Center"
    When I click on the link labeled "Security & Authentication"
    Then I should see "Security & Authentication Configuration"
    When I clear the field labeled "Number of failed login attempts before user is locked out for a specified amount of time, which is set below."
    And I enter "1" into the input field labeled "Number of failed login attempts before user is locked out for a specified amount of time, which is set below."
    And I clear the field labeled "Amount of time user will be locked out after having failed login attempts exceeding the limit set above."
    And I enter "1" into the input field labeled "Amount of time user will be locked out after having failed login attempts exceeding the limit set above."
    And I click on the button labeled "Save Changes"
    Then I should see "Your system configuration values have now been changed!"

    #First login attempt with incorrect password
    Given I logout
    Then I should see "Log In"
    When I enter "Test_User1" into the input field labeled "Username:"
    And I enter "test" into the input field labeled "Password:"
    And I click on the button labeled "Log In"
    Then I should see "ERROR: You entered an invalid user name or password!"

    #Second attempt with correct password - but within 1 minute threshold - means we cannot login
    Given I see "Log In"
    And I enter "Test_User1" into the input field labeled "Username:"
    And I enter "Testing123" into the input field labeled "Password:"
    And I click on the button labeled "Log In"
    Then I should see "ACCESS DENIED!"
    And I should see "exceeded the maximum amount of failed login attempts"

    #Third attempt, wait a minute first - then we can proceed as normal
    Given I wait for one minute
    And I visit the REDCap login page
    And I enter "Test_User1" into the input field labeled "Username:"
    And I enter "Testing123" into the input field labeled "Password:"
    And I click on the button labeled "Log In"
    Then I should see a link labeled "My Projects"