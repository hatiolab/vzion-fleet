Ext.define('Fleet.view.driver_status.DriverStatusForm', {
	
	extend : 'Ext.form.Panel',
	
	xtype : 'fleet_driver_status_form',
	
	title : T('title.basic_info'),
		
	autoScroll : true,
	
	defaults : { 
		xtype : 'textfield', 
		anchor : '100%',
		labelWidth : 150
	},
	
	items : [
		{ name : 'id', fieldLabel : T('label.id'), hidden : true },
		{ name : 'driver', fieldLabel : T('label.driver'), xtype : 'entityfield', storeClass : 'Fleet.store.Driver' },
		{ name : 'status', fieldLabel : T('label.status') },
		{ name : 'total_dist', fieldLabel : T('label.total_dist'), xtype : 'numberfield' },
		{ name : 'total_runtime', fieldLabel : T('label.total_runtime'), xtype : 'numberfield' },
		{ name : 'avg_effcc', fieldLabel : T('label.avg_effcc'), xtype : 'numberfield' },
		{ name : 'eco_index', fieldLabel : T('label.eco_index'), xtype : 'numberfield' },
		{ name : 'eco_run_rate', fieldLabel : T('label.eco_run_rate'), xtype : 'numberfield' },
		{ xtype : 'timestamp' }
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'list', 'save', 'delete']
	} ]
});