Ext.define('Base.controller.common_code.AddCommonCodePopup', {

	extend: 'Ext.app.Controller',

	mixins : ['Frx.mixin.lifecycle.PopupLifeCycle'],
	
	views: ['Base.view.common_code.AddCommonCodePopup'],

	refs: [{
		selector: 'base_common_code_add_popup',
		ref: 'addPopup'
	}],

	init: function() {
		this.control({
			'base_common_code_add_popup': this.PopupEventHandler({
				click_add : this.onClickAdd,
				click_close : this.onClickClose
			})
		});
	},

	onPopupParamsChange : function(popup, params) {
		var codeInfo = popup.down('#codeinfo');
		codeInfo.update(params);
	},

	onClickAdd: function(popup) {
		var name = popup.down('#code').getValue();
		var description = popup.down('#description').getValue();
		
		Ext.Ajax.request({
			url: 'common_codes.json',
			method: 'POST',
			params: {
				'common_code[name]' : name,
				'common_code[description]' : description,
				'common_code[parent_id]' : popup.getParams().id
			},
			success: function(response) {
				/* 공통 코드가 추가된 후에는 캐시되어있는 스토어를 리로드 한다. */
				HF.code_store_refresh(popup.getParams().name);

				// HF.success(T('text.Success to Create Code'));
				popup.close();
			},
			scope : this
		});
	}
});
