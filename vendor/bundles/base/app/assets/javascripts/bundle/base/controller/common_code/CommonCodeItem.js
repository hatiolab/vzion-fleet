Ext.define('Base.controller.common_code.CommonCodeItem', {
	
	extend: 'Frx.controller.ItemController',
	
	mixins : [
		'Frx.mixin.lifecycle.FormLifeCycle',
		'Frx.mixin.lifecycle.ListLifeCycle'
	],
	
	requires : [ 
		'Base.model.CommonCode', 
		'Base.store.CommonCode', 
		'Base.view.common_code.CommonCodeItem'
	],
	
	models : ['Base.model.CommonCode'],
			
	stores: ['Base.store.SubCode'],
	
	views : [
		'Base.view.common_code.CommonCodeItem'
	],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'base_common_code_item' : this.EntryPoint(),
			'base_common_code_form' : this.FormEventHandler(),
			'base_common_code_list' : this.ListEventHandler({
				'after_load_item' : this.onAfterLoadItemForList
			})
		});
	},
	
	onAfterLoadItemForList : function(grid, records, operation) {
		grid.getStore().loadData(records.get('items'));
	},
	
	/**
	 * multiple update url을 리턴 
	 */
	getUpdateListUrl : function(grid) {
		var id = grid.up().getParams().id;
		return 'common_codes/' + id + '/update_multiple_codes.json';
	},

	onAfterUpdateList : function(grid, updateType, response) {
		/* 공통 코드가 수정된 후에는 캐시되어있는 스토어를 리로드 한다. */
		var view = grid.up();
		var form = view.down('base_common_code_form');
		var codename = form.getValues().name;
		HF.code_store_refresh(codename);
		this.loadItem(view, view.getParams());
	},

	/**
	 * 모델 생성
	 *
	 * @grid
	 */
	newRecord : function(grid) {
		return Ext.create(grid.getStore().model, {
			parent_id : grid.up().getParams().id
		});
	}
});