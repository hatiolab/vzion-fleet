Ext.define('Fleet.view.vehicle_consumable.VehicleConsumableForm', {
	
	extend : 'Ext.form.Panel',
	
	xtype : 'fleet_vehicle_consumable_form',
	
	title : T('title.basic_info'),
		
	autoScroll : true,
	
	defaults : { xtype : 'textfield', anchor : '100%' },
	
	items : [
		{ name : 'id', fieldLabel : T('label.id'), hidden : true },
		{ name : 'domain_id', value : login.current_domain_id, hidden : true },
		{ fieldLabel : T('label.vehicle'), name : 'vehicle', xtype : 'entityfield', storeClass : 'Fleet.store.Vehicle' },
		{ name : 'name', fieldLabel : T('label.code'), allowBlank : false, maxLength : 64 },
		{ name : 'description', fieldLabel : T('label.description'), maxLength : 255 },
		{ name : 'status', fieldLabel : T('label.status') },
		{ name : 'health_rate', fieldLabel : T('label.health_rate'), xtype : 'numberfield' },
		{ name : 'cycle_repl_mile', fieldLabel : T('label.cycle_repl_mile'), xtype : 'numberfield' },
		{ name : 'cycle_repl_duration', fieldLabel : T('label.cycle_repl_duration'), xtype : 'numberfield' },
		{ xtype : 'datefield', name : 'last_repl_date', fieldLabel : T('label.last_repl_date'), format : T('format.date') },
		{ name : 'last_repl_mile', fieldLabel : T('label.last_repl_mile'), xtype : 'numberfield' },
		{ xtype : 'datefield', name : 'next_repl_date', fieldLabel : T('label.next_repl_date'), format : T('format.date') },
		{ name : 'next_repl_mile', fieldLabel : T('label.next_repl_mile'), xtype : 'numberfield' },
		{ name : 'repl_unit', fieldLabel : T('label.repl_unit') },
		{ name : 'cumulative_cost', fieldLabel : T('label.cumulative_cost'), xtype : 'numberfield' },
		{ xtype : 'timestamp' }
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'list', 'save', 'delete']
	} ]
});