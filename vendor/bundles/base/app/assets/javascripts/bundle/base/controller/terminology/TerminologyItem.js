Ext.define('Base.controller.terminology.TerminologyItem', {
	
	extend: 'Frx.controller.ItemController',
	
	mixins : [
		'Frx.mixin.lifecycle.FormLifeCycle'
	],
	
	requires : [ 
		'Base.model.Terminology', 
		'Base.store.Terminology', 
		'Base.view.terminology.TerminologyItem'
	],
	
	models : ['Base.model.Terminology'],
			
	stores: ['Base.store.Terminology'],
	
	views : ['Base.view.terminology.TerminologyItem'],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'base_terminology_item' : this.EntryPointWith(
				this.FormEventHandler()
			)
		});
	}
	
});