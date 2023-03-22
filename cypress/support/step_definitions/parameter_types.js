import { defineParameterType } from "cypress-cucumber-preprocessor/steps";
import { ordinal_to_int } from '../core/commands.js'

// This file contains definitions for custom parameter types used in step definitions.
// Parameter type definitions have been consolidated here for easier reference and to avoid duplication.
// This should also make it easier to identify when refactoring/merging is appropriate.
// Comments indicate where the parameter type is used.

// design_forms.js
defineParameterType({
    name: 'addField',
    regexp: /(Add Field|Add Matrix of Fields|Import from Field Bank)/
})

// record_status_dashboard.js
defineParameterType({
    name: 'add_or_select',
    regexp: /add|select/
})

// record_status_dashboard.js
defineParameterType({
    name: 'cell_action',
    regexp: /and click the new instance link|and click on the bubble|and click the repeating instrument bubble for the first instance|and click the repeating instrument bubble for the second instance|and click the repeating instrument bubble for the third instance/
})

// visibility.js
defineParameterType({
    name: 'check',
    regexp: /checked|unchecked/
})

// interactions.js
defineParameterType({
    name: 'checkbox_field_type',
    regexp: /checkbox|checkbox in table/
})

// development_only.js
defineParameterType({
    name: 'clickable',
    regexp: /(link|button|checkbox|radio)/ //add more as needed
})

// interactions.js
defineParameterType({
    name: 'click_type',
    regexp: /click on|check|uncheck/
})

// interactions.js
defineParameterType({
    name: 'confirmation',
    regexp: /accept|cancel/
})

// user_rights.js
defineParameterType({
    name: 'data_viewing_rights',
    regexp: /No Access|Read Only|View & Edit|Edit survey responses/
})

// interactions.js
defineParameterType({
    name: 'dropdown_type',
    regexp: /field|table field/
})

// design_forms.js
defineParameterType({
    name: 'editField',
    regexp: /(Edit|Branching Logic|Copy|Move|Delete Field)/
})

// interactions.js
defineParameterType({
    name: 'elm_type',
    regexp: /input|list item|checkbox|span/
})

// interactions.js
defineParameterType({
    name: 'enter_type',
    regexp: /enter|clear field and enter/
})

// design_forms.js
defineParameterType({
    name: 'fieldType',
    regexp: /(Text Box|Notes Box|Drop-down List|Radio Buttons|Checkboxes|Yes - No|True - False|Signature|File Upload|Slider|Descriptive Text|Begin New Section)/
})

// interactions.js
defineParameterType({
    name: 'instrument_save_options',
    regexp: /Save & Stay|Save & Exit Record|Save & Go To Next Record|Save & Exit Form|Save & Go To Next Form|Save & Go To Next Instance/
})

// visibility.js
defineParameterType({
    name: 'LabeledElement',
    regexp: /button|link/
})

// reporting.js
defineParameterType({
    name: 'ordering',
    regexp: /ascending|descending/
})

// interactions.js, temp_109_steps.js
defineParameterType({
    name: 'ordinal',
    regexp: /(?:(first|second|third|fourth|fifth|sixth|seventh|eighth|last) )?/,
    transformer: ordinal_to_int
})

// data_import.js
defineParameterType({
    name: 'project_type',
    regexp: /Practice \/ Just for fun|Operational Support|Research|Quality Improvement|Other/
})

// project_setup.js
defineParameterType({
    name: 'repeatability',
    regexp: /enabled|disabled|modifiable/
})

// visibility.js
defineParameterType({
    name: 'select',
    regexp: /selected|unselected/
})

// project_setup.js, control_center.js
defineParameterType({
    name: 'toggleAction',
    regexp: /enable|disable/
})

// project_setup.js
defineParameterType({
    name: 'toggleStatus',
    regexp: /enabled|disabled/
})

// user_rights.js
defineParameterType({
    name: 'user_right_action',
    regexp: /add|remove/
})
