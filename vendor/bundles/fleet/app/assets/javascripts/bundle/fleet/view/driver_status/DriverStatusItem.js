Ext.define('Fleet.view.driver_status.DriverStatusItem', {
	
	extend : 'Ext.tab.Panel',
	
 	requires : [ 
		'Fleet.view.driver_status.DriverStatusForm'
	],
	
	mixins : {
		spotlink : 'Frx.mixin.view.SpotLink'
	},
	
	xtype : 'fleet_driver_status_item',
	
	title : T('menu.DriverStatus'),
	
	items : [ {
		xtype : 'fleet_driver_status_form'
	} ]
});