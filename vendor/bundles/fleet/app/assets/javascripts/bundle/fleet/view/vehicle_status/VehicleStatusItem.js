Ext.define('Fleet.view.vehicle_status.VehicleStatusItem', {
	
	extend : 'Ext.tab.Panel',
	
 	requires : [ 
		'Fleet.view.vehicle_status.VehicleStatusForm'
	],
	
	mixins : {
		spotlink : 'Frx.mixin.view.SpotLink'
	},
	
	xtype : 'fleet_vehicle_status_item',
	
	title : T('menu.VehicleStatus'),
	
	items : [ {
		xtype : 'fleet_vehicle_status_form'
	} ]
});