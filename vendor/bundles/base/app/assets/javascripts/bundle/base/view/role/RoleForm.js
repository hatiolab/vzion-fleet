Ext.define('Base.view.role.RoleForm', {
	
	extend : 'Ext.form.Panel',
	
	xtype : 'base_role_form',
	
	title : T('title.basic_info'),
	
	autoScroll : true,
	
	defaults : { xtype : 'textfield', anchor : '100%' },
	
	items : [
		{ name : 'id', fieldLabel : T('label.id'), hidden : true },
		{ name : 'name', fieldLabel : T('label.name') },
		{ name : 'description', fieldLabel : T('label.description') },
		{ xtype : 'timestamp' }
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'list', 'save', 'delete']
	} ]
});