Ext.define('Base.view.variable.VariableForm', {

	extend: 'Ext.form.Panel',

	xtype: 'base_variable_form',

	title: T('title.basic_info'),

	autoScroll: true,

	defaults: {
		xtype: 'textfield',
		anchor: '100%'
	},

	items: [{
		name: 'id',
		fieldLabel: T('label.id'),
		hidden: true
	}, {
		name: 'name',
		fieldLabel: T('label.name'),
		allowBlank: false,
		maxLength: 64
	}, {
		name: 'description',
		fieldLabel: T('label.description'),
		maxLength: 255
	}, {
		name: 'category',
		fieldLabel: T('label.category'),
		flex: 1,
		xtype: 'codecombo',
		commonCode: 'VARIABLE_CATEGORY',
		allowBlank: false
	}, { 
		xtype : 'timestamp' 
	} ],

	dockedItems: [{
		xtype: 'controlbar',
		items: ['->', 'list', 'save', 'delete']
	}]
});
