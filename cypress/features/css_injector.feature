Feature: CSS Injector EM

  As a REDCap end user
  I want to see that the "REDCap CSS Injector" External Module works as expected

  Scenario: Enable module on all projects by default
    Given I login to REDCap with the user "Test_Admin"

    # And II test something

    And II click the link labeled "Control Center"
    And II click the link labeled "Manage"
    # Then I should see "REDCap CSS Injector"
    
    And II click the button labeled "Configure"
    # Then I should see "Configure Module: REDCap CSS Injector"

    And II check the box labeled "Enable module on all projects by default:"
    And II click the button labeled "Save"

    # Then II should see "Enabled for All Projects"
    # Then I should see "Enabled for All Projects" in the table row containing "REDCap CSS Injector"

  Scenario: Create a project
    Given II click the link labeled "New Project"
    And II enter "Test Project" into the field labeled "Project title:"
    And II select "Practice / Just for fun" from the dropdown labeled "Project's purpose:"
    And II click the button labeled "Create Project"

  Scenario: Configure some CSS for the project
    Given II click the link labeled "Manage"
    And II click the button labeled "Configure"
    And II check the box labeled "Enabled:"
    And II choose "All" from the radio buttons labeled "Apply to:"
    # Module seems to convert color codes to rgb format
    # And II enter "button#submit-btn-saverecord {background-color: #fca90d !important;}" into the field labeled "CSS:"
    And II enter "button#submit-btn-saverecord {background-color: rgb(252, 169, 13) !important;}" into the field labeled "CSS:"
    # Specific shade of orange unlikely to be already used by REDCap
    And II click the button labeled "Save"

  Scenario: Create a record and verify the CSS is applied
    # Page reloads after saving config, so need to wait
    Given II wait 500 milliseconds
    Given II click the link labeled "Add / Edit Records"
    And II click the button labeled "Add new record"
    # Then the elements selected by "button#submit-btn-saverecord" should have the style "background-color" with the value "#fca90d"
    Then the elements selected by "button#submit-btn-saverecord" should have the style "background-color" with the value "rgb(252, 169, 13)"
