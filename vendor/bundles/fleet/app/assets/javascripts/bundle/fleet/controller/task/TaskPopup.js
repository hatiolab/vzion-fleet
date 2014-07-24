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
	 * callback on after loadItem for each Sub View.
	 * 
	 * @view
	 * @record - data of model
	 */
	// onAfterLoadItem : function(view, record, operation) {
	// 	view.loadRecord(record);
	//
	// 	if(!record.data.id) {
	// 		view.up('prod_pm_popup').setHeight(360);
	// 		view.down('codefield[name=status]').hide();
	// 		view.down('datefield[name=check_date]').hide();
	// 		view.down('textfield[name=check_actual]').hide();
	// 		view.down('datefield[name=check_start_time]').hide();
	// 		view.down('datefield[name=check_end_time]').hide();
	// 		view.down('datefield[name=created_at]').hide();
	// 		view.down('datefield[name=updated_at]').hide();
	// 	} else {
	// 		view.down('codefield[name=status]').hide();
	// 		view.down('entityfield[name=machine]').setReadOnly(true);
	// 		view.down('datefield[name=plan_date]').setReadOnly(true);
	// 		view.down('datefield[name=due_date]').setReadOnly(true);
	// 	}
	// },
	
	/**
	 * callback on after save item
	 * 
	 * @view
	 * @record
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