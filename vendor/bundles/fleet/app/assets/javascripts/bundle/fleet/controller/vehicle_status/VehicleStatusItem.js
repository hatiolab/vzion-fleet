/**
 * VehicleStatusDetail controller
 */
Ext.define('Fleet.controller.vehicle_status.VehicleStatusItem', {
	
	extend: 'Frx.controller.ItemController',
	
	requires : [ 
		'Fleet.model.VehicleStatus', 
		'Fleet.store.VehicleStatus', 
		'Fleet.view.vehicle_status.VehicleStatusItem'
	],
	
	mixins : [
		'Frx.mixin.lifecycle.FormLifeCycle'
	],
	
	models : ['Fleet.model.VehicleStatus'],
			
	stores: ['Fleet.store.VehicleStatus'],
	
	views : ['Fleet.view.vehicle_status.VehicleStatusItem'],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'fleet_vehicle_status_item' : this.EntryPoint(),
			'fleet_vehicle_status_form' : this.FormEventHandler()
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