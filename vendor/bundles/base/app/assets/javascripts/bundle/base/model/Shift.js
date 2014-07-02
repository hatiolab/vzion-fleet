Ext.define('Base.model.Shift', {
    
	extend: 'Ext.data.Model',
    
	fields : [
		{ name : 'id', type : 'string' },
		{ name : 'domain_id', type : 'string' },
		{ name : 'name', type : 'string' },
		{ name : 'total_shift', type : 'integer' },
		{ name : 'default_flag', type : 'boolean' },
		{ name : 'shift1_start', type : 'string' },
		{ name : 'shift2_start', type : 'string' },
		{ name : 'shift3_start', type : 'string' },
		{ name : 'shift1_end', type : 'string' },
		{ name : 'shift2_end', type : 'string' },
		{ name : 'shift3_end', type : 'string' },
		{ name : 'shift1_start_add', type : 'integer' },
		{ name : 'shift1_end_add', type : 'integer' },
		{ name : 'shift2_start_add', type : 'integer' },
		{ name : 'shift2_end_add', type : 'integer' },
		{ name : 'shift3_start_add', type : 'integer' },
		{ name : 'shift3_end_add', type : 'integer' }
	],
	
  	proxy: {
		type: 'rest',
		url : 'shifts',
		format : 'json',
	    reader: {
			type: 'json'
        },
        writer: {
			type: 'json',
			root: 'shift'
        }
	}
});