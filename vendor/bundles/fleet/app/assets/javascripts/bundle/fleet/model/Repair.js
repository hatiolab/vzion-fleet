Ext.define('Fleet.model.Repair', {
    
	extend : 'Ext.data.Model',
    
	fields : [
		{ name : 'id', type : 'string' },
		{ name : 'domain_id', type : 'string' },
		{ name : 'vehicle_id', type : 'string' },
		{ name : 'vehicle', type : 'auto' },
		{ name : 'next_repair_date', type : 'date' },
		{ name : 'repair_date', type : 'date' },
		{ name : 'repair_man', type : 'string' },
		{ name : 'repair_mileage', type : 'float' },
		{ name : 'repair_shop', type : 'string' },
		{ name : 'repair_time', type : 'float' },
		{ name : 'cost', type : 'integer' },
		{ name : 'content', type : 'string' },
		{ name : 'comment', type : 'string' },
		{ name : 'oos', type : 'string' },
		{ name : 'creator_id', type : 'string' },
		{ name : 'creator', type : 'auto' },
		{ name : 'updater_id', type : 'string' },
		{ name : 'updater', type : 'auto' },
		{ name : 'created_at', type : 'date' },
		{ name : 'updated_at', type : 'date' },
		{ name : '_cud_flag_', type : 'string' }
	],
	
  	proxy : {
		type : 'rest',
		url : 'repairs',
		format : 'json',
	    reader : {
			type : 'json'
        },
        writer : {
			type : 'json',
			root : 'repair'
        }
	}
});