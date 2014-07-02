/**
 * VehicleCheckinDetail controller
 */
Ext.define('Fleet.controller.vehicle_checkin.VehicleCheckinItem', {
	
	extend: 'Frx.controller.ItemController',
	
	requires : [ 
		'Fleet.model.VehicleCheckin', 
		'Fleet.store.VehicleCheckin', 
		'Fleet.view.vehicle_checkin.VehicleCheckinItem'
	],
	
	mixins : [
		'Frx.mixin.lifecycle.FormLifeCycle'
	],
	
	models : ['Fleet.model.VehicleCheckin'],
			
	stores: ['Fleet.store.VehicleCheckin'],
	
	views : ['Fleet.view.vehicle_checkin.VehicleCheckinItem'],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'fleet_vehicle_checkin_item' : this.EntryPoint(),
			'fleet_vehicle_checkin_form' : this.FormEventHandler()
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