Ext.define('Base.controller.property.PropertyItem', {
	
	extend: 'Frx.controller.ItemController',
	
	mixins : [
		'Frx.mixin.lifecycle.FormLifeCycle'
	],
		
	models : ['Base.model.Property'],
	stores: ['Base.store.Property'],
	views : ['Base.view.property.PropertyItem'],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'base_property_item' : this.EntryPointWith(
				this.FormEventHandler()
			)
		});
	}
	
});
