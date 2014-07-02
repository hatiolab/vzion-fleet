Ext.define('Base.model.Role', {
    
	extend : 'Ext.data.Model',
    
	fields : [
		{ name : 'id', type : 'string' }, 
		{ name : 'name', type : 'string' }, 	
		{ name : 'description', type : 'string' }, 	
		{ name : 'creator', type : 'auto' },
		{ name : 'updater', type : 'auto' },
		{ name : 'created_at', type : 'date' }, 
		{ name : 'updated_at', type : 'date' },
		{ name : '_cud_flag_', type : 'string' } 
	],
	
	validations : [
		{ type : 'presence',  field : 'name' },
		{ type : 'length',    field : 'name', min : 2, max : 60 },
		{ type : 'length',    field : 'description', max : 255 }
	],
	
  	proxy : {
		type : 'rest',
		url : 'roles',
		format : 'json',
	    reader : {
			type : 'json'
        },
        writer : {
			type : 'json',
			root : 'role'
        }
	}
});