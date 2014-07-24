Ext.define('Fleet.model.DriverSpeedSum', {
    
	extend : 'Ext.data.Model',
    
	fields : [
		{ name : 'id', type : 'string' },
		{ name : 'driver_id', type : 'string' },
		{ name : 'driver', type : 'auto' },
		{ name : 'run_year', type : 'integer' },
		{ name : 'run_month', type : 'integer' },
		{ name : 'spd_lt_10', type : 'integer' },
		{ name : 'spd_lt_20', type : 'integer' },
		{ name : 'spd_lt_30', type : 'integer' },
		{ name : 'spd_lt_40', type : 'integer' },
		{ name : 'spd_lt_50', type : 'integer' },
		{ name : 'spd_lt_60', type : 'integer' },
		{ name : 'spd_lt_70', type : 'integer' },
		{ name : 'spd_lt_80', type : 'integer' },
		{ name : 'spd_lt_90', type : 'integer' },
		{ name : 'spd_lt_100', type : 'integer' },
		{ name : 'spd_lt_110', type : 'integer' },
		{ name : 'spd_lt_120', type : 'integer' },
		{ name : 'spd_lt_130', type : 'integer' },
		{ name : 'spd_lt_140', type : 'integer' },
		{ name : 'spd_lt_150', type : 'integer' },
		{ name : 'spd_lt_160', type : 'integer' },
		{ name : 'updated_at', type : 'date' },
		{ name : '_cud_flag_', type : 'string' }
	],
	
  	proxy : {
		type : 'rest',
		url : 'driver_speed_sums',
		format : 'json',
	    reader : {
			type : 'json'
        },
        writer : {
			type : 'json',
			root : 'driver_speed_sum'
        }
	}
});