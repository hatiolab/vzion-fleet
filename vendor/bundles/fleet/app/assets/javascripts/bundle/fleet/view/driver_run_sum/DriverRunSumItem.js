Ext.define('Fleet.view.driver_run_sum.DriverRunSumItem', {
	
	extend : 'Ext.tab.Panel',
	
 	requires : [ 
		'Fleet.view.driver_run_sum.DriverRunSumForm'
	],
	
	mixins : {
		spotlink : 'Frx.mixin.view.SpotLink'
	},
	
	xtype : 'fleet_driver_run_sum_item',
	
	title : T('menu.DriverRunSum'),
	
	items : [ {
		xtype : 'fleet_driver_run_sum_form'
	} ]
});