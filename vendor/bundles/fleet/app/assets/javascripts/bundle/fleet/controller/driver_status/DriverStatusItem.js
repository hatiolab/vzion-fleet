/**
 * DriverStatusDetail controller
 */
Ext.define('Fleet.controller.driver_status.DriverStatusItem', {
	
	extend: 'Frx.controller.ItemController',
	
	requires : [ 
		'Fleet.model.DriverStatus', 
		'Fleet.store.DriverStatus', 
		'Fleet.view.driver_status.DriverStatusItem'
	],
	
	mixins : [
		'Frx.mixin.lifecycle.FormLifeCycle'
	],
	
	models : ['Fleet.model.DriverStatus'],
			
	stores: ['Fleet.store.DriverStatus'],
	
	views : ['Fleet.view.driver_status.DriverStatusItem'],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'fleet_driver_status_item' : this.EntryPoint(),
			'fleet_driver_status_form' : this.FormEventHandler()
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