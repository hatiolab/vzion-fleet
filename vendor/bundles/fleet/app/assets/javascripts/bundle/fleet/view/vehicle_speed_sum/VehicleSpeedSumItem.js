Ext.define('Fleet.view.vehicle_speed_sum.VehicleSpeedSumItem', {
	
	extend : 'Ext.tab.Panel',
	
 	requires : [ 
		'Fleet.view.vehicle_speed_sum.VehicleSpeedSumForm'
	],
	
	mixins : {
		spotlink : 'Frx.mixin.view.SpotLink'
	},
	
	xtype : 'fleet_vehicle_speed_sum_item',
	
	title : T('menu.VehicleSpeedSum'),
	
	items : [ {
		xtype : 'fleet_vehicle_speed_sum_form'
	} ]
});