Ext.define('Fleet.model.DriversByGroup', {
	
	extend : 'Ext.data.Model',
	
	fields : [
		{ name : 'id', type : 'string' },
		{ name : 'driver', type : 'auto' },
		{ name : 'name', type : 'string' },
		{ name : 'description', type : 'string' },
		{ name : 'social_id', type : 'string' },
		{ name : 'division', type : 'string' },
		{ name : 'title', type : 'string' },
		{ name : 'phone_no', type : 'string' },
		{ name : 'mobile_no', type : 'string' },
		{ name : '_cud_flag_', type : 'string' }
	],	
	
	proxy : {
		type : 'rest',
		url : 'driver_groups',
		format : 'json',
	    reader : {
			type : 'json',
			root : 'items',
			successProperty : 'success',
			totalProperty : 'total'
        },
        writer : {
			type : 'json'
        }
	}
	
});