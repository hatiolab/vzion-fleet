Ext.define('Fleet.model.VehicleCheckin', {
    
	extend : 'Ext.data.Model',
    
	fields : [
		{ name : 'id', type : 'integer' },
		{ name : 'terminal_id', type : 'integer' },
		{ name : 'terminal', type : 'auto' },
		{ name : 'vehicle_id', type : 'integer' },
		{ name : 'vehicle', type : 'auto' },
		{ name : 'driver_id', type : 'integer' },
		{ name : 'driver', type : 'auto' },
		{ name : 'run_date', type : 'date' },
		{ name : 'start_time', type : 'date' },
		{ name : 'run_dist', type : 'integer' },
		{ name : 'run_time', type : 'integer' },
		{ name : 'idle_time', type : 'integer' },
		{ name : 'eco_drv_time', type : 'integer' },
		{ name : 'avg_speed', type : 'integer' },
		{ name : 'max_speed', type : 'integer' },
		{ name : 'fuel_consmpt', type : 'float' },
		{ name : 'fuel_effcc', type : 'float' },
		{ name : 'sud_accel_cnt', type : 'float' },
		{ name : 'sud_brake_cnt', type : 'float' },
		{ name : 'ovr_spd_time', type : 'float' },
		{ name : 'co2_emss', type : 'float' },
		{ name : 'max_cool_water_temp', type : 'float' },
		{ name : 'avg_battery_volt', type : 'float' },
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
		{ name : '_cud_flag_', type : 'string' }
	],
	
  	proxy : {
		type : 'rest',
		url : 'vehicle_checkins',
		format : 'json',
	    reader : {
			type : 'json'
        },
        writer : {
			type : 'json',
			root : 'vehicle_checkin'
        }
	}
});