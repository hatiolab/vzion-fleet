Ext.define('Fleet.model.VehicleRepair', {
	
	extend : 'Ext.data.Model',
  
	fields : [
		{ name : 'id', type : 'integer' },
		{ name : 'domain_id', type : 'integer' },
		{ name : 'vehicle_id', type : 'integer' },
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
		{ name : 'creator_id', type : 'integer' },
		{ name : 'creator', type : 'auto' },
		{ name : 'updater_id', type : 'integer' },
		{ name : 'updater', type : 'auto' },
		{ name : 'created_at', type : 'date' },
		{ name : 'updated_at', type : 'date' },
		{ name : '_cud_flag_', type : 'string' }
	],	
	
	proxy : {
		type : 'rest',
		url : 'vehicles',
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