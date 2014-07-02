/**
 * Menu controller
 * View Type1 : grid - search
 */
Ext.define('Base.controller.menu.Menu', {
	
	extend: 'Frx.controller.ListController',
		
	requires : [ 
		'Base.model.Menu', 
		'Base.store.Menu', 
		'Base.view.menu.Menu' 
	],
	
	models : ['Base.model.Menu'],
			
	stores: ['Base.store.Menu'],
	
	views : ['Base.view.menu.Menu'],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'base_menu' : this.EntryPoint(),
			'base_menu #goto_item' : {
				click : this.onGotoItem
			}
		});
	},
		
	getDefaultFilters : function() {
		return { 'menu_type-eq' : 'MENU' };
	}
});