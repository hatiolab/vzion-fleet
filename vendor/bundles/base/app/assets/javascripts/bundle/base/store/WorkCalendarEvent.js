Ext.define('Base.store.WorkCalendarEvent', {
    extend: 'Ext.data.Store',
    model: 'Ext.calendar.data.EventModel',

	autoLoad: false,
	
	proxy : {
		type : 'rest',
		url : 'shifts/to_events.json',
		reader : {
			type : 'json',
			root : 'items',
			totalProperty : 'total'
		},
		writer: {
            type: 'json',
			nameProperty: 'mapping'
        }
	},
	
	pageSize : 1000	
});
