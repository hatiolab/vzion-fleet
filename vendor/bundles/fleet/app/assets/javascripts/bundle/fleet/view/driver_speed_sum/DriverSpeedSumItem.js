Ext.define('Fleet.view.driver_speed_sum.DriverSpeedSumItem', {
	
	extend : 'Ext.tab.Panel',
	
 	requires : [ 
		'Fleet.view.driver_speed_sum.DriverSpeedSumForm'
	],
	
	mixins : {
		spotlink : 'Frx.mixin.view.SpotLink'
	},
	
	xtype : 'fleet_driver_speed_sum_item',
	
	title : T('menu.DriverSpeedSum'),
	
	items : [ {
		xtype : 'fleet_driver_speed_sum_form'
	} ]
});