Ext.define('Fleet.model.VehicleConsumable', {
    
	extend : 'Ext.data.Model',
    
	fields : [
		{ name : 'id', type : 'string' },
		{ name : 'domain_id', type : 'string' },
		{ name : 'vehicle_id', type : 'string' },
		{ name : 'vehicle', type : 'auto' },
		{ name : 'name', type : 'string' },
		{ name : 'description', type : 'string' },
		{ name : 'status', type : 'string' },
		{ name : 'health_rate', type : 'float' },
		{ name : 'cycle_repl_mile', type : 'integer' },
		{ name : 'cycle_repl_duration', type : 'integer' },
		{ name : 'last_repl_date', type : 'date' },
		{ name : 'last_repl_mile', type : 'integer' },
		{ name : 'next_repl_date', type : 'date' },
		{ name : 'next_repl_mile', type : 'integer' },
		{ name : 'repl_unit', type : 'string' },
		{ name : 'cumulative_cost', type : 'integer' },
		{ name : 'creator_id', type : 'string' },
		{ name : 'creator', type : 'auto' },
		{ name : 'updater_id', type : 'string' },
		{ name : 'updater', type : 'auto' },
		{ name : 'created_at', type : 'date' },
		{ name : 'updated_at', type : 'date' },
		{ name : '_cud_flag_', type : 'string' }
	],

	validations : [
		{type : 'presence', field : 'name'}
	],
	
  	proxy : {
		type : 'rest',
		url : 'vehicle_consumables',
		format : 'json',
	    reader : {
			type : 'json'
        },
        writer : {
			type : 'json',
			root : 'vehicle_consumable'
        }
	}
});