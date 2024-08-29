Feature: CSS Injector EM

  As a REDCap end user
  I want to see that the "REDCap CSS Injector" External Module works as expected

  Scenario: Configure module via Module Manager / Control Center
    Given I login to REDCap with the user "Test_Admin"

    When I click on the link labeled "Control Center"
    And I click on the link labeled exactly "Manage"
    Then I should see "REDCap CSS Injector"
    
   When I click on the button labeled exactly "Configure"
   Then I should see "Configure Module: REDCap CSS Injector"

  Scenario: Hide module from non-admins on projects' lists of enabled modules
    Given I check the box labeled "Hide from non-admins on projects' lists of enabled modules"