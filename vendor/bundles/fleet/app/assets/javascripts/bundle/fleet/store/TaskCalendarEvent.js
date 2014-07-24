Ext.define('Fleet.store.TaskCalendarEvent', {
	
	extend : 'Ext.data.Store',
	
    model : 'Ext.calendar.data.EventModel',

	autoLoad : true,
	
	proxy : {
		type : 'ajax',
		url : '/tasks/task_calendar.json',
		reader : {
			type : 'json',
			root : 'items',
			totalProperty : 'total'
		},
		writer : {
            type : 'json',
			nameProperty : 'mapping'
        }
	},
	
	pageSize : 1000	
});