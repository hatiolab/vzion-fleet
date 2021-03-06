Ext.define('Fleet.view.driver_run_sum.DriverRunSumForm', {
	
	extend : 'Ext.form.Panel',
	
	xtype : 'fleet_driver_run_sum_form',
	
	title : T('title.basic_info'),
		
	autoScroll : true,
	
	defaults : { 
		xtype : 'textfield', 
		anchor : '100%',
		labelWidth : 170
	},
	
	items : [
		{ name : 'id', fieldLabel : T('label.id'), hidden : true },
		{ fieldLabel : T('label.driver'), name : 'driver', xtype : 'entityfield', storeClass : 'Fleet.store.Vehicle', readOnly : true },
		{ name : 'run_year', fieldLabel : T('label.year'), readOnly : true },
		{ name : 'run_month', fieldLabel : T('label.month'), readOnly : true },
		{ name : 'run_dist', fieldLabel : T('label.run_dist'), xtype : 'numberfield' },
		{ name : 'run_time', fieldLabel : T('label.run_time'), xtype : 'numberfield' },
		{ name : 'idle_time', fieldLabel : T('label.idle_time'), xtype : 'numberfield' },
		{ name : 'eco_drv_time', fieldLabel : T('label.eco_drv_time'), xtype : 'numberfield' },
		{ name : 'ovr_spd_time', fieldLabel : T('label.ovr_spd_time'), xtype : 'numberfield' },
		{ name : 'consmpt', fieldLabel : T('label.consmpt'), xtype : 'numberfield' },
		{ name : 'co2_emss', fieldLabel : T('label.co2_emss'), xtype : 'numberfield' },
		{ name : 'effcc', fieldLabel : T('label.effcc'), xtype : 'numberfield' },
		{ name : 'eco_index', fieldLabel : T('label.eco_index'), xtype : 'numberfield' },
		{ name : 'sud_accel_cnt', fieldLabel : T('label.sud_accel_cnt'), xtype : 'numberfield' },
		{ name : 'sud_brake_cnt', fieldLabel : T('label.sud_brake_cnt'), xtype : 'numberfield' },
		{ name : 'inc_cnt', fieldLabel : T('label.inc_cnt'), xtype : 'numberfield' }
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'list', 'save', 'delete']
	} ]
});