import {Given} from "cypress-cucumber-preprocessor/steps";
require('./parameter_types.js')

/**
 * @module DevelopmentOnly
 * @author Adam De Fouw <aldefouw@medicine.wisc.edu>
 * @example I want to pause
 * @description Pauses the Cypress session. NOTE: Should only be used during development of tests.
 */
Given("I want to pause", () => {
    cy.pause()
})

// Compare against the commented-out, less abstract step definitions at the end of the file. I think this is preferable.
Given('I click on the {ordinal}{clickable} near the text {string}', (n, type, text) => {
    //Need to escape double quotes before inserting text into selector
    text = text.replaceAll('\"', '\\\"')
    let subsels = {link: 'a', button: 'button', checkbox: 'input[type=checkbox]', radio: 'input[type=radio]'}
    let subsel = subsels[type] + `:visible:nth(${n})` //'a:visible:nth(0)', 'button:visible:nth(2)', etc.

    //Match visible elements directly containing the text, call this "text container"
    let text_container = `:contains(${text}):not(:has(:contains(${text}))):visible`
    //Match elements containing both the text container, and at least `n` visible elements of type `type`
    let sel = `:has(${text_container}):has(${subsel})`
    //Filter out ancestors
    sel = `${sel}:not(:has(${sel}))`

    cy.get_top_layer(($el) => {expect($el.find(sel)).length.to.be.above(0)})
        .within(() => {
            cy.get(sel).within(() => {
                cy.get(subsel).click()
            })
        })
})

Given('I select {string} from the {ordinal}dropdown near the text {string}', (option, n, text) => {
    //Need to escape double quotes before inserting text into selector
    text = text.replaceAll('\"', '\\\"')
    let subsel = `select:visible:nth(${n})`

    //Match visible elements directly containing the text, call this "text container"
    let text_container = `:contains(${text}):not(:has(:contains(${text}))):visible`
    //Match elements containing both the text container, and at least `n` visible select elements
    let sel = `:has(${text_container}):has(${subsel})`
    //Filter out ancestors
    sel = `${sel}:not(:has(${sel}))`

    cy.get_top_layer(($el) => {expect($el.find(sel)).length.to.be.above(0)})
        .within(() => {
            cy.get(sel).within(() => {
                cy.get(subsel).select(option)
            })
        })
})

// Known issue: Will not always correctly select the text's ancestor with at least n text input elements
// This is because with two subselectors (:text + textarea), the above approach using :has(el:nth(n)) won't work.
// In other words, ':has((:text,textarea):nth(n)' is not a valid selector, and ':has(:text:nth(n),textarea:nth(n))'
// would not count them as desired. We want :has(subsel:nth(n)) where 'subsel' matches the same as ':text,textarea'.
// Unfortunately, the :is() pseudo-class doesn't seem to be working here either: subsel = ':is(textarea,:text)'
// This is because it does not support pseudo-selectors in its argument
// This would probably need to be solved by using some JQuery rather than only using selectors. Very low priority.
Given('I enter {string} into the {ordinal}input field near the text {string}', (input, n, text) => {
    //Need to escape double quotes before inserting text into selector
    text = text.replaceAll('\"', '\\\"')
    let subsel = `:text:visible,textarea:visible`

    //Match visible elements directly containing the text, call this "text container"
    let text_container = `:contains(${text}):not(:has(:contains(${text}))):visible`
    //Match elements containing both the text container, and at least one visible text input or textarea elements
    //Ideally this would only match for at least `n` text input / textarea elements, but there is no way to do this with a selector.
    let sel = `:has(${text_container}):has(${subsel})`
    //Filter out ancestors
    sel = `${sel}:not(:has(${sel}))`

    cy.get_top_layer(($el) => {expect($el.find(sel)).length.to.be.above(0)})
        .within(() => {
            cy.get(sel).within(() => {
                cy.get(subsel).eq(n).clear().type(input)
            })
        })
})

Given('I clear the {ordinal}input field near the text {string}', (n, text) => {
    //Need to escape double quotes before inserting text into selector
    text = text.replaceAll('\"', '\\\"')
    let subsel = `:text:visible,textarea:visible`

    //Match visible elements directly containing the text, call this "text container"
    let text_container = `:contains(${text}):not(:has(:contains(${text}))):visible`
    //Match elements containing both the text container, and at least one visible text input or textarea elements
    //Ideally this would only match for at least `n` text input / textarea elements, but there is no way to do this with a selector.
    let sel = `:has(${text_container}):has(${subsel})`
    //Filter out ancestors
    sel = `${sel}:not(:has(${sel}))`

    cy.get_top_layer(($el) => {expect($el.find(sel)).length.to.be.above(0)})
        .within(() => {
            cy.get(sel).within(() => {
                cy.get(subsel).eq(n).clear()
            })
        })
})