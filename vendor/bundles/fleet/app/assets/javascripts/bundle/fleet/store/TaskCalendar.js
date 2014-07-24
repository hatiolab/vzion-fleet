Ext.define('Fleet.store.TaskCalendar', {
	
	extend : 'Ext.calendar.data.MemoryCalendarStore',
	
	data : {
        "calendars" : [ {
            "id"    : 1,
            "title" : "Inspection Plan",
            "color" : 2
        }, {
			"id"    : 2,
			"title" : "Inspection Actual",
			"color" : 4
        }, {
			"id"    : 3,
			"title" : "Maintenance Plan",
			"color" : 6
        }, {
			"id"    : 4,
			"title" : "Maintenance Actual",
			"color" : 8
        } ]
    }

});
