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
        cy.wrap($el).find(`tr:contains(${moduleName})`).find('select').select(version)
        // Click the Enable button
        cy.wrap($el).find(`tr:contains(${moduleName})`).find('button:contains("Enable")').click()
    })
})

/**
 * @description Macro
 */
Given("I enable the External Module named {string} with version {string}", (moduleName, version) => {
    // Navigate to Control Panel
})


// Before running any steps, make AJAX requests to enable the modules specified in the environment variable
before(() => {
    // Get the list of modules from the environment variable
    const modules = Cypress.env('external_modules');

    // Log in as admin and get CSRF token
    cy.set_user_type('admin');
    cy.fetch_login();
    
    cy.window().then((win) => {

        // Get the CSRF token from the window object
        const csrfToken = win.redcap_csrf_token;

        // Iterate over each module to enable or disable
        modules.forEach((mod) => {
            if (mod.enabled) {
                // Make a POST request to enable the module
                cy.request({
                    method: 'POST',
                    url: '/redcap_v' + Cypress.env('redcap_version') + '/ExternalModules/manager/ajax/enable-module.php',
                    form: true,
                    body: {
                        prefix: mod.name,
                        version: mod.version,
                        redcap_csrf_token: csrfToken
                    }
                })
                    .then((response) => {
                        const body = JSON.parse(response.body);
                        expect(body.message).to.eq('success');
                    })
            } else {
                // Make a POST request to disable the module
                cy.request({
                    method: 'POST',
                    url: '/redcap_v' + Cypress.env('redcap_version') + '/ExternalModules/manager/ajax/disable-module.php',
                    form: true,
                    body: {
                        module: mod.name,
                        redcap_csrf_token: csrfToken
                    }
                })
                    .then((response) => {
                        // Response seems to always return 
                        expect(response.body).to.eq('success');
                    })
            }
        })
    });
})