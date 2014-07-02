/**
 * RemTrace controller
 */
Ext.define('Base.controller.rem_trace.RemTrace', {
	
	extend: 'Frx.controller.ListController',
	
	requires : [ 
		'Base.model.RemTrace', 
		'Base.store.RemTrace', 
		'Base.view.rem_trace.RemTrace' 
	],
	
	models : ['Base.model.RemTrace'],
			
	stores : ['Base.store.RemTrace'],
	
	views : ['Base.view.rem_trace.RemTrace'],
		
	init : function() {
		this.callParent(arguments);
		
		this.control({
			'base_rem_trace' : this.EntryPoint(),
			'base_rem_trace #goto_item' : {
				click : this.onGotoItem
			}
		});
	}

});