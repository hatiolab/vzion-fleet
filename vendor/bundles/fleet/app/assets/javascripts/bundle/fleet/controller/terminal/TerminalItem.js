/**
 * TerminalDetail controller
 */
Ext.define('Fleet.controller.terminal.TerminalItem', {
	
	extend: 'Frx.controller.ItemController',
	
	requires : [ 
		'Fleet.model.Terminal', 
		'Fleet.store.Terminal', 
		'Fleet.view.terminal.TerminalItem'
	],
	
	mixins : [
		'Frx.mixin.lifecycle.FormLifeCycle'
	],
	
	models : ['Fleet.model.Terminal'],
			
	stores: ['Fleet.store.Terminal'],
	
	views : ['Fleet.view.terminal.TerminalItem'],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'fleet_terminal_item' : this.EntryPoint(),
			'fleet_terminal_form' : this.FormEventHandler()
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