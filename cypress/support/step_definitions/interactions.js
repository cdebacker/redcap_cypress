import { Given } from "cypress-cucumber-preprocessor/steps";
import { defineParameterType } from "cypress-cucumber-preprocessor/steps";

/**
 * @module Interactions
 * @author Adam De Fouw <aldefouw@medicine.wisc.edu>
 * @example I click on the button labeled exactly {string}
 * @param {string} text - the EXACT text on the button element you want to click
 * @description Clicks on a button element with a EXACT text label.
 */
Given("I click on the button labeled exactly {string}", (text) => {
    cy.get('button').contains(new RegExp("^" + text + "$", "g")).click()
})

/**
 * @module Interactions
 * @author Adam De Fouw <aldefouw@medicine.wisc.edu>
 * @example I click on the button labeled {string}
 * @param {string} text - the text on the button element you want to click
 * @description Clicks on a button element with a specific text label.
 */
Given("I click on the button labeled {string}", (text) => {
    cy.get('button').contains(text).click()
})

/**
 * @module Interactions
<<<<<<< HEAD
 * @author Rushi Patel <rushi.patel@uhnresearch.ca>
 * @example I close popup
 * @description Closes popup with button labeled "Close"
 */
 Given("I close popup", (text) => {
    cy.focused().should('have.text', 'Close').click()
=======
 * @author Tintin Nguyen <tin-tin.nguyen@nih.gov>
 * @example I click on the button titled {string} for the {string} category
 * @param {string} text - the text on the button element you want to click
 * @param {string} category - the text on the table row of the button you want to click
 * @description Clicks on a button element with a specific text title inside the table row labeled category
 */
Given("I click on the button titled {string} for the {string} category", (text, category) => {
    // Find the cell that contains the Category label and find the parent
    cy.get('td').contains(category).parents('tr').within(() => {
        // Find the button element
        cy.get('button[title="' + text +'"]').click()
    })
>>>>>>> upstream/v11.1.5
})

/**
 * @module Interactions
<<<<<<< HEAD
 * @author Rushi Patel <rushi.patel@uhnresearch.ca>
 * @example I click on the button labeled Save & Stay
 * @param {string} text - the text on the button element you want to click
 * @description Clicks on a button element with a specific text label.
 */
 Given("I click on the button labeled Save & Stay", () => {
    cy.get('button#submit-btn-dropdown').first().click()
	.closest('div').find('a#submit-btn-savecontinue').should('be.visible').click()
=======
 * @author Adam De Fouw <aldefouw@medicine.wisc.edu>
 * @example I click on the button labeled {string} in the dialog box
 * @param {string} text - the text on the button element you want to click
 * @description Clicks on a button element with a specific text label in a dialog box.
 */
Given("I click on the button labeled {string} in the dialog box", (text) => {
    cy.get('div[role="dialog"]').within(() => {
        cy.get('button').contains(text).click()
    })
    
>>>>>>> upstream/v11.1.5
})

/**
 * @module Interactions
 * @author Adam De Fouw <aldefouw@medicine.wisc.edu>
 * @example I click on the link labeled {string}
 * @param {string} text - the text on the anchor element you want to click
 * @description Clicks on an anchor element with a specific text label.
 */
Given("I click on the link labeled {string}", (text) => {
    cy.get('a').contains(text).should('be.visible').click({force:true})
})

/**
 * @module Interactions
 * @author Adam De Fouw <aldefouw@medicine.wisc.edu>
 * @example I click on the input button labeled {string}
 * @param {string} text - the text value of the input element you want to click
 * @description Clicks on an input element with a specific text label.
 */
Given("I click on the input button labeled {string}", (text) => {
    cy.get('input[value="' + text + '"]').click()
})

/**
 * @module Interactions
 * @author Adam De Fouw <aldefouw@medicine.wisc.edu>
 * @example I edit the field labeled {string}
 * @param {string} text - the text value of the label associated with a specific field
 * @description Edits a field in the Online Designer by its specified field label.
 */
Given("I edit the field labeled {string}", (text) => {
    cy.edit_field_by_label(text)
})

/**
 * @module Interactions
 * @author Adam De Fouw <aldefouw@medicine.wisc.edu>
 * @example I mark the field required
 * @description Marks a field as required within the Online Designer.
 */
Given("I mark the field required", () => {
    cy.get('input#field_req1').click()
})

/**
 * @module Interactions
 * @author Adam De Fouw <aldefouw@medicine.wisc.edu>
 * @example I save the field
 * @description Saves a Field within the Online Designer.
 */
Given("I save the field", () => {
    cy.save_field()
})

/**
 * @module Interactions
 * @author Adam De Fouw <aldefouw@medicine.wisc.edu>
 * @example I enter {string} into the field labeled {string}
 * @param {string} text - the text to enter into the field
 * @param {string} label - the label of the field
 * @description Enters a specific text string into a field identified by a label.  (NOTE: The field is not automatically cleared.)
 */
Given('I enter {string} into the field labeled {string}', (text, label) => {
    //We locate the label element first.  This isn't always a label which is unfortunate, but this approach seems to work so far.
    cy.contains(label).then(($label) => {
        //We are finding the parent of the label element and then looking for nearest input
        cy.wrap($label).parent().find('input').type(text)
    })
})

/**
 * @module Interactions
 * @author Adam De Fouw <aldefouw@medicine.wisc.edu>
 * @example I clear the field labeled {string}
 * @param {string} label - the label of the field to select
 * @description Clears the text from an input field based upon its label
 */
Given('I clear the field labeled {string}', (label) => {
    cy.contains(label).then(($label) => {
        cy.wrap($label).parent().find('input').clear()
    })
})

/**
 * @module Interactions
 * @author Adam De Fouw <aldefouw@medicine.wisc.edu>
 * @example I click on the table cell containing a link labeled {string}
 * @param {string} text - the text in the table cell
 * @description Clicks on a table cell that is identified by a particular text string specified.
 */
Given('I click on the table cell containing a link labeled {string}', (text) => {
    cy.get('td').contains(text).parent().find('a').click()
})

/**
 * @module Interactions
 * @author Adam De Fouw <aldefouw@medicine.wisc.edu>
 * @example I select {string} from the dropdown identified by {string}
 * @param {string} value - the option to select from the dropdown
 * @param {string} label - the label of the dropdown to choose an option from
 * @description Selects a dropdown by its label and the option via a specific string.
 */
Given('I select {string} from the dropdown identified by {string}', (value,label) => {
    cy.get(label).select(value, { force: true })
})

<<<<<<< HEAD
Given("I click on the element identified by {string}", (sel) => {
    cy.get(sel).click()
=======
/**
 * @module Interactions
 * @author Tintin Nguyen <tin-tin.nguyen@nih.gov>
 * @example I select {string} from the dropdown identified by {string} for the {string} category
 * @param {string} value - the option to select from the dropdown
 * @param {string} sel - the selector of the dropdown to choose an option from
 * @param {string} category - the label of the table row to choose an option from
 * @description Selects a dropdown by its table row name, label, and the option via a specific string.
 */
Given("I select {string} from the dropdown identified by {string} for the {string} category", (value, sel, category) => {
    // Find the cell that contains the Category label and find the parent
    cy.get('td').contains(category).parents('tr').within(() => {
        //cy.get(sel).contains(value).parents("select").select(value, { force: true })
        cy.contains(sel, value).then(($label) => {
            cy.wrap($label).select(value, {force: true})
        })
    })
>>>>>>> upstream/v11.1.5
})

defineParameterType({
    name: 'element_type',
    regexp: /element|checkbox/
})
/**
 * @module Interactions
 * @author Corey Debacker <debacker@wisc.edu>
 * @example When I click on the < element | checkbox > identified by {string}
 * @param {string} element_type - valid choices are 'element' OR 'checkbox'
 * @param {string} selector - the selector of the element to click on
 * @description Clicks on an element identified by specific selector
 */
Given("I click on the {element_type} identified by {string}", (type, selector) => {
    cy.get(selector).click()
})

/**
 * @module Interactions
 * @author Corey Debacker <debacker@wisc.edu>
 * @example I enter {string} into the field identified by {string}
 * @param {string} text - the text to enter into the field
 * @param {string} selector - the selector of the element to enter the text into
 * @description Enter text into a specific field
 */
Given("I enter {string} into the field identified by {string}", (text, sel) => {
    cy.get(sel).type(text)
})

/**
 * @module Interactions
 * @author Adam De Fouw <aldefouw@medicine.wisc.edu>
 * @example I click on the checkbox labeled {string}
 * @param {string} label - the label associated with the checkbox field
 * @description Selects a checkbox field by its label
 */
Given("I click on the checkbox labeled {string}", (label) => {
    cy.contains(label).then(($label) => {
        cy.wrap($label).parent().find('input').click()
    })
})

/**
 * @module Interactions
 * @author Adam De Fouw <aldefouw@medicine.wisc.edu>
 * @example I click on the input element labeled {string}
 * @param {string} label - the label associated with the checkbox field
 * @description Selects a checkbox field by its label
 */
Given("I click on the input element labeled {string}", (label) => {
    cy.contains(label).then(($label) => {
        cy.wrap($label).parent().find('input').click()
    })
})

/**
 * @module Interactions
 * @author Tintin Nguyen <tin-tin.nguyen@nih.gov>
 * @example I enter {string} into the input field named {string} for the {string} category
 * @param {string} text - the text to enter into the input field
 * @param {string} label - the name of the input field to type
 * @param {string} category - the label of the table row to choose an option from
 * @description Selects an input field by its row name, input name, and types the text to the input field
 */
Given('I enter {string} into the input field named {string} for the {string} category', (text, label, category) => {
    // Method is because the input on Edit Reports doesn't have a label
    // Find the cell that contains the Category label and find the parent
    cy.get('td').contains(category).parents('tr').within(() => {
        cy.get('input[name="' + label +'"]').type(text)
    })
})


defineParameterType({
    name: 'confirmation',
    regexp: /accept|cancel/
})
/**
 * @module Interactions
 * @author Adam De Fouw <aldefouw@medicine.wisc.edu>
 * @example after the next step, I will <accept/cancel> a confirmation window containing the text {string}
 * @param {string} action - valid choices are 'accept' OR 'cancel'
 * @param {string} window_text - text that is expected to appear in the confirmation window
 * @description Pre-emptively tell Cypress what to do about a confirmation window.  NOTE: This step must come BEFORE step that clicks button.
 */
Given('after the next step, I will {confirmation} a confirmation window containing the text {string}', (action, window_text) => {
    cy.on('window:confirm', (str) => {
        expect(str).to.contain(window_text)
        action === "accept"
    })
})


/**
 * @module Interactions
 * @author Rushi Patel <rushi.patel@uhnresearch.ca>
 * @example I select the option labelled {string}
 * @param {string} value - the option to select from the dropdown
 * @description Selects the option via a specific string.
 */
 Given('I select the option labeled {string}', (text) => {
    cy.get('a').contains(text).should('be.visible').click()
})

/**
 * @module Interactions
 * @author Rushi Patel <rushi.patel@uhnresearch.ca>
 * @example I export all data in {string} format
 * @param {string} value - the option to select from the dropdown
 * @description Selects the option via a specific string.
 */
 Given('I export all data in {string} format', (value) => {
    cy.get('tr#reprow_ALL').find('button.data_export_btn').should('be.visible').contains('Export Data').click()
    cy.get('input[value='+value+']').click()
    cy.export_csv_report().should((csv) => {
        expect([...new Set(csv.map((row) => row[0]).slice(1))]).to.have.lengthOf(2)                     // 2 records
    })
})

