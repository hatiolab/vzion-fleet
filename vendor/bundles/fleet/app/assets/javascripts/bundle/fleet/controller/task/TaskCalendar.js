Ext.define('Fleet.controller.task.TaskCalendar', {
	
	extend : 'Frx.controller.OpsController',
	
	mixins : [
		'Frx.mixin.lifecycle.FormLifeCycle'
	],
	
	requires : [ 
		'Fleet.model.Task',
		'Fleet.store.Task',
		'Fleet.store.TaskCalendar', 
		'Fleet.store.TaskCalendarEvent',		
		'Fleet.view.task.TaskCalendar',
		'Fleet.view.task.TaskListPopup'
	],

	models : ['Fleet.model.Task'],
			
	stores: [
		'Fleet.store.Task',
		'Fleet.store.TaskCalendar', 
		'Fleet.store.TaskCalendarEvent'
	],
	
	views : [
		'Fleet.view.task.TaskCalendar',
		'Fleet.view.task.TaskListPopup'
	],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'fleet_task_calendar' : this.EntryPoint({
				click_add : this.onPopupNew
			}),
			'fleet_task_calendar calendarpanel' : {
				eventclick : this.onEventClick
			},
			'fleet_task_list_popup' : {
				paramschange : this.onListPopupParamsChange,
				click_close : this.onListPopupClose
			},
			'fleet_task_list_popup #go_detail' : {
				click : this.onPopupUpdate
			}
		});
	},
	
	onPopupNew : function(view, params) {
		var calendarPanel = view.child('calendarpanel');
		var params = {
			id : null,
			openerStore : calendarPanel.eventStore,
			reloadStore : true 
		};
		HF.popup('Fleet.view.task.TaskPopup', params, {});		
	},
	
	onPopupUpdate : function(gridView, td, rowIndex, colIndex, event, record, tr, grid) {
		var params = {
			id : record.get('id'),
			openerStore : gridView.store,
			reloadStore : true 
		};
		HF.popup('Fleet.view.task.TaskPopup', params, {});
	},	
	
	onEventClick : function(vw, rec, el) {
		rec.raw.activeViewId = vw.id;	
		HF.popup('Fleet.controller.task.TaskListPopup', rec.raw, null);
	},
	
	onListPopupParamsChange : function(view, params) {
		var paramObj = {};
		paramObj['_q[start_date-eq]'] = view.getParams().start_date;
		view.child('grid').store.getProxy().extraParams = paramObj;
		view.child('grid').store.load();
	},
	
	/**
	  * 팝업 close
	 */
	onListPopupClose : function(view) {
		Ext.StoreManager.lookup('Fleet.store.TaskCalendarEvent').reload();
		view.close();
	},
		
	/****************************************************************
	 ** 					abstract method, 필수 구현 			   **
	 ****************************************************************/
});