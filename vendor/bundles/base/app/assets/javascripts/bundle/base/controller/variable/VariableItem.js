/**
 * VariableDetail controller
 */
Ext.define('Base.controller.variable.VariableItem', {
	
	extend: 'Frx.controller.ItemController',
	
	requires : [ 
		'Base.model.Variable', 
		'Base.store.Variable', 
		'Base.view.variable.VariableItem'
	],
	
	mixins : [
		'Frx.mixin.lifecycle.FormLifeCycle'
	],
	
	models : ['Base.model.Variable'],
			
	stores: ['Base.store.Variable'],
	
	views : ['Base.view.variable.VariableItem'],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'base_variable_item' : this.EntryPoint(),
			'base_variable_form' : this.FormEventHandler(),
			'base_variable_logic' : this.FormEventHandler()
		});
	}
	
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