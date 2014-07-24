Ext.define('Fleet.model.Consumable', {
    
	extend : 'Ext.data.Model',
    
	fields : [
		{ name : 'id', type : 'string' },
		{ name : 'domain_id', type : 'string' },
		{ name : 'name', type : 'string' },
		{ name : 'description', type : 'string' },
		{ name : 'unit', type : 'string' },
		{ name : 'init_repl_mile', type : 'integer' },
		{ name : 'init_repl_duration', type : 'integer' },
		{ name : 'repl_mile', type : 'integer' },
		{ name : 'repl_duration', type : 'integer' },
		{ name : 'creator_id', type : 'string' },
		{ name : 'creator', type : 'auto' },
		{ name : 'updater_id', type : 'string' },
		{ name : 'updater', type : 'auto' },
		{ name : 'created_at', type : 'date' },
		{ name : 'updated_at', type : 'date' },
		{ name : '_cud_flag_', type : 'string' }
	],

	validations : [
		{ type : 'presence',  field : 'name' },
		{ type : 'length',    field : 'name', min : 2, max : 60 },
		{ type : 'length',    field : 'description', max : 255 },
	],	
	
  	proxy : {
		type : 'rest',
		url : 'consumables',
		format : 'json',
	    reader : {
			type : 'json'
        },
        writer : {
			type : 'json',
			root : 'consumable'
        }
	}
});