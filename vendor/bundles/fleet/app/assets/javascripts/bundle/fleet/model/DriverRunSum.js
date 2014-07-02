Ext.define('Fleet.model.DriverRunSum', {
    
	extend : 'Ext.data.Model',
    
	fields : [
		{ name : 'id', type : 'integer' },
		{ name : 'driver_id', type : 'integer' },
		{ name : 'vehicle', type : 'auto' },
		{ name : 'run_year', type : 'string' },
		{ name : 'run_month', type : 'string' },
		{ name : 'run_day', type : 'string' },
		{ name : 'run_date', type : 'date' },
		{ name : 'run_time', type : 'integer' },
		{ name : 'run_dist', type : 'integer' },
		{ name : 'consmpt', type : 'float' },
		{ name : 'co2_emss', type : 'float' },
		{ name : 'effcc', type : 'float' },
		{ name : 'eco_index', type : 'integer' },
		{ name : 'sud_accel_cnt', type : 'integer' },
		{ name : 'sud_brake_cnt', type : 'integer' },
		{ name : 'eco_drv_time', type : 'integer' },
		{ name : 'ovr_spd_time', type : 'integer' },
		{ name : 'idle_time', type : 'integer' },
		{ name : 'inc_cnt', type : 'integer' },
		{ name : '_cud_flag_', type : 'string' }
	],
	
  	proxy : {
		type : 'rest',
		url : 'driver_run_sums',
		format : 'json',
	    reader : {
			type : 'json'
        },
        writer : {
			type : 'json',
			root : 'driver_run_sum'
        }
	}
});