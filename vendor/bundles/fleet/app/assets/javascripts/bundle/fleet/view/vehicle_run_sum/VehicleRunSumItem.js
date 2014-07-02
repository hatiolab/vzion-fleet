Ext.define('Fleet.view.vehicle_run_sum.VehicleRunSumItem', {
	
	extend : 'Ext.tab.Panel',
	
 	requires : [ 
		'Fleet.view.vehicle_run_sum.VehicleRunSumForm'
	],
	
	mixins : {
		spotlink : 'Frx.mixin.view.SpotLink'
	},
	
	xtype : 'fleet_vehicle_run_sum_item',
	
	title : T('menu.VehicleRunSum'),
	
	items : [ {
		xtype : 'fleet_vehicle_run_sum_form'
	} ]
});