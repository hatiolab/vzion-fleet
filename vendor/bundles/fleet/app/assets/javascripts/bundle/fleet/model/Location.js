Ext.define('Fleet.model.Location', {
    
	extend : 'Ext.data.Model',
    
	fields : [
		{ name : 'id', type : 'string' },
		{ name : 'domain_id', type : 'string' },
		{ name : 'name', type : 'string' },
		{ name : 'description', type : 'string' },
		{ name : 'address', type : 'string' },
		{ name : 'radius', type : 'float' },
		{ name : 'lat', type : 'float' },
		{ name : 'lng', type : 'float' },
		{ name : 'lat_hi', type : 'float' },
		{ name : 'lat_low', type : 'float' },
		{ name : 'lng_hi', type : 'float' },
		{ name : 'lng_low', type : 'float' },
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
		{ type : 'length',    field : 'address', max : 255 },
		{ type : 'length',    field : 'description', max : 255 },
	],
	
  	proxy : {
		type : 'rest',
		url : 'locations',
		format : 'json',
	    reader : {
			type : 'json'
        },
        writer : {
			type : 'json',
			root : 'location'
        }
	}
});