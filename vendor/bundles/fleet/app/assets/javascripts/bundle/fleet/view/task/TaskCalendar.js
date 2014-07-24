Ext.define('Fleet.view.task.TaskCalendar', {
	
	extend : 'Ext.form.Panel',
	
	requires : [
		'Fleet.store.TaskCalendar',
		'Fleet.store.TaskCalendarEvent'
	],
	
	xtype : 'fleet_task_calendar',
	
	title : T('menu.TaskCalendar'),
	
	autoScroll : true,
	
	mixins : {
		spotlink : 'Frx.mixin.view.SpotLink'
	},
	
	layout : {
		type : 'vbox',
		align : 'stretch'
	},
	
	initComponent : function() {
		this.items = [ {
			
			xtype : 'calendarpanel',
	
	        id : 'task_calendar',
	
			itemId : 'task_calendar',
			
			flex : 1,
			
			eventStore : Ext.StoreManager.lookup('Fleet.store.TaskCalendarEvent'),
	
		    calendarStore : Ext.StoreManager.lookup('Fleet.store.TaskCalendar'),
			
			showDayView : false,
			
			showWeekView : false,
	
			detailsXtype : 'eventeditform',
			
		    activeItem : 3,
	
		    monthViewCfg : {
		        showHeader : true,
		        showWeekLinks : false,
		        showWeekNumbers : true
		    }/*,
			
			weekViewCfg : {
				weekCount : 1,
				showHeader : true,
				showWeekNumbers : true,
				showToday : true
			}*/
		} ];
		
		this.callParent();
	},
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'add']
	} ]
});
