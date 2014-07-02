Ext.define('Base.view.diy_selection.DiySelectionForm', {
	
	extend : 'Ext.form.Panel',
	
	xtype : 'base_diy_selection_form',
	
	title : T('title.basic_info'),
	
	autoScroll : true,
	
	defaults : { xtype : 'textfield', anchor : '100%' },
	
	items : [
		{ name : 'id', fieldLabel : T('label.id'), hidden : true },
		{ itemId : 'name', name : 'name', fieldLabel : T('label.name'), readOnly : true },
		{ name : 'description', fieldLabel : T('label.description') },
		{ 
			name : 'script_type', 
			fieldLabel : T('label.script_type'), 
			xtype : 'codecombo', 
			commonCode : 'SCRIPT_TYPE',
			allowBlank : false
		},
		{ xtype : 'timestamp' }
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'list', 'save', 'delete']
	} ]
	
});