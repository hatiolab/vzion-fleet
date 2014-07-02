/**
 * VehicleRunSumDetail controller
 */
Ext.define('Fleet.controller.vehicle_run_sum.VehicleRunSumItem', {
	
	extend: 'Frx.controller.ItemController',
	
	requires : [ 
		'Fleet.model.VehicleRunSum', 
		'Fleet.store.VehicleRunSum', 
		'Fleet.view.vehicle_run_sum.VehicleRunSumItem'
	],
	
	mixins : [
		'Frx.mixin.lifecycle.FormLifeCycle'
	],
	
	models : ['Fleet.model.VehicleRunSum'],
			
	stores: ['Fleet.store.VehicleRunSum'],
	
	views : ['Fleet.view.vehicle_run_sum.VehicleRunSumItem'],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'fleet_vehicle_run_sum_item' : this.EntryPoint(),
			'fleet_vehicle_run_sum_form' : this.FormEventHandler()
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