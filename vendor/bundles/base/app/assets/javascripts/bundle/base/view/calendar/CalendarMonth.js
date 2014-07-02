Ext.define('Base.view.calendar.CalendarMonth', {
	extend : 'Ext.container.Container',
	
	requires : [
		// 'Base.view.calendar.CalendarEventDetails',
		'Base.store.WorkCalendar', 
		'Base.store.WorkCalendarEvent'
	],

	xtype : 'base_calendar_month',

	title : T('title.calendar'),

	layout : {
		align : 'stretch',
		type : 'vbox'
	},

	initComponent : function() {
		this.items = [{
			xtype : 'calendarpanel',
	
	        id: 'work_calendar',
			
			flex : 1,
			
		    eventStore: Ext.StoreManager.lookup('Base.store.WorkCalendarEvent'),
	
		    calendarStore: Ext.StoreManager.lookup('Base.store.WorkCalendar'),
	
	        // detailsXtype : 'base_calendar_event_details',
			detailsXtype : 'eventeditform',
			
		    activeItem: 3, // month view
	
		    monthViewCfg: {
		        showHeader: true,
		        showWeekLinks: true,
		        showWeekNumbers: true
		    },
			
			dockedItems: [ {
				xtype: 'controlbar',
				items: ['->', 'list', 'change_shift_time']
			} ]
		}];
		
		this.callParent();
		
	}
});