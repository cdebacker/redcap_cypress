Feature: Troubleshoot User Rights

  As a REDCap end user
  I want to see that Assign User Rights is functioning as expected

  
  Scenario: Project Setup - 1 
    Given I am an "admin" user who logs into REDCap
    And I create a project named "TestProject" with project purpose Practice / Just for fun via CDISC XML import from fixture location "cdisc_files/core/07_DesignForms_v1115.xml"
    And I create a project named "SecondProject_1115v2" with project purpose Practice / Just for fun via CDISC XML import from fixture location "cdisc_files/core/07_DesignForms_v1115.xml"