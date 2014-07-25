Ext.define('Fleet.view.vehicle.VehicleItem', {
	
	extend : 'Ext.tab.Panel',
	
 	requires : [ 
		'Fleet.view.vehicle.VehicleForm',
		'Fleet.view.vehicle.VehicleRepair',
		'Fleet.view.vehicle.VehicleTrack',
		'Fleet.view.vehicle.VehicleConsumable'
	],
	
	mixins : {
		spotlink : 'Frx.mixin.view.SpotLink'
	},
	
	xtype : 'fleet_vehicle_item',
	
	title : T('menu.Vehicle'),
	
	items : [ {
		xtype : 'fleet_vehicle_form'
	}, {
		xtype : 'fleet_vehicle_track'
	}, {
		xtype : 'fleet_vehicle_consumable'
	}, {
		xtype : 'fleet_vehicle_repair'
	} ]
});