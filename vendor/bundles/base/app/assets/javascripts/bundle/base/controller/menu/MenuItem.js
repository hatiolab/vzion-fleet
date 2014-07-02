Ext.define('Base.controller.menu.MenuItem', {
	
	extend: 'Frx.controller.ItemController',
	
	mixins : [
		'Frx.mixin.lifecycle.ListLifeCycle'
	],
	
	requires : [ 
		'Base.model.Menu', 
		'Base.store.SubMenu', 
		'Base.view.menu.MenuItem'
	],
	
	models : ['Base.model.Menu'],
			
	stores: ['Base.store.SubMenu'],
	
	views : ['Base.view.menu.MenuItem'],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'base_menu_item' : this.EntryPointWith(
				this.ListEventHandler()
			)
		});
	},
	
	
	/**
	 * save item data modified on the view
	 * 
	 * @view
	 * @params
	 */
	loadItem : function(view, params) {
		var store = view.getStore();
		store.load({
			params : {
				"parent_id-eq" : params.id,
				"menu_type-noteq" : 'MENU'
			},
			callback : function(records, operation, success) {
				if(success) {
					view.fireEvent('after_load_list', view, records, operation);
				}
			}
		});
	},
	
	/**
	 * multiple update url을 리턴 
	 */
	getUpdateListUrl : function(grid) {
		return 'menus/update_multiple.json';
	},

	/**
	 * after grid updated
	 */
	onAfterUpdateList : function(grid, updateType, response) {
		grid.getStore().reload();
	},	
	
	/**
	 * 모델 생성
	 *
	 * @grid
	 */
	newRecord : function(grid) {
		return Ext.create(grid.getStore().model, {
			parent_id : grid.getParams().id,
			menu_type : 'SCREEN',
			rank : 1
		});
	}
	
});