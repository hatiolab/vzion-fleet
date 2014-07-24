Ext.define('Fleet.controller.task.TaskPopup', {
	
	extend : 'Frx.controller.ItemController',
	
	requires : [ 
		'Fleet.model.Task', 
		'Fleet.store.Task', 
		'Fleet.view.task.TaskPopup'
	],
	
	mixins : [
		'Frx.mixin.lifecycle.FormLifeCycle',
		'Frx.mixin.lifecycle.PopupLifeCycle'
	],
	
	models : ['Fleet.model.Task'],
			
	stores : ['Fleet.store.Task'],
	
	views : ['Fleet.view.task.TaskPopup'],
	
	init : function() {
		this.callParent(arguments);
		
		this.control({
			'fleet_task_popup' : this.EntryPoint(),
			'fleet_task_form' : this.FormEventHandler()
		});
	},
	
	/**
	 * override
	 */
	onAfterSaveItem : function(view, record) {
		this.reloadListPopup(view);
	},
	
	/**
	 * callback on after delete item
	 *
	 * @view
	 */
	onAfterDeleteItem : function(view) {
		this.reloadListPopup(view);
	},
	
	/**
	 * list popup을 reload
	 */
	reloadListPopup : function(view) {
		var popup = view.up('popup');
		var params = popup.getParams();
		if(params.openerStore) {
			if(params.reloadStore) {
				params.openerStore.reload();
			}
		}
		popup.close();
	}	
});