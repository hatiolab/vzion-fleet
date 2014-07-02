Ext.define('Fleet.view.vehicle.VehicleItem', {
	
	extend : 'Ext.tab.Panel',
	
 	requires : [ 
		'Fleet.view.vehicle.VehicleForm'
	],
	
	mixins : {
		spotlink : 'Frx.mixin.view.SpotLink'
	},
	
	xtype : 'fleet_vehicle_item',
	
	title : T('menu.Vehicle'),
	
	items : [ {
		xtype : 'fleet_vehicle_form'
	} ]
});