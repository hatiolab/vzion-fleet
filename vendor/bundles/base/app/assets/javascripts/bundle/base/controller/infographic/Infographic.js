Ext.define('Base.controller.infographic.Infographic', {
	
	extend: 'Frx.controller.ListController',
		
	models : ['Base.model.Infographic'],
	stores: ['Base.store.Infographic'],
	views : ['Base.view.infographic.Infographic'],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'base_infographic' : this.EntryPoint(),
			'base_infographic #goto_item' : {
				click : this.onGotoItem
			}
		});
	}

});