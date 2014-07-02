Ext.define('Fleet.view.vehicle_consumable.VehicleConsumableItem', {
	
	extend : 'Ext.tab.Panel',
	
 	requires : [ 
		'Fleet.view.vehicle_consumable.VehicleConsumableForm'
	],
	
	mixins : {
		spotlink : 'Frx.mixin.view.SpotLink'
	},
	
	xtype : 'fleet_vehicle_consumable_item',
	
	title : T('menu.VehicleConsumable'),
	
	items : [ {
		xtype : 'fleet_vehicle_consumable_form'
	} ]
});