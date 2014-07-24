Ext.define('Fleet.model.DriverRunSum', {
    
	extend : 'Ext.data.Model',
    
	fields : [
		{ name : 'id', type : 'string' },
		{ name : 'driver_id', type : 'string' },
		{ name : 'driver', type : 'auto' },
		{ name : 'run_year', type : 'integer' },
		{ name : 'run_month', type : 'integer' },
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
		{ name : 'updated_at', type : 'date' },
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