Ext.define('Base.controller.diy_selection.DiySelectionItem', {
	
	extend: 'Frx.controller.ItemController',
	
	mixins : [
		'Frx.mixin.lifecycle.FormLifeCycle',
		'Frx.mixin.lifecycle.ListLifeCycle'
	],
	
	requires : [ 
		'Base.model.DiySelection', 
		'Base.model.ServiceInParam', 
		'Base.model.ServiceOutParam', 
		'Base.store.DiySelection', 
		'Base.view.diy_selection.DiySelectionItem'
	],
	
	models : ['Base.model.DiySelection', 'Base.model.ServiceInParam', 'Base.model.ServiceOutParam'],
			
	stores: ['Base.store.DiySelection'],
	
	views : ['Base.view.diy_selection.DiySelectionItem'],
		
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'base_diy_selection_item' : this.EntryPoint(),
			'base_diy_selection_form' : this.FormEventHandler(),
			'base_diy_selection_in_params_list' : this.ListEventHandler({
				after_load_item : this.onAfterLoadItemElse
			}),
			'base_diy_selection_out_params_list' : this.ListEventHandler({
				after_load_item : this.onAfterLoadItemElse
			}),
			'base_diy_selection_test' : {
				after_load_item : this.onAfterLoadItemElse,
				click_invoke : this.onInvokeClick,
				click_list : this.onClickList
			},
			'base_diy_selection_logic' : this.FormEventHandler()
		});
	},
	
	/****************************************************************
	 ** 					여기는 customizing area 				   **
	 ****************************************************************/
	
	/**
	 * Invoke 버튼 클릭 시 
     * @testView
	 */
	onInvokeClick : function(view) {
		var testParamsForm = view.child('form');
		var testParams = testParamsForm.getValues(true);

    	Ext.Ajax.request({
		    url : 'diy_selections/' + view._record.get('name') + '/shoot.json?test=y',
		    method : 'POST',
		    params : testParams,
		    success : function(response) {
		        var res = Ext.JSON.decode(response.responseText);
				view.showResult(view._record.get('service_out_params'), res);
			}
		});
	},
	
	/****************************************************************
	 ** 					Override 구현 						   **
	 ****************************************************************/
	/**
	 * override
	 */	
	getUpdateListUrl : function(grid) {
		var parameterType = (grid.xtype == 'base_diy_selection_in_params_list') ? 'in' : 'out';
		return 'diy_selections/' + grid._record.get('id') + '/update_multiple_parameters.json?type=' + parameterType;
	},
	
	onAfterLoadItemElse : function(view, record) {
		view._record = record;
		view.setRecord(record);
	},

	/**
	 * 데이터 생성을 위한 새로운 엔티티 생성 
	 * TODO 서브리스트 모델임을 표현할 수 있으면 좋겠음. 뷰(대부분 그리드)가 이미 모델을 가지고 있을 것임. 이용해서 일반화해보자.
	 */
	newRecord : function(grid) {
		return {
			id : '',
			name : '',
			description : '',
			resource_type : 'DiySelection',
			resource_id : grid._record.get('id'),
			rank : grid.store.getCount() + 1
		};
	}
});