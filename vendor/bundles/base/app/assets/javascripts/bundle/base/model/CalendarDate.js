Ext.define('Base.model.CalendarDate', {
    
	extend: 'Ext.data.Model',

	fields : [
		{ name : 'id', type : 'string' },
		{ name : 'calendar_id', type : 'string' },
		{ name : 'description', type : 'string' },
		{ name : 'sys_date', type : 'date' },
		{ name : 'julian_day', type : 'int' },
		{ name : 'plan_year', type : 'int' },
		{ name : 'plan_quarter', type : 'int' },
		{ name : 'plan_month', type : 'int' },
		{ name : 'plan_week', type : 'int' },
		{ name : 'iso_year', type : 'int' },
		{ name : 'start_time', type : 'int' },
		{ name : 'work_hours', type : 'float' },
		{ name : 'shift1_start', type : 'time' },
		{ name : 'shift2_start', type : 'time' },
		{ name : 'shift3_start', type : 'time' },
		{ name : 'shift4_start', type : 'time' },
		{ name : 'week_day', type : 'int' },
		{ name : 'dayoff_flag', type : 'boolean' },
		{ name : 'creator', type : 'auto' },
		{ name : 'updater', type : 'auto' },
		{ name : 'created_at', type : 'date' },
		{ name : 'updated_at', type : 'date' },
		{ name : '_cud_flag_', type : 'string' }
	],

	proxy: {
		type: 'rest',
		url : 'calendar_dates',
		format : 'json',
	    reader: {
			type: 'json'
	    },
	    writer: {
			type: 'json',
			root: 'calendar_date'
	    }
	}
});