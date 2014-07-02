/**
 * UserListPopup controller
 */
Ext.define('Base.controller.user.UserListPopup', {
	
	extend: 'Frx.controller.ListController',
	
	requires : [ 
		'Base.model.User', 
		'Base.store.User', 
		'Base.view.user.UserListPopup' 
	],
	
	models : ['Base.model.User'],
			
	stores: ['Base.store.User'],
	
	views : ['Base.view.user.User'],
	
	refs: [ {
		ref : 'UserListPopup', selector : 'base_user_list_popup' 
	} ],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'base_user_list_popup' : {
				paramschange : this.onParamsChange,
				click_select : this.onUserSelectClick,
				click_search : this.onSearchClick,
				click_close : this.onClickClose,
				after_update_list : this.onAfterUpdateList
			}
		});
	},
	
	onParamsChange: function(view, params) {
		view.userStore.load();
	},
	
	/**
	 * 사용자 리스트 팝업에서 선택한 사용자 정보를 자신을 호출한 owner의 selectUsers를 호출하면서 넘겨준다.
	 */
	onUserSelectClick : function() {
		var userListPopup = this.getUserListPopup();
		var userGrid = userListPopup.child(' grid');
		var selections = userGrid.getSelectionModel().getSelection();
		if(selections.length > 0) {
			userListPopup.getParams().by.selectUsers(selections);
		} else {
			HF.warn(T('text.Nothing selected'));
		}
		userListPopup.close();
	},
	
	/**
	 * 사용자 리스트 팝업에서 선택한 사용자 정보를 자신을 호출한 owner의 selectUsers를 호출하면서 넘겨준다.
	 */
	onSearchClick : function() {
		var userListPopup = this.getUserListPopup();
		var searchForm = userListPopup.child(' form');
		var params = searchForm.getValues();
		userListPopup.userStore.getProxy().extraParams = params;
		userListPopup.userStore.load({page : 1});
	},

	/**
	 * close button
	 */
	onClickClose : function(popup) {
		popup.close();
	},
	/****************************************************************
	 ** 			여기서 부터는 abstract method, 필수 구현 				   **
	 ****************************************************************/
	/**
	 * detail view type(popup | view | none)을 리턴
	 */	
	getDetailViewType : function() {
		return 'popup';
	},
	
	/**
	 * main view를 리턴 
	 */
	getMainView : function() {
		return this.getUserListPopup();
	},
	
	/**
	 * override
	 */
	getDefaultFilters : function() {
		return {};
	}
});