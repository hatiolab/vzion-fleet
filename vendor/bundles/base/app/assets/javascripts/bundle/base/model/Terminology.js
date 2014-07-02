Ext.define('Base.model.Terminology', {
    
	extend : 'Ext.data.Model',
    
	fields : [
		{ name : 'id', type : 'string' },
		{ name : 'name', type : 'string' },
		{ name : 'description', type : 'string' },
		{ name : 'locale', type : 'string' },
		{ name : 'category', type : 'string' },
		{ name : 'display', type : 'string' },
		{ name : 'display_short', type : 'string' },
		{ name : 'creator', type : 'auto' },
		{ name : 'updater', type : 'auto' },
		{ name : 'created_at', type : 'date' }, 
		{ name : 'updated_at', type : 'date' }, 
		{ name : '_cud_flag_', type : 'string' }
	],
	
	validations : [
		{ type : 'presence',  field : 'name' },
		{ type : 'length',    field : 'name', min : 2, max : 60 },
		{ type : 'length',    field : 'description', max : 255 },
		{ type : 'presence',  field : 'locale' },
		{ type : 'presence',  field : 'category' },
		{ type : 'presence',  field : 'display' }
	],	
	
  	proxy : {
		type : 'rest',
		url : 'terminologies',
		format : 'json',
	    reader : {
			type : 'json'
        },
        writer : {
			type : 'json',
			root : 'terminology'
        }
	}
});