Ext.define('Fleet.view.vehicle_trace.VehicleTraceForm', {
	
	extend : 'Ext.form.Panel',
	
	xtype : 'fleet_vehicle_trace_form',
	
	title : T('title.basic_info'),
		
	autoScroll : true,
	
	defaults : { xtype : 'textfield', anchor : '100%' },
	
	items : [
		{ name : 'id', fieldLabel : T('label.id'), hidden : true },
		{ fieldLabel : T('label.terminal'), name : 'terminal', xtype : 'entityfield', storeClass : 'Fleet.store.Terminal' },
		{ fieldLabel : T('label.vehicle'), name : 'vehicle', xtype : 'entityfield', storeClass : 'Fleet.store.Vehicle' },
		{ fieldLabel : T('label.driver'), name : 'driver', xtype : 'entityfield', storeClass : 'Fleet.store.Driver' },
		{ name : 'lng', fieldLabel : T('label.lng'), xtype : 'numberfield' },
		{ name : 'lat', fieldLabel : T('label.lat'), xtype : 'numberfield' },
		{ name : 'velocity', fieldLabel : T('label.velocity'), xtype : 'numberfield' },
		{ xtype : 'datefield', name : 'trace_time', fieldLabel : T('label.trace_time'), format : T('format.datetime') },
		{ xtype : 'timestamp' }
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'list', 'save', 'delete']
	} ]
});