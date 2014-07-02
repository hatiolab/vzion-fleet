/**
 * VehicleSpeedSumDetail controller
 */
Ext.define('Fleet.controller.vehicle_speed_sum.VehicleSpeedSumItem', {
	
	extend: 'Frx.controller.ItemController',
	
	requires : [ 
		'Fleet.model.VehicleSpeedSum', 
		'Fleet.store.VehicleSpeedSum', 
		'Fleet.view.vehicle_speed_sum.VehicleSpeedSumItem'
	],
	
	mixins : [
		'Frx.mixin.lifecycle.FormLifeCycle'
	],
	
	models : ['Fleet.model.VehicleSpeedSum'],
			
	stores: ['Fleet.store.VehicleSpeedSum'],
	
	views : ['Fleet.view.vehicle_speed_sum.VehicleSpeedSumItem'],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'fleet_vehicle_speed_sum_item' : this.EntryPoint(),
			'fleet_vehicle_speed_sum_form' : this.FormEventHandler()
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