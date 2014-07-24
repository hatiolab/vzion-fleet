Ext.define('Fleet.view.driver_speed_sum.DriverSpeedSumForm', {
	
	extend : 'Ext.form.Panel',
	
	xtype : 'fleet_driver_speed_sum_form',
	
	title : T('title.basic_info'),
		
	autoScroll : true,
	
	defaults : { xtype : 'textfield', anchor : '100%' },
	
	items : [
		{ name : 'id', fieldLabel : T('label.id'), hidden : true },
		{ fieldLabel : T('label.driver'), name : 'driver', xtype : 'entityfield', storeClass : 'Fleet.store.Driver', readOnly : true },
		{ name : 'run_year', fieldLabel : T('label.year'), readOnly : true },
		{ name : 'run_month', fieldLabel : T('label.month'), readOnly : true },
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
		{ name : 'spd_lt_160', fieldLabel : T('label.spd_lt_160'), xtype : 'numberfield' }
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'list', 'save', 'delete']
	} ]
});