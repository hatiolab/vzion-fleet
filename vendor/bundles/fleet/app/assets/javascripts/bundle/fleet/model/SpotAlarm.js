Ext.define('Fleet.model.SpotAlarm', {
    
	extend : 'Ext.data.Model',
    
	fields : [
		{ name : 'id', type : 'string' },
		{ name : 'domain_id', type : 'string' },
		{ name : 'name', type : 'string' },
		{ name : 'transfer_type', type : 'string' },
		{ name : 'evt_type', type : 'string' },
		{ name : 'evt_name', type : 'string' },
		{ name : 'evt_trg', type : 'string' },
		{ name : 'always', type : 'boolean' },
		{ name : 'enabled', type : 'boolean' },
		{ name : 'from_date', type : 'date' },
		{ name : 'to_date', type : 'date' },
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
		url : 'spot_alarms',
		format : 'json',
	    reader : {
			type : 'json'
        },
        writer : {
			type : 'json',
			root : 'spot_alarm'
        }
	}
});
