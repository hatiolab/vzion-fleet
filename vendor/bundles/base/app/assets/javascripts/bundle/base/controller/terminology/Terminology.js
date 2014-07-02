Ext.define('Base.controller.terminology.Terminology', {
	
	extend: 'Frx.controller.ListController',
		
	models : ['Base.model.Terminology'],
	stores: ['Base.store.Terminology'],
	views : ['Base.view.terminology.Terminology'],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'base_terminology' : this.EntryPoint(),
			'base_terminology #goto_item' : {
				click : this.onGotoItem
			}
		});
	}

});