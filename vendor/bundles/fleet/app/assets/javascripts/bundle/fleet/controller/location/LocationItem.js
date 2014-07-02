/**
 * LocationDetail controller
 */
Ext.define('Fleet.controller.location.LocationItem', {
	
	extend: 'Frx.controller.ItemController',
	
	requires : [ 
		'Fleet.model.Location', 
		'Fleet.store.Location', 
		'Fleet.view.location.LocationItem'
	],
	
	mixins : [
		'Frx.mixin.lifecycle.FormLifeCycle'
	],
	
	models : ['Fleet.model.Location'],
			
	stores: ['Fleet.store.Location'],
	
	views : ['Fleet.view.location.LocationItem'],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'fleet_location_item' : this.EntryPoint(),
			'fleet_location_form' : this.FormEventHandler()
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