/**
 * VehicleTraceDetail controller
 */
Ext.define('Fleet.controller.vehicle_trace.VehicleTraceItem', {
	
	extend: 'Frx.controller.ItemController',
	
	requires : [ 
		'Fleet.model.VehicleTrace', 
		'Fleet.store.VehicleTrace', 
		'Fleet.view.vehicle_trace.VehicleTraceItem'
	],
	
	mixins : [
		'Frx.mixin.lifecycle.FormLifeCycle'
	],
	
	models : ['Fleet.model.VehicleTrace'],
			
	stores: ['Fleet.store.VehicleTrace'],
	
	views : ['Fleet.view.vehicle_trace.VehicleTraceItem'],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'fleet_vehicle_trace_item' : this.EntryPoint(),
			'fleet_vehicle_trace_form' : this.FormEventHandler()
		});
	},
	
	/****************************************************************
	 ** 					여기는 customizing area 				   **
	 ****************************************************************/
	// Customized code here ...
	
	/****************************************************************
	 ** 					Override 구현 						   **
	 ****************************************************************/

	
	/****************************************************************
	 ** 					abstract method, 필수 구현 				   **
	****************************************************************/

});