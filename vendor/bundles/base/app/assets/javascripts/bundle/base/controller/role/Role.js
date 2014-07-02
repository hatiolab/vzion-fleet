Ext.define('Base.controller.role.Role', {
	
	extend : 'Frx.controller.ListController',
		
	requires : [ 
		'Base.model.Role', 
		'Base.store.Role', 
		'Base.view.role.Role' 
	],
	
	models : ['Base.model.Role'],
	
	stores : ['Base.store.Role'],
	
	views : ['Base.view.role.Role'],
	
	init : function() {
		this.callParent(arguments);
		
		this.control({
			'base_role' : this.EntryPoint(),
			'base_role #goto_item' : {
				click : this.onGotoItem
			}
		});
	}
});