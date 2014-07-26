Ext.define('Fleet.view.vehicle_speed_sum.VehicleSpeedSumForm', {
	
	extend : 'Ext.form.Panel',
	
	xtype : 'fleet_vehicle_speed_sum_form',
	
	title : T('title.basic_info'),
		
	autoScroll : true,
	
	defaults : { 
		xtype : 'textfield', 
		anchor : '100%',
		labelWidth : 150
	},
	
	items : [
		{ name : 'id', fieldLabel : T('label.id'), hidden : true },
		{ fieldLabel : T('label.vehicle'), name : 'vehicle', xtype : 'entityfield', storeClass : 'Fleet.store.Vehicle', readOnly : true },
		{ name : 'run_year', fieldLabel : T('label.year'), readOnly : true },
		{ name : 'run_month', fieldLabel : T('label.month'), readOnly : true },
		{ name : 'spd_lt_10',  fieldLabel : T('label.spd_lt_x', {x : '10'}),  xtype : 'numberfield' },
		{ name : 'spd_lt_20',  fieldLabel : T('label.spd_lt_x', {x : '20'}),  xtype : 'numberfield' },
		{ name : 'spd_lt_30',  fieldLabel : T('label.spd_lt_x', {x : '30'}),  xtype : 'numberfield' },
		{ name : 'spd_lt_40',  fieldLabel : T('label.spd_lt_x', {x : '40'}),  xtype : 'numberfield' },
		{ name : 'spd_lt_50',  fieldLabel : T('label.spd_lt_x', {x : '50'}),  xtype : 'numberfield' },
		{ name : 'spd_lt_60',  fieldLabel : T('label.spd_lt_x', {x : '60'}),  xtype : 'numberfield' },
		{ name : 'spd_lt_70',  fieldLabel : T('label.spd_lt_x', {x : '70'}),  xtype : 'numberfield' },
		{ name : 'spd_lt_80',  fieldLabel : T('label.spd_lt_x', {x : '80'}),  xtype : 'numberfield' },
		{ name : 'spd_lt_90',  fieldLabel : T('label.spd_lt_x', {x : '90'}),  xtype : 'numberfield' },
		{ name : 'spd_lt_100', fieldLabel : T('label.spd_lt_x', {x : '100'}), xtype : 'numberfield' },
		{ name : 'spd_lt_110', fieldLabel : T('label.spd_lt_x', {x : '110'}), xtype : 'numberfield' },
		{ name : 'spd_lt_120', fieldLabel : T('label.spd_lt_x', {x : '120'}), xtype : 'numberfield' },
		{ name : 'spd_lt_130', fieldLabel : T('label.spd_lt_x', {x : '130'}), xtype : 'numberfield' },
		{ name : 'spd_lt_140', fieldLabel : T('label.spd_lt_x', {x : '140'}), xtype : 'numberfield' },
		{ name : 'spd_lt_150', fieldLabel : T('label.spd_lt_x', {x : '150'}), xtype : 'numberfield' },
		{ name : 'spd_lt_160', fieldLabel : T('label.spd_lt_x', {x : '160'}), xtype : 'numberfield' }
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'list', 'save', 'delete']
	} ]
});