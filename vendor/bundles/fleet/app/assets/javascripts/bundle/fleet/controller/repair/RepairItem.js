/**
 * RepairDetail controller
 */
Ext.define('Fleet.controller.repair.RepairItem', {
	
	extend: 'Frx.controller.ItemController',
	
	requires : [ 
		'Fleet.model.Repair', 
		'Fleet.store.Repair', 
		'Fleet.view.repair.RepairItem'
	],
	
	mixins : [
		'Frx.mixin.lifecycle.FormLifeCycle'
	],
	
	models : ['Fleet.model.Repair'],
			
	stores: ['Fleet.store.Repair'],
	
	views : ['Fleet.view.repair.RepairItem'],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'fleet_repair_item' : this.EntryPoint(),
			'fleet_repair_form' : this.FormEventHandler()
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