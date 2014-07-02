/**
 * CommonCode controller
 */
Ext.define('Base.controller.common_code.CommonCode', {
	
	extend: 'Frx.controller.ListController',
	
	requires : [ 
		'Base.model.CommonCode', 
		'Base.store.CommonCode', 
		'Base.view.common_code.CommonCode' 
	],
	
	models : ['Base.model.CommonCode'],
			
	stores: ['Base.store.CommonCode'],
	
	views : ['Base.view.common_code.CommonCode'],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'base_common_code' : this.EntryPoint(),
			'base_common_code #goto_item' : {
				click : this.onGotoItem
			}
		});
	},

	getDefaultFilters : function() {
		return {'parent_id-is_null' : ''};
	}

});