Ext.define('Base.view.entity.EntityForm', {

	extend: 'Ext.form.Panel',

	xtype: 'base_entity_form',

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
		fieldLabel: T('label.name')
	}, {
		name: 'description',
		fieldLabel: T('label.description')
	}, {
		xtype : 'entitynamecombo', 
		allowBlank : false,
		customSelectionUrl : 'Bundle',
		name : 'bundle',
		fieldLabel : T('label.bundle')
	}, {
		xtype : 'entitycombo', 
		allowBlank: true,
		storeClass : 'Base.store.Infographic',
		name: 'list_infographic',
		fieldLabel: T('label.list_infographic')
	}, {
		xtype : 'entitycombo', 
		allowBlank: true,
		storeClass : 'Base.store.Infographic',
		name: 'item_infographic',
		fieldLabel: T('label.item_infographic')
	}, { 
		xtype : 'timestamp' 
	}],

	dockedItems: [{
		xtype: 'controlbar',
		items: ['->', 'list', 'save', 'generate_api', 'generate_table', 'generate_view']
	}]
});
