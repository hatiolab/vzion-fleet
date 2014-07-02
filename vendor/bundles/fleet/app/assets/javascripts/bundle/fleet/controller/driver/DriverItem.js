/**
 * DriverDetail controller
 */
Ext.define('Fleet.controller.driver.DriverItem', {
	
	extend: 'Frx.controller.ItemController',
	
	requires : [ 
		'Fleet.model.Driver', 
		'Fleet.store.Driver', 
		'Fleet.view.driver.DriverItem'
	],
	
	mixins : [
		'Frx.mixin.lifecycle.FormLifeCycle'
	],
	
	models : ['Fleet.model.Driver'],
			
	stores: ['Fleet.store.Driver'],
	
	views : ['Fleet.view.driver.DriverItem'],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'fleet_driver_item' : this.EntryPoint(),
			'fleet_driver_form' : this.FormEventHandler()
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