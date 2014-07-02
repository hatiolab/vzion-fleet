Ext.define('Base.model.Calendar', {
    
	extend: 'Ext.data.Model',
    
	fields : [
		{ name : 'id', type : 'string' },
		{ name : 'name', type : 'string' },
		{ name : 'description', type : 'string' },
		{ name : 'day1_off_flag', type : 'boolean' },
		{ name : 'day2_off_flag', type : 'boolean' },
		{ name : 'day3_off_flag', type : 'boolean' },
		{ name : 'day4_off_flag', type : 'boolean' },
		{ name : 'day5_off_flag', type : 'boolean' },
		{ name : 'day6_off_flag', type : 'boolean' },
		{ name : 'day7_off_flag', type : 'boolean' },
		{ name : 'day1_workhour', type : 'float' },
		{ name : 'day2_workhour', type : 'float' },
		{ name : 'day3_workhour', type : 'float' },
		{ name : 'day4_workhour', type : 'float' },
		{ name : 'day5_workhour', type : 'float' },
		{ name : 'day6_workhour', type : 'float' },
		{ name : 'day7_workhour', type : 'float' },
		{ name : 'creator', type : 'auto' },
		{ name : 'updater', type : 'auto' },
		{ name : 'created_at', type : 'date' },
		{ name : 'updated_at', type : 'date' },
		{ name : '_cud_flag_', type : 'string' }
	],

	validations : [
		{type : 'presence', field : 'name'}
	],
	
  	proxy: {
		type: 'rest',
		url : 'calendars',
		format : 'json',
	    reader: {
			type: 'json'
        },
        writer: {
			type: 'json',
			root: 'calendar'
        }
	}
});