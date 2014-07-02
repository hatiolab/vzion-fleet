/**
 * CalendarItem controller
 */
Ext.define('Base.controller.calendar.CalendarItem', {
	
	extend: 'Frx.controller.ItemController',
	
	mixins : [
		'Frx.mixin.lifecycle.FormLifeCycle',
		'Frx.mixin.lifecycle.ListLifeCycle',
		'Frx.mixin.lifecycle.PopupLifeCycle'
	],
	
	requires : [ 
		'Base.model.Calendar', 
		'Base.store.Calendar', 
		'Base.view.calendar.CalendarItem',
		'Base.view.calendar.ChangeShiftPopup'
	],
	
	models : ['Base.model.Calendar'],
			
	stores: ['Base.store.Calendar', 'Base.store.WorkCalendar', 'Base.store.WorkCalendarEvent'],
	
	views : ['Base.view.calendar.CalendarItem'],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'base_calendar_item' : this.EntryPoint(),
			'base_calendar_form' : this.FormEventHandler(),
			'base_calendar_month #work_calendar' : {
				click_list : this.onClickList,
				click_change_shift_time :  this.onChangeShiftTime
			},
			'base_change_shift_popup' : this.PopupEventHandler({
				click_save : this.onPopupSave
			})
		});
	},
	
	onChangeShiftTime:function(btn){
		HF.popup('Base.view.calendar.ChangeShiftPopup', {}, {});
	},
	
	onPopupSave : function(view) {
		alert("구현해야햠");
	}
});