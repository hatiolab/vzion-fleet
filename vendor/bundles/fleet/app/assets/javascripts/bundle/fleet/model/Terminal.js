Ext.define('Fleet.model.Terminal', {
    
	extend : 'Ext.data.Model',
    
	fields : [
		{ name : 'id', type : 'string' },
		{ name : 'domain_id', type : 'string' },
		{ name : 'name', type : 'string' },
		{ name : 'description', type : 'string' },
		{ name : 'purchase_date', type : 'date' },
		{ name : 'vehicle_id', type : 'string' },
		{ name : 'vehicle', type : 'auto' },
		{ name : 'driver_id', type : 'string' },
		{ name : 'driver', type : 'auto' },
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
		url : 'terminals',
		format : 'json',
	    reader : {
			type : 'json'
        },
        writer : {
			type : 'json',
			root : 'terminal'
        }
	}
});