Ext.define('Fleet.model.Task', {
    
	extend : 'Ext.data.Model',
    
	fields : [
		{ name : 'id', type : 'string' },
		{ name : 'domain_id', type : 'string' },
		{ name : 'title', type : 'string' },
		{ name : 'start_date', type : 'date', dateWriteFormat : 'Y-m-d', dateFormat: 'Y-m-d' },
		{ name : 'end_date', type : 'date', dateWriteFormat : 'Y-m-d', dateFormat: 'Y-m-d' },
		{ name : 'all_day', type : 'boolean' },
		{ name : 'category', type : 'string' },
		{ name : 'reminder', type : 'string' },
		{ name : 'notes', type : 'string' },
		{ name : 'loc', type : 'string' },
		{ name : 'rrule', type : 'string' },
		{ name : 'creator_id', type : 'integer' },
		{ name : 'creator', type : 'auto' },
		{ name : 'updater_id', type : 'integer' },
		{ name : 'updater', type : 'auto' },
		{ name : 'created_at', type : 'date' },
		{ name : 'updated_at', type : 'date' },
		{ name : '_cud_flag_', type : 'string' }
	],
	
  	proxy : {
		type : 'rest',
		url : 'tasks',
		format : 'json',
	    reader : {
			type : 'json'
        },
        writer : {
			type : 'json',
			root : 'task'
        }
	}
});