window.tableMappings = {
    'a' :'table',
    'logging' : 'table.form_border',
    'browse users' : 'table#sponsorUsers-table',
    'file repository' : 'table#file-repository-table',
    'administrators' : 'table#admin-rights-table',
    'reports' : 'table#table-report_list',
    'report data' : ['div.dataTables_scrollHeadInner table', 'table#report_table'],
    'define events' : 'table#event_table'
}

window.dateFormats = {
    'mm-dd-yyyy': /\d{2}-\d{2}-\d{4}/,
    'yyyy-mm-dd': /\d{4}-\d{2}-\d{2}/,
    'mm-dd-yyyy hh:mm': /\d{2}-\d{2}-\d{4} \d{1,2}:\d{2}/,
    'yyyy-mm-dd hh:mm': /\d{4}-\d{2}-\d{2} \d{1,2}:\d{2}/,
    'mm-dd-yyyy hh:mm:ss': /\d{2}-\d{2}-\d{4} \d{1,2}:\d{2}:\d{2}/,
    'yyyy-mm-dd hh:mm:ss': /\d{4}-\d{2}-\d{2} \d{1,2}:\d{2}:\d{2}/,
    'mm/dd/yyyy': /\d{2}\/\d{2}\/\d{4}/,
    'yyyy/mm/dd': /\d{4}\/\d{2}\/\d{2}/,
    'mm/dd/yyyy hh:mm': /\d{2}\/\d{2}\/\d{4} \d{1,2}:\d{2}/,
    'yyyy/mm/dd hh:mm': /\d{4}\/\d{2}\/\d{2} \d{1,2}:\d{2}/,
    'mm/dd/yyyy hh:mm:ss': /\d{2}\/\d{2}\/\d{4} \d{1,2}:\d{2}:\d{2}/,
    'yyyy/mm/dd hh:mm:ss': /\d{4}\/\d{2}\/\d{2} \d{1,2}:\d{2}:\d{2}/,
    'hh:mm': /\d{1,2}:\d{2}/,
    'hh:mm:ss': /\d{1,2}:\d{2}:\d{2}/,
    'hh:mm:ss.ms': /\d{1,2}:\d{2}:\d{2}\.\d{3}/,
}

window.exportMappings = {
    'CSV / Microsoft Excel (raw data)'  :    'csv',
    'CSV / Microsoft Excel (labels)'    :    'csv',
    'SPSS Statistical Software'         :    'sps',
    'SAS Statistical Software'          :    'sas',
    'R Statistical Software'            :    'r',
    'Stata Statistical Software'        :    'do',
    'CDISC ODM (XML)'                   :    'odm'
}

window.elementChoices = {
    '' : 'div[role=dialog][style*=z-index]:visible,html',
    ' on the tooltip' : 'div[class*=tooltip]:visible',
    ' in the tooltip' : 'div[class*=tooltip]:visible',
    ' on the role selector dropdown' : 'div[id=assignUserDropdownDiv]:visible',
    ' in the role selector dropdown' : 'div[id=assignUserDropdownDiv]:visible',
    ' on the dialog box' : 'div[role=dialog][style*=z-index]:visible',
    ' in the dialog box' : 'div[role=dialog][style*=z-index]:visible'
}