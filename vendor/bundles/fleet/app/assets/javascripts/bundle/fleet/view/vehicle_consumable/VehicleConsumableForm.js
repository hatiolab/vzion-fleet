Ext.define('Fleet.view.vehicle_consumable.VehicleConsumableForm', {
	
	extend : 'Ext.form.Panel',
	
	xtype : 'fleet_vehicle_consumable_form',
	
	title : T('title.basic_info'),
		
	autoScroll : true,
	
	defaults : { 
		xtype : 'textfield', 
		anchor : '100%',
		labelWidth : 150
	},
	
	items : [
		{ name : 'id', fieldLabel : T('label.id'), hidden : true },
		{ name : 'vehicle', fieldLabel : T('label.vehicle'), xtype : 'entityfield', storeClass : 'Fleet.store.Vehicle' },
		{ name : 'name', fieldLabel : T('label.item'), allowBlank : false, maxLength : 64 },
		{ name : 'description', fieldLabel : T('label.description'), maxLength : 255 },
		{ name : 'status', fieldLabel : T('label.status') },
		{ name : 'health_rate', fieldLabel : T('label.health_rate'), xtype : 'numberfield' },
		{ name : 'repl_unit', fieldLabel : T('label.repl_unit') },
		{ name : 'cycle_repl_mile', fieldLabel : T('label.x_repl_cycle_y', {x : '', y : T('label.mile')}), xtype : 'numberfield' },
		{ name : 'cycle_repl_duration', fieldLabel : T('label.x_repl_cycle_y', {x : '', y : T('label.month')}), xtype : 'numberfield' },
		{ name : 'last_repl_date', fieldLabel : T('label.x_repl_date', {x : T('label.last')}), xtype : 'datefield', format : T('format.date') },
		{ name : 'last_repl_mile', fieldLabel : T('label.x_repl_mile', {x : T('label.last')}), xtype : 'numberfield' },
		{ name : 'next_repl_date', fieldLabel : T('label.x_repl_date', {x : T('label.next')}), xtype : 'datefield', format : T('format.date') },
		{ name : 'next_repl_mile', fieldLabel : T('label.x_repl_mile', {x : T('label.next')}), xtype : 'numberfield' },
		{ name : 'cumulative_cost', fieldLabel : T('label.cumulative_cost'), xtype : 'numberfield' },
		{ xtype : 'timestamp' }
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'list', 'save', 'delete']
	} ]
});