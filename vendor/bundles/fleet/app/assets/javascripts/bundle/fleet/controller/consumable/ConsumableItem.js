/**
 * ConsumableDetail controller
 */
Ext.define('Fleet.controller.consumable.ConsumableItem', {
	
	extend: 'Frx.controller.ItemController',
	
	requires : [ 
		'Fleet.model.Consumable', 
		'Fleet.store.Consumable', 
		'Fleet.view.consumable.ConsumableItem'
	],
	
	mixins : [
		'Frx.mixin.lifecycle.FormLifeCycle'
	],
	
	models : ['Fleet.model.Consumable'],
			
	stores: ['Fleet.store.Consumable'],
	
	views : ['Fleet.view.consumable.ConsumableItem'],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'fleet_consumable_item' : this.EntryPoint(),
			'fleet_consumable_form' : this.FormEventHandler()
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