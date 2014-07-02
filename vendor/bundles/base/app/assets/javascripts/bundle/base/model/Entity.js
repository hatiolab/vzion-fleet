Ext.define('Base.model.Entity', {
    
	extend : 'Ext.data.Model',
    
	fields : [
		{ name : 'id', type : 'string' },
		{ name : 'name', type : 'string' },
		{ name : 'description', type : 'string' },
		{ name : 'bundle', type : 'string' },
		{ name : 'list_infographic_id', type : 'string' },
		{ name : 'list_infographic', type : 'auto' },
		{ name : 'item_infographic_id', type : 'string' },
		{ name : 'item_infographic', type : 'auto' },
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
		{ type : 'presence',  field : 'bundle' }
	],

  	proxy : {
		type : 'rest',
		url : 'entities',
		format : 'json',
	    reader : {
			type : 'json'
        },
        writer : {
			type : 'json',
			root : 'entity'
        }
	}
});