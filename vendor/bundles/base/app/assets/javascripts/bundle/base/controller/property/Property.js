Ext.define('Base.controller.property.Property', {
	
	extend: 'Frx.controller.ListController',
		
	models : ['Base.model.Property'],
	stores: ['Base.store.Property'],
	views : ['Base.view.property.Property'],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'base_property' : this.EntryPoint(),
			'base_property #goto_item' : {
				click : this.onGotoItem
			}
		});
	}
	
});