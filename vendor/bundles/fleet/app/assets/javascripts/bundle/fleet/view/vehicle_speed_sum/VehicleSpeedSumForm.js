Ext.define('Fleet.view.vehicle_speed_sum.VehicleSpeedSumForm', {
	
	extend : 'Ext.form.Panel',
	
	xtype : 'fleet_vehicle_speed_sum_form',
	
	title : T('title.basic_info'),
		
	autoScroll : true,
	
	defaults : { xtype : 'textfield', anchor : '100%' },
	
	items : [
		{ name : 'id', fieldLabel : T('label.id'), hidden : true },
		{ fieldLabel : T('label.vehicle'), name : 'vehicle', xtype : 'entityfield', storeClass : 'Fleet.store.Vehicle' },
		{ name : 'run_year', fieldLabel : T('label.run_year'), xtype : 'numberfield' },
		{ name : 'run_month', fieldLabel : T('label.run_month'), xtype : 'numberfield' },
		{ name : 'run_day', fieldLabel : T('label.run_day'), xtype : 'numberfield' },
		{ xtype : 'datefield', name : 'run_date', fieldLabel : T('label.run_date'), format : T('format.date') },
		{ name : 'spd_lt_10', fieldLabel : T('label.spd_lt_10'), xtype : 'numberfield' },
		{ name : 'spd_lt_20', fieldLabel : T('label.spd_lt_20'), xtype : 'numberfield' },
		{ name : 'spd_lt_30', fieldLabel : T('label.spd_lt_30'), xtype : 'numberfield' },
		{ name : 'spd_lt_40', fieldLabel : T('label.spd_lt_40'), xtype : 'numberfield' },
		{ name : 'spd_lt_50', fieldLabel : T('label.spd_lt_50'), xtype : 'numberfield' },
		{ name : 'spd_lt_60', fieldLabel : T('label.spd_lt_60'), xtype : 'numberfield' },
		{ name : 'spd_lt_70', fieldLabel : T('label.spd_lt_70'), xtype : 'numberfield' },
		{ name : 'spd_lt_80', fieldLabel : T('label.spd_lt_80'), xtype : 'numberfield' },
		{ name : 'spd_lt_90', fieldLabel : T('label.spd_lt_90'), xtype : 'numberfield' },
		{ name : 'spd_lt_100', fieldLabel : T('label.spd_lt_100'), xtype : 'numberfield' },
		{ name : 'spd_lt_110', fieldLabel : T('label.spd_lt_110'), xtype : 'numberfield' },
		{ name : 'spd_lt_120', fieldLabel : T('label.spd_lt_120'), xtype : 'numberfield' },
		{ name : 'spd_lt_130', fieldLabel : T('label.spd_lt_130'), xtype : 'numberfield' },
		{ name : 'spd_lt_140', fieldLabel : T('label.spd_lt_140'), xtype : 'numberfield' },
		{ name : 'spd_lt_150', fieldLabel : T('label.spd_lt_150'), xtype : 'numberfield' },
		{ name : 'spd_lt_160', fieldLabel : T('label.spd_lt_160'), xtype : 'numberfield' },
		{ xtype : 'timestamp' }
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'list', 'save', 'delete']
	} ]
});