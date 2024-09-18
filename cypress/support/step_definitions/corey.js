const { Given } = require('@badeball/cypress-cucumber-preprocessor')


// TODO: Update to use mapping for table selector at docs/assets/mappings.js
/**
 * @module ExternalModules
 * @author Corey DeBacker <debacker@wisc.edu>
 * @example I enable the module named {string} with version {string}
 * @param {string} moduleName - the name of the module
 * @param {string} version - the version of the module, exactly as it appears in the dropdown, e.g. "v1.0"
 * @description With the Available Modules modal open, selects the specified version of the module and clicks the Enable button
 */
Given("I click to enable the module named {string} with version {string}", (moduleName, version) => {
	cy.get('table#external-modules-disabled-table').should('be.visible').then(($el) => {
        // Select the appropriate version from the dropdown
        cy.wrap($el).find(`tr:contains(${moduleName})`).find('select').select(version);
        // Click the Enable button
        cy.wrap($el).find(`tr:contains(${moduleName})`).find('button:contains("Enable")').click();
    })
})

/**
 * @description Macro
 */
Given("I enable the External Module named {string} with version {string}", (moduleName, version) => {
    // Navigate to Control Panel
})
  
/**
 * @description Placeholder generic for entering text into fields until I can figure out how to use existing steps.
 * Existing text is not cleared before entering new text.
 */
Given("II enter {string} into the field labeled {string}", (text, label) => {
    // Find visible elements containing the text and not containing any visible children that also contain the text
    // cy.get(`:contains(${label}):visible:not(:has(:contains(${label}):visible))`)
    // cy.contains(`:visible:not(:has(:contains(Working...)))`, "Working...");

    cy.findVisibleText(label)
        .closest(':has(input[type="text"]:visible,textarea:visible):visible')
        .find('input[type="text"]:visible,textarea:visible')
        .first()
        .type(text, {parseSpecialCharSequences: false});
})

Given("II select {string} from the dropdown labeled {string}", (text, label) => {
    cy.findVisibleText(label)
        .closest(':has(select:visible):visible')
        .find('select:visible')
        .first()
        .select(text);
})

// Assumes radio inputs have corresponding <label> as immediate siblings, seems to hold true across REDCap at a glance
Given("II choose {string} from the radio buttons labeled {string}", (text, label) => {
    cy.findVisibleText(label)
        .closest(':has(input[type="radio"]:visible):visible')
        .find('input[type="radio"]:visible')
        .filter((_, element) => {
            return Cypress.$(element).next().text().trim() === text;
        })
        .check();
})

Given("II check the box labeled {string}", (label) => {
    cy.findVisibleText(label)
        .closest(':has(input[type="checkbox"]:visible):visible')
        .find('input[type="checkbox"]:visible')
        .first()
        .check();
})

Given("II click the button labeled {string}", (label) => {
    cy.findVisibleText(label)
        .then(($el) => {
            // If the element is a button, click it
            if ($el.is('button')) {
                cy.wrap($el).click();
            }
            // Otherwise, find the closest button and click it
            else {
                cy.wrap($el)
                    .closest(':has(button:visible):visible')
                    .find('button:visible')
                    .first()
                    .click();
            }
        })
})

Given("II click the link labeled {string}", (label) => {
    cy.findVisibleText(label)
        .then(($el) => {
            // If the element is a link, click it
            if ($el.is('a')) {
                cy.wrap($el).click();
            }
            // Otherwise, find the closest link and click it
            else {
                cy.wrap($el)
                    .closest(':has(a:visible):visible')
                    .find('a:visible')
                    .first()
                    .click();
            }
        })
})

Given("II should see {string}", (text) => {
    cy.findVisibleText(text, false);
})

Given("the element(s) selected by {string} should have the style {string} with the value {string}", (selector, property, value) => {
    cy.get(selector)
        .should('have.css', property, value);
})

Given("II wait {int} milliseconds", (ms) => {
    cy.wait(ms);
})

Cypress.Commands.add('findVisibleText', (text, exactMatch = true) => {
    cy.get('body')
        .find('*')
        .filter((_, element) => {
            const $element = Cypress.$(element);
            
            // Check if the element directly contains the exact text
            const directTextMatch = $element.contents().filter(function () {
                if (exactMatch) {
                    return this.nodeType === 3 &&
                        this.nodeValue.trim() === text;
                } else {
                    return this.nodeType === 3 &&
                        this.nodeValue.includes(text);
                }
            }).length > 0;
  
            // Ensure the element is visible and directly contains the text
            return directTextMatch && $element.is(':visible');
        })
        .should((visibleElements) => {
            expect(visibleElements.length, `Expected at least one visible element containing text: "${text}"`).to.be.greaterThan(0);
        });
});

// Provides a way to enable or disable external modules without having to use the GUI, currently requires current user to be admin
Cypress.Commands.add('toggle_external_module', (moduleName, version, enable = true) => {
    cy.window().then((win) => {
        // Get CSRF token from the window object
        const csrfToken = win.redcap_csrf_token;

        if (enable) {
            // Make a request to enable the module
            cy.request({
                method: 'POST',
                url: '/redcap_v' + Cypress.env('redcap_version') + '/ExternalModules/manager/ajax/enable-module.php',
                form: true,
                body: {
                    prefix: moduleName,
                    version: version,
                    redcap_csrf_token: csrfToken
                }
            })
                .then((response) => {
                    const body = JSON.parse(response.body);
                    expect(body.message).to.eq('success');
                })
        } else {
            // Make a request to disable the module
            cy.request({
                method: 'POST',
                url: '/redcap_v' + Cypress.env('redcap_version') + '/ExternalModules/manager/ajax/disable-module.php',
                form: true,
                body: {
                    module: moduleName,
                    redcap_csrf_token: csrfToken
                }
            })
                .then((response) => {
                    // Response seems to always have 200 status, so check for success message in body
                    expect(response.body).to.eq('success');
                })
        }
    });
})

// Before running any steps, enable the modules specified in the environment variable
before(() => {
    const modules = Cypress.env('external_modules');

    // Log in as admin
    cy.set_user_type('admin');
    cy.fetch_login();

    modules.forEach((mod) => {
        cy.toggle_external_module(mod.name, mod.version, mod.enabled);
    });
})