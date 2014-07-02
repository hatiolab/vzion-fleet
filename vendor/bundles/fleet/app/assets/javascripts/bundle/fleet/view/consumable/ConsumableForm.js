Ext.define('Fleet.view.consumable.ConsumableForm', {
	
	extend : 'Ext.form.Panel',
	
	xtype : 'fleet_consumable_form',
	
	title : T('title.basic_info'),
		
	autoScroll : true,
	
	defaults : { xtype : 'textfield', anchor : '100%' },
	
	items : [
		{ name : 'id', fieldLabel : T('label.id'), hidden : true },
		{ name : 'domain_id', value : login.current_domain_id, hidden : true },
		{ name : 'name', fieldLabel : T('label.code'), allowBlank : false, maxLength : 64 },
		{ name : 'description', fieldLabel : T('label.description'), maxLength : 255 },
		{ fieldLabel : T('label.unit'), name : 'unit', xtype : 'codefield', commonCode : 'REPLACE_UNIT' },
		{ name : 'initial_mileage', fieldLabel : T('label.initial_mileage'), xtype : 'numberfield' },
		{ name : 'inital_duration', fieldLabel : T('label.inital_duration'), xtype : 'numberfield' },
		{ name : 'last_mileage', fieldLabel : T('label.last_mileage'), xtype : 'numberfield' },
		{ name : 'last_duration', fieldLabel : T('label.last_duration'), xtype : 'numberfield' },
		{ xtype : 'timestamp' }
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'list', 'save', 'delete']
	} ]
});