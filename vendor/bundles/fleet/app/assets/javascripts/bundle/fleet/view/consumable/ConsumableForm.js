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
		{ name : 'unit', fieldLabel : T('label.unit'), xtype : 'codefield', commonCode : 'REPLACE_UNIT' },
		{ name : 'init_repl_mile', fieldLabel : T('label.init_repl_mile'), xtype : 'numberfield', minValue : 0 },
		{ name : 'init_repl_duration', fieldLabel : T('label.init_repl_duration'), xtype : 'numberfield', minValue : 0, maxValue : 1000 },
		{ name : 'repl_mile', fieldLabel : T('label.repl_mile'), xtype : 'numberfield', minValue : 0 },
		{ name : 'repl_duration', fieldLabel : T('label.repl_duration'), xtype : 'numberfield', minValue : 0, maxValue : 1000 },
		{ xtype : 'timestamp' }
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'list', 'save', 'delete']
	} ]
});