/**
 * User controller
 */
Ext.define('Base.controller.user.User', {
	
	extend: 'Frx.controller.ListController',
	
	requires : [ 
		'Base.model.User', 
		'Base.store.User', 
		'Base.view.user.User' 
	],
	
	models : ['Base.model.User'],
			
	stores: ['Base.store.User'],
	
	views : ['Base.view.user.User'],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'base_user' : this.EntryPoint(),
			'base_user #goto_item' : {
				click : this.onGotoItem
			}
		});
		
	},

	onListClickAdd : function(grid) {
		HF.popup('Base.view.user.UserPopup', {}, {});
	},
	
	onGotoItem : function(grid, td, rowIndex, colIndex, event, record, tr) {
		HF.popup('Base.view.user.UserPopup', record.data, {});
	},
	
	onListClickDelete : function(grid) {
		var selections = grid.getSelectionModel().getSelection();
		if(selections.length > 0) {
			HF.msg.confirm({
				msg : T('text.Sure to Delete'),
				fn : function(confirmBtn) {
					if(confirmBtn == 'yes') {
						var idsToDelete = [];
						Ext.Array.each(selections, function(selection) {
							idsToDelete.push(selection.data.id);
						});
						
						if(idsToDelete.length == 0) {
							HF.msg.notice(T('text.Nothing selected'));
						} else {
							Ext.Ajax.request({
								url: 'destroy_multiple.json',
								method: 'POST',
								params: {ids : Ext.JSON.encode(idsToDelete)},
								success: function(response) {
									grid.fireEvent('after_update_list', grid, 'd', null);
								},
								scope : this
							});
						}
					}
				},
				scope : this
			});
		} else {
			HF.msg.notice(T('text.Nothing selected'));
		}
	}
});