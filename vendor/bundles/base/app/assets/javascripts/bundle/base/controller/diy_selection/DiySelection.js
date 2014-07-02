/**
 * DiySelection controller
 */
Ext.define('Base.controller.diy_selection.DiySelection', {
	
	extend: 'Frx.controller.ListController',
		
	requires : [
		'Base.model.DiySelection', 
		'Base.store.DiySelection', 
		'Base.view.diy_selection.DiySelection' 
	],
		
	models : ['Base.model.DiySelection'],
			
	stores: ['Base.store.DiySelection'],
	
	views : ['Base.view.diy_selection.DiySelection'],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'base_diy_selection' : this.EntryPoint(),
			'base_diy_selection #goto_item' : {
				click : this.onGotoItem
			}
		});
	}
});