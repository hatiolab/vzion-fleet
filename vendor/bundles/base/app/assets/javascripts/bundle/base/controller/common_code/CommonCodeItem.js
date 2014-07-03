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
	},
	
	/**
	 * Override, cudType이 u인 경우 원래 코드인 store.getUpdatedRecords()가 항상 결과가 없음. 이 부분 수정 
	 */
	getStoreRecords : function(store, cudType, recordList) {
		var records = [];
		if(cudType == 'c') {
			records = store.getNewRecords();
		} else if(cudType == 'u') {
			store.each(function(record) {
				if(record.dirty && record.data.id) {
					records.push(record);
				}
			}, this);
		} else if(cudType == 'd') {
			records = store.getRemovedRecords();
		}
		
		Ext.each(records, function(record) {
			record.set('_cud_flag_', cudType);
			var data = this.validateMultipleUpdateData(Ext.clone(record.getData()));
			recordList.push(data);
		}, this);
	}
});