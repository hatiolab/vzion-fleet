/**
 * RemTraceDetail controller
 */
Ext.define('Base.controller.rem_trace.RemTraceItem', {
	
	extend : 'Frx.controller.ItemController',
	
	requires : [ 
		'Base.model.RemTrace', 
		'Base.store.RemTrace', 
		'Base.view.rem_trace.RemTraceItem'
	],
	
	mixins : [
		'Frx.mixin.lifecycle.FormLifeCycle'
	],
	
	models : ['Base.model.RemTrace'],
			
	stores : ['Base.store.RemTrace'],
	
	views : ['Base.view.rem_trace.RemTraceItem'],
	
	init : function() {
		this.callParent(arguments);
		
		this.control({
			'base_rem_trace_item' : this.EntryPoint(),
			'base_rem_trace_form' : this.FormEventHandler()
		});
	}
});