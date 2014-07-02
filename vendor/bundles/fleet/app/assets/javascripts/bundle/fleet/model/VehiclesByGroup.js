Ext.define('Fleet.model.VehiclesByGroup', {
	
	extend : 'Ext.data.Model',
	
	fields : [
		{ name : 'id', type : 'integer' },
		{ name : 'vehicle', type : 'auto' },
		{ name : 'name', type : 'string' },
		{ name : 'description', type : 'string' },
		{ name : 'model', type : 'string' },
		{ name : 'vendor', type : 'string' },
		{ name : 'classicfication', type : 'string' },
		{ name : 'fuel_type', type : 'string' },
		{ name : 'ownership', type : 'string' },
		{ name : 'birth_year', type : 'integer' },
		{ name : 'seat_size', type : 'integer' },
		{ name : '_cud_flag_', type : 'string' }
	],	
	
	proxy : {
		type : 'rest',
		url : 'vehicle_groups',
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