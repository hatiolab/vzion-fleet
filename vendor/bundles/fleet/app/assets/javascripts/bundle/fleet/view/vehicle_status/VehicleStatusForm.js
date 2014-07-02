Ext.define('Fleet.view.vehicle_status.VehicleStatusForm', {
	
	extend : 'Ext.form.Panel',
	
	xtype : 'fleet_vehicle_status_form',
	
	title : T('title.basic_info'),
		
	autoScroll : true,
	
	defaults : { xtype : 'textfield', anchor : '100%' },
	
	items : [
		{ name : 'id', fieldLabel : T('label.id'), hidden : true },
		{ fieldLabel : T('label.vehicle'), name : 'vehicle', xtype : 'entityfield', storeClass : 'Fleet.store.Vehicle' },
		{ fieldLabel : T('label.driver'), name : 'driver', xtype : 'entityfield', storeClass : 'Fleet.store.Driver' },
		{ fieldLabel : T('label.terminal'), name : 'terminal', xtype : 'entityfield', storeClass : 'Fleet.store.Terminal' },
		{ fieldLabel : T('label.status'), name : 'status', xtype : 'codefield', commonCode : 'RUN_STATUS' },
		{ fieldLabel : T('label.health_status'), name : 'health_status', xtype : 'codefield', commonCode : 'HEALTH_STATUS' },
		{ name : 'total_dist', fieldLabel : T('label.total_dist'), xtype : 'numberfield' },
		{ name : 'total_runtime', fieldLabel : T('label.total_runtime'), xtype : 'numberfield' },
		{ name : 'remain_fuel', fieldLabel : T('label.remain_fuel'), xtype : 'numberfield' },
		{ name : 'official_effcc', fieldLabel : T('label.official_effcc'), xtype : 'numberfield' },
		{ name : 'avg_effcc', fieldLabel : T('label.avg_effcc'), xtype : 'numberfield' },
		{ name : 'eco_index', fieldLabel : T('label.eco_index'), xtype : 'numberfield' },
		{ name : 'eco_run_rate', fieldLabel : T('label.eco_run_rate'), xtype : 'numberfield' },
		{ name : 'lat', fieldLabel : T('label.lat'), xtype : 'numberfield' },
		{ name : 'lng', fieldLabel : T('label.lng'), xtype : 'numberfield' },
		{ xtype : 'timestamp' }
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'list', 'save', 'delete']
	} ]
});