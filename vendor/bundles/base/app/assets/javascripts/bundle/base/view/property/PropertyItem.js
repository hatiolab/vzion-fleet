Ext.define('Base.view.property.PropertyItem', {
	
	extend : 'Ext.form.Panel',
	
	xtype : 'base_property_item',
	
	mixins : {
		spotlink : 'Frx.mixin.view.SpotLink'
	},

	title : T('menu.Property'),
	
	layout : {
		type : 'vbox',
		align : 'stretch'
	},
	
	defaults : {
		xtype : 'textfield'
	},
	
	items : [		
		{ name : 'id', fieldLabel : T('label.id'), hidden : true },
		{ name : 'name', fieldLabel : T('label.name'), readOnly : true },
		{ name : 'description', fieldLabel : T('label.description') },
		{ name : 'on_type', fieldLabel : T('label.on_type'), readOnly : true },
		{ name : 'on_id', fieldLabel : T('label.on_id'), readOnly : true },
		{ name : 'value', fieldLabel : T('label.value'), readOnly : true },
		{ xtype : 'timestamp' }
	],
	
	dockedItems: [{
		xtype: 'controlbar',
		items: ['->', 'list', 'save', 'delete']
	}]
});
