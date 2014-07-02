Ext.define('Base.model.DiyService', {
    
	extend : 'Ext.data.Model',
    
	fields : [
		{ name : 'id', type : 'string' },
		{ name : 'name', type : 'string' },
		{ name : 'description', type : 'string' },
		{ name : 'script_type', type : 'string' },
		{ name : 'active_flag', type : 'bool' },
		{ name : 'service_logic', type : 'text' },
		{ name : 'atomic_flag', type : 'boolean' },
		{ name : 'creator', type : 'auto' },
		{ name : 'updater', type : 'auto' },
		{ name : 'created_at', type : 'date' }, 
		{ name : 'updated_at', type : 'date' }, 
		{ name : 'service_in_params', type : 'auto' }, 
		{ name : 'service_out_params', type : 'auto' }, 
		{ name : '_cud_flag_', type : 'string' }
	],
	
	validations : [
		{ type : 'presence',  field : 'name' },
		{ type : 'length',    field : 'name', min : 2, max : 60 },
		{ type : 'length',    field : 'description', max : 255 },
		{ type : 'presence',  field : 'script_type' }
	],	
	
  	proxy : {
		type : 'rest',
		url : 'diy_services',
		format : 'json',
	    reader : {
			type : 'json'
        },
        writer : {
			type : 'json',
			root : 'diy_service'
        }
	}
});