Ext.define('Fleet.view.vehicle_checkin.VehicleCheckinItem', {
	
	extend : 'Ext.tab.Panel',
	
 	requires : [ 
		'Fleet.view.vehicle_checkin.VehicleCheckinForm'
	],
	
	mixins : {
		spotlink : 'Frx.mixin.view.SpotLink'
	},
	
	xtype : 'fleet_vehicle_checkin_item',
	
	title : T('menu.VehicleCheckin'),
	
	items : [ {
		xtype : 'fleet_vehicle_checkin_form'
	} ]
});