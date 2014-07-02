/**
 * VehicleConsumableDetail controller
 */
Ext.define('Fleet.controller.vehicle_consumable.VehicleConsumableItem', {
	
	extend: 'Frx.controller.ItemController',
	
	requires : [ 
		'Fleet.model.VehicleConsumable', 
		'Fleet.store.VehicleConsumable', 
		'Fleet.view.vehicle_consumable.VehicleConsumableItem'
	],
	
	mixins : [
		'Frx.mixin.lifecycle.FormLifeCycle'
	],
	
	models : ['Fleet.model.VehicleConsumable'],
			
	stores: ['Fleet.store.VehicleConsumable'],
	
	views : ['Fleet.view.vehicle_consumable.VehicleConsumableItem'],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'fleet_vehicle_consumable_item' : this.EntryPoint(),
			'fleet_vehicle_consumable_form' : this.FormEventHandler()
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