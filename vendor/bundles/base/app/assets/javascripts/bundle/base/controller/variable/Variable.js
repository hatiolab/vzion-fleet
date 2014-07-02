/**
 * Variable controller
 */
Ext.define('Base.controller.variable.Variable', {
	
	extend: 'Frx.controller.ListController',
	
	requires : [ 
		'Base.model.Variable', 
		'Base.store.Variable', 
		'Base.view.variable.Variable' 
	],
	
	models : ['Base.model.Variable'],
			
	stores: ['Base.store.Variable'],
	
	views : ['Base.view.variable.Variable'],
	
	refs: [ { ref : 'Variable', selector : 'base_variable' } ],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'base_variable' : this.EntryPoint(),
			'base_variable #goto_item' : {
				click : this.onGotoItem
			}
		});
	}

});