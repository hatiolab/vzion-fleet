/**
 * Entity controller
 */
Ext.define('Base.controller.entity.Entity', {

	extend: 'Frx.controller.ListController',
		
	requires : [ 
		'Base.model.Entity', 
		'Base.store.Entity', 
		'Base.view.entity.Entity' 
	],

	models : ['Base.model.Entity'],

	stores: ['Base.store.Entity'],

	views : ['Base.view.entity.Entity'],

	init: function() {
		this.callParent(arguments);

		this.control({
			'base_entity' : this.EntryPoint(),
			'base_entity #goto_item' : {
				click : this.onGotoItem
			}
		});
	},

	/****************************************************************
	 ** 			여기는 customizing area 						   **
	 ****************************************************************/
	/**
	 * 서버로 전달되서는 안 되는 값을 제거하거나 값을 선처리한다.
	 * 
	 * @data
	 */
	validateMultipleUpdateData : function(data) {
		Ext.Array.each(['entity_columns', 'list_infographic', 'item_infographic', 'creator', 'updater', 'creator_id', 'created_at', 'updater_id', 'updated_at'], function(key) {
			delete data[key];
		});

		return data;
	}
});