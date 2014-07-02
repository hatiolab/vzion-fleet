Ext.define('Base.view.calendar.CalendarItem', {

	extend : 'Ext.tab.Panel',
	
 	requires : [
		'Base.view.calendar.CalendarForm',
		'Base.view.calendar.CalendarMonth'
	],
	
	xtype : 'base_calendar_item',
	
	mixins : {
		spotlink : 'Frx.mixin.view.SpotLink'
	},
	
	title : T('menu.Calendar'),
	
	items : [ {
		xtype : 'base_calendar_form'
	}, {
		xtype : 'base_calendar_month'
	} ]
});