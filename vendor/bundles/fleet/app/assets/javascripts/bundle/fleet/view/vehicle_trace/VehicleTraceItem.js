Ext.define('Fleet.view.vehicle_trace.VehicleTraceItem', {
	
	extend : 'Ext.tab.Panel',
	
 	requires : [ 
		'Fleet.view.vehicle_trace.VehicleTraceForm'
	],
	
	mixins : {
		spotlink : 'Frx.mixin.view.SpotLink'
	},
	
	xtype : 'fleet_vehicle_trace_item',
	
	title : T('menu.VehicleTrace'),
	
	items : [ {
		xtype : 'fleet_vehicle_trace_form'
	} ]
});