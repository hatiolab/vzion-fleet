/**
 * DriverSpeedSumDetail controller
 */
Ext.define('Fleet.controller.driver_speed_sum.DriverSpeedSumItem', {
	
	extend: 'Frx.controller.ItemController',
	
	requires : [ 
		'Fleet.model.DriverSpeedSum', 
		'Fleet.store.DriverSpeedSum', 
		'Fleet.view.driver_speed_sum.DriverSpeedSumItem'
	],
	
	mixins : [
		'Frx.mixin.lifecycle.FormLifeCycle'
	],
	
	models : ['Fleet.model.DriverSpeedSum'],
			
	stores: ['Fleet.store.DriverSpeedSum'],
	
	views : ['Fleet.view.driver_speed_sum.DriverSpeedSumItem'],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'fleet_driver_speed_sum_item' : this.EntryPoint(),
			'fleet_driver_speed_sum_form' : this.FormEventHandler()
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