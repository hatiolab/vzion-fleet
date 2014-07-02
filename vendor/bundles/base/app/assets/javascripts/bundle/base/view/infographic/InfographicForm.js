Ext.define('Base.view.infographic.InfographicForm', {
	
	extend : 'Ext.form.Panel',
	
	xtype : 'base_infographic_form',
	
	title : T('title.basic_info'),
	
	autoScroll : true,
	
	defaults : { xtype : 'textfield', anchor : '100%' },
	
	items : [
		{ name : 'id', fieldLabel : T('label.id'), hidden : true },
		{ name : 'name', fieldLabel : T('label.name'), readOnly : true },
		{ name : 'description', fieldLabel : T('label.description') },
		{ name : 'infographic_type', fieldLabel : T('label.infographic_type'), xtype : 'codecombo', commonCode : 'INFOGRAPHIC_TYPE' },
		{ name : 'printer_type', fieldLabel : T('label.printer_type'), xtype : 'codecombo', commonCode : 'PRINTER_TYPE' },
		{ name : 'print_command', fieldLabel : T('label.print_command'), xtype : 'textarea', inputValue : false, autoScroll : true, rows : 15 },
		{ xtype : 'timestamp' }
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['print', '->', 'list', 'save', 'delete']
	} ]
	
});