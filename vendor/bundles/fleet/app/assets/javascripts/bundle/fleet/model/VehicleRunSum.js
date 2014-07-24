Ext.define('Fleet.model.VehicleRunSum', {
    
	extend : 'Ext.data.Model',
    
	fields : [
		{ name : 'id', type : 'string' },
		{ name : 'vehicle_id', type : 'string' },
		{ name : 'vehicle', type : 'auto' },
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
		{ name : 'oos_cnt', type : 'integer' },
		{ name : 'mnt_cnt', type : 'integer' },
		{ name : 'mnt_time', type : 'integer' },
		{ name : 'updated_at', type : 'date' },
		{ name : '_cud_flag_', type : 'string' }
	],
	
  	proxy : {
		type : 'rest',
		url : 'vehicle_run_sums',
		format : 'json',
	    reader : {
			type : 'json'
        },
        writer : {
			type : 'json',
			root : 'vehicle_run_sum'
        }
	}
});