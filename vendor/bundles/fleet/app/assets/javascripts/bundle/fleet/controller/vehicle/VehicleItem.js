/**
 * VehicleDetail controller
 */
Ext.define('Fleet.controller.vehicle.VehicleItem', {
	
	extend: 'Frx.controller.ItemController',
	
	requires : [ 
		'Fleet.model.Vehicle', 
		'Fleet.store.Vehicle', 
		'Fleet.view.vehicle.VehicleItem'
	],
	
	mixins : [
		'Frx.mixin.lifecycle.FormLifeCycle'
	],
	
	models : ['Fleet.model.Vehicle'],
			
	stores: ['Fleet.store.Vehicle'],
	
	views : ['Fleet.view.vehicle.VehicleItem'],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'fleet_vehicle_item' : this.EntryPoint(),
			'fleet_vehicle_form' : this.FormEventHandler()
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