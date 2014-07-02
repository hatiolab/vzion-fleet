Ext.define('Fleet.model.Vehicle', {
    
	extend : 'Ext.data.Model',
    
	fields : [
		{ name : 'id', type : 'integer' },
		{ name : 'domain_id', type : 'integer' },
		{ name : 'name', type : 'string' },
		{ name : 'description', type : 'string' },
		{ name : 'model', type : 'string' },
		{ name : 'vendor', type : 'string' },
		{ name : 'classicfication', type : 'string' },
		{ name : 'fuel_type', type : 'string' },
		{ name : 'ownership', type : 'string' },
		{ name : 'birth_year', type : 'integer' },
		{ name : 'seat_size', type : 'integer' },
		{ name : 'creator_id', type : 'integer' },
		{ name : 'creator', type : 'auto' },
		{ name : 'updater_id', type : 'integer' },
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
		url : 'vehicles',
		format : 'json',
	    reader : {
			type : 'json'
        },
        writer : {
			type : 'json',
			root : 'vehicle'
        }
	}
});