/**
 * DriverRunSumDetail controller
 */
Ext.define('Fleet.controller.driver_run_sum.DriverRunSumItem', {
	
	extend: 'Frx.controller.ItemController',
	
	requires : [ 
		'Fleet.model.DriverRunSum', 
		'Fleet.store.DriverRunSum', 
		'Fleet.view.driver_run_sum.DriverRunSumItem'
	],
	
	mixins : [
		'Frx.mixin.lifecycle.FormLifeCycle'
	],
	
	models : ['Fleet.model.DriverRunSum'],
			
	stores: ['Fleet.store.DriverRunSum'],
	
	views : ['Fleet.view.driver_run_sum.DriverRunSumItem'],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'fleet_driver_run_sum_item' : this.EntryPoint(),
			'fleet_driver_run_sum_form' : this.FormEventHandler()
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