Ext.define('Fleet.view.vehicle_checkin.VehicleCheckinForm', {
	
	extend : 'Ext.form.Panel',
	
	xtype : 'fleet_vehicle_checkin_form',
	
	title : T('title.basic_info'),
		
	autoScroll : true,
	
	defaults : { xtype : 'textfield', anchor : '100%' },
	
	items : [
		{ name : 'id', fieldLabel : T('label.id'), hidden : true },
		{ fieldLabel : T('label.terminal'), name : 'terminal', xtype : 'entityfield', storeClass : 'Fleet.store.Terminal' },
		{ fieldLabel : T('label.vehicle'), name : 'vehicle', xtype : 'entityfield', storeClass : 'Fleet.store.Vehicle' },
		{ fieldLabel : T('label.driver'), name : 'driver', xtype : 'entityfield', storeClass : 'Fleet.store.Driver' },
		{ xtype : 'datefield', name : 'run_date', fieldLabel : T('label.run_date'), format : T('format.date') },
		{ xtype : 'datefield', name : 'start_time', fieldLabel : T('label.start_time'), format : T('format.datetime') },
		{ name : 'run_dist', fieldLabel : T('label.run_dist'), xtype : 'numberfield' },
		{ name : 'run_time', fieldLabel : T('label.run_time'), xtype : 'numberfield' },
		{ name : 'idle_time', fieldLabel : T('label.idle_time'), xtype : 'numberfield' },
		{ name : 'eco_drv_time', fieldLabel : T('label.eco_drv_time'), xtype : 'numberfield' },
		{ name : 'avg_speed', fieldLabel : T('label.avg_speed'), xtype : 'numberfield' },
		{ name : 'max_speed', fieldLabel : T('label.max_speed'), xtype : 'numberfield' },
		{ name : 'fuel_consmpt', fieldLabel : T('label.fuel_consmpt'), xtype : 'numberfield' },
		{ name : 'fuel_effcc', fieldLabel : T('label.fuel_effcc'), xtype : 'numberfield' },
		{ name : 'sud_accel_cnt', fieldLabel : T('label.sud_accel_cnt'), xtype : 'numberfield' },
		{ name : 'sud_brake_cnt', fieldLabel : T('label.sud_brake_cnt'), xtype : 'numberfield' },
		{ name : 'ovr_spd_time', fieldLabel : T('label.ovr_spd_time'), xtype : 'numberfield' },
		{ name : 'co2_emss', fieldLabel : T('label.co2_emss'), xtype : 'numberfield' },
		{ name : 'max_cool_water_temp', fieldLabel : T('label.max_cool_water_temp'), xtype : 'numberfield' },
		{ name : 'avg_battery_volt', fieldLabel : T('label.avg_battery_volt'), xtype : 'numberfield' },
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