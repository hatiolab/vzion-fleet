#encoding: utf-8 

Entity.setup Spot, {:bundle =>'fleet'} do
  @list_columns = ['name', 'description', 'address', 'radius', 'lat', 'lng', 'lat_hi', 'lat_low', 'lng_hi', 'lng_low', 'updater_id', 'updated_at']
  @search_columns = ['name', 'description']
  @sort_columns = ['name']
  @editable_columns = ['name', 'description', 'address', 'radius', 'lat', 'lng', 'lat_hi', 'lat_low', 'lng_hi', 'lng_low']
end

Entity.setup Consumable, {:bundle =>'fleet'} do
  @list_columns = ['name', 'description', 'unit', 'init_repl_mile', 'init_repl_duration', 'repl_mile', 'repl_duration', 'updater_id', 'updated_at']
  @search_columns = ['name', 'description']
  @sort_columns = ['name']
  @editable_columns = ['name', 'description', 'unit', 'init_repl_mile', 'init_repl_duration', 'repl_mile', 'repl_duration']
end

Entity.setup VehicleGroup, {:bundle =>'fleet'} do
  @list_columns = ['name', 'description', 'updater_id', 'updated_at']
  @search_columns = ['name', 'description']
  @sort_columns = ['name']
  @editable_columns = ['name', 'description']
end

Entity.setup Vehicle, {:bundle =>'fleet'} do
  @list_columns = ['name', 'description', 'model', 'vendor', 'classicfication', 'fuel_type', 'ownership', 'birth_year', 'seat_size', 'updater_id', 'updated_at']
  @search_columns = ['name', 'description']
  @sort_columns = ['name']
  @editable_columns = ['name', 'description', 'model', 'vendor', 'classicfication', 'fuel_type', 'ownership', 'birth_year', 'seat_size']
end

Entity.setup VehicleStatus, {:bundle =>'fleet'} do
  @list_columns = ['vehicle_id','status','health_status','total_dist','total_runtime','remain_fuel','official_effcc','avg_effcc','eco_index','eco_run_rate','lat','lng']
  @search_columns = ['vehicle_id','status']
  @sort_columns = ['vehicle_id']
  @editable_columns = ['status','health_status','total_dist','total_runtime','remain_fuel','official_effcc','avg_effcc','eco_index','eco_run_rate','lat','lng']
end

Entity.setup VehicleCheckin, {:bundle =>'fleet'} do
  @list_columns = ['terminal_id','vehicle_id','driver_id','run_date','start_time','run_dist','run_time','idle_time','eco_drv_time','avg_speed','max_speed','fuel_consmpt','fuel_effcc','sud_accel_cnt','sud_brake_cnt','ovr_spd_time','co2_emss','max_cool_water_temp','avg_battery_volt','spd_lt_10' ,'spd_lt_20' ,'spd_lt_30' ,'spd_lt_40' ,'spd_lt_50' ,'spd_lt_60' ,'spd_lt_70' ,'spd_lt_80' ,'spd_lt_90' ,'spd_lt_100','spd_lt_110','spd_lt_120','spd_lt_130','spd_lt_140','spd_lt_150','spd_lt_160']
  @search_columns = ['terminal_id','vehicle_id','driver_id','run_date','start_time']
  @sort_columns = ['vehicle_id','run_date','start_time']
  @editable_columns = ['run_dist','run_time','idle_time','eco_drv_time','avg_speed','max_speed','fuel_consmpt','fuel_effcc','sud_accel_cnt','sud_brake_cnt','ovr_spd_time','co2_emss','max_cool_water_temp','avg_battery_volt','spd_lt_10' ,'spd_lt_20' ,'spd_lt_30' ,'spd_lt_40' ,'spd_lt_50' ,'spd_lt_60' ,'spd_lt_70' ,'spd_lt_80' ,'spd_lt_90' ,'spd_lt_100','spd_lt_110','spd_lt_120','spd_lt_130','spd_lt_140','spd_lt_150','spd_lt_160']
end

Entity.setup VehicleConsumable, {:bundle =>'fleet'} do
  @list_columns = ['vehicle_id','name','description','status','health_rate','cycle_repl_mile','cycle_repl_duration','last_repl_date','last_repl_mile','next_repl_date','next_repl_mile','repl_unit','cumulative_cost','updater_id','updated_at']
  @search_columns = ['vehicle_id','name','description']
  @sort_columns = ['vehicle_id','name']
  @editable_columns = ['vehicle_id','name','description','status','health_rate','cycle_repl_mile','cycle_repl_duration','last_repl_date','last_repl_mile','next_repl_date','next_repl_mile','repl_unit','cumulative_cost']
end

Entity.setup VehicleRunSum, {:bundle =>'fleet'} do
  @list_columns = ['vehicle_id','run_year','run_month','run_time','run_dist','consmpt','co2_emss','effcc','eco_index','sud_accel_cnt','sud_break_cnt','eco_drv_time' ,'ovr_spd_time','idle_time','inc_cnt','oos_cnt','mnt_cnt','mnt_time']
  @search_columns = ['vehicle_id','run_year']
  @sort_columns = ['run_year','run_month','vehicle_id']
  @editable_columns = ['run_time','run_dist','consmpt','co2_emss','effcc','eco_index','sud_accel_cnt','sud_break_cnt','eco_drv_time' ,'ovr_spd_time','idle_time','inc_cnt','oos_cnt','mnt_cnt','mnt_time']
end

Entity.setup VehicleSpeedSum, {:bundle =>'fleet'} do
  @list_columns = ['vehicle_id','run_year','run_month','spd_lt_10','spd_lt_20','spd_lt_30','spd_lt_40','spd_lt_50','spd_lt_60','spd_lt_70','spd_lt_80','spd_lt_90','spd_lt_100','spd_lt_110','spd_lt_120','spd_lt_130','spd_lt_140','spd_lt_150','spd_lt_160']
  @search_columns = ['vehicle_id','run_year']
  @sort_columns = ['vehicle_id','run_year','run_month']
  @editable_columns = ['spd_lt_10','spd_lt_20','spd_lt_30','spd_lt_40','spd_lt_50','spd_lt_60','spd_lt_70','spd_lt_80','spd_lt_90','spd_lt_100','spd_lt_110','spd_lt_120','spd_lt_130','spd_lt_140','spd_lt_150','spd_lt_160']
end

Entity.setup VehicleTrace, {:bundle =>'fleet'} do
  @list_columns = ['terminal_id','vehicle_id','driver_id','lat','lng','velocity','trace_time']
  @search_columns = ['trace_time','terminal_id','vehicle_id','driver_id']
  @sort_columns = ['trace_time']
  @editable_columns = ['lat','lng','velocity']
end

Entity.setup DriverGroup, {:bundle =>'fleet'} do
  @list_columns = ['name', 'description', 'updater_id', 'updated_at']
  @search_columns = ['name', 'description']
  @sort_columns = ['name']
  @editable_columns = ['name', 'description']
end

Entity.setup Driver, {:bundle =>'fleet'} do
  @list_columns = ['name', 'description', 'social_id', 'division', 'title', 'phone_no', 'mobile_no', 'updater_id', 'updated_at']
  @search_columns = ['name', 'description']
  @sort_columns = ['name']
  @editable_columns = ['name', 'description', 'social_id', 'division', 'title', 'phone_no', 'mobile_no']
end

Entity.setup DriverStatus, {:bundle =>'fleet'} do
  @list_columns = ['driver_id','status','total_dist','total_runtime','avg_effcc','eco_index','eco_run_rate']
  @search_columns = ['driver_id','status']
  @sort_columns = ['driver_id']
  @editable_columns = ['status','total_dist','total_runtime','avg_effcc','eco_index','eco_run_rate']
end

Entity.setup DriverRunSum, {:bundle =>'fleet'} do
  @list_columns = ['driver_id','run_year','run_month','run_time','run_dist','consmpt','co2_emss','effcc','eco_index','sud_accel_cnt','sud_break_cnt','eco_drv_time' ,'ovr_spd_time','idle_time','inc_cnt']
  @search_columns = ['driver_id','run_year','run_month']
  @sort_columns = ['driver_id','run_year','run_month']
  @editable_columns = ['run_time','run_dist','consmpt','co2_emss','effcc','eco_index','sud_accel_cnt','sud_break_cnt','eco_drv_time' ,'ovr_spd_time','idle_time','inc_cnt']
end

Entity.setup DriverSpeedSum, {:bundle =>'fleet'} do
  @list_columns = ['driver_id','run_year','run_month','spd_lt_10','spd_lt_20','spd_lt_30','spd_lt_40','spd_lt_50','spd_lt_60','spd_lt_70','spd_lt_80','spd_lt_90','spd_lt_100','spd_lt_110','spd_lt_120','spd_lt_130','spd_lt_140','spd_lt_150','spd_lt_160']
  @search_columns = ['driver_id','run_year','run_month']
  @sort_columns = ['driver_id','run_year','run_month']
  @editable_columns = ['spd_lt_10','spd_lt_20','spd_lt_30','spd_lt_40','spd_lt_50','spd_lt_60','spd_lt_70','spd_lt_80','spd_lt_90','spd_lt_100','spd_lt_110','spd_lt_120','spd_lt_130','spd_lt_140','spd_lt_150','spd_lt_160']
end

Entity.setup Terminal, {:bundle =>'fleet'} do
  @list_columns = ['name', 'description', 'purchase_date', 'updater_id', 'updated_at']
  @search_columns = ['name', 'description']
  @sort_columns = ['name']
  @editable_columns = ['name', 'description', 'purchase_date']
end

Entity.setup Incident, {:bundle =>'fleet'} do
  @list_columns = ['confirm','terminal_id','vehicle_id','driver_id','lat','lng','velocity','impulse_x','impulse_y','impulse_z','impulse_abs','impulse_threshold','engine_temp','engine_temp_threshold','obd_connected','created_at']
  @search_columns = ['created_at','terminal_id','vehicle_id','driver_id']
  @sort_columns = ['created_at']
  @editable_columns = ['confirm','lat','lng','velocity','impulse_x','impulse_y','impulse_z','impulse_abs','impulse_threshold','engine_temp','engine_temp_threshold','obd_connected']
end

Entity.setup Task, {:bundle =>'fleet'} do
  @list_columns = ['title', 'start_date', 'end_date', 'updater_id', 'updated_at']
  @search_columns = ['title']
  @sort_columns = ['title']
  @editable_columns = ['title', 'start_date', 'end_date']
end

Entity.setup SpotAlarm, {:bundle =>'fleet'} do
  @list_columns = ['name', 'transfer_type', 'evt_type', 'evt_name', 'evt_trg', 'always', 'enabled', 'from_date', 'to_date']
  @search_columns = ['name']
  @sort_columns = ['name']
  @editable_columns = ['name', 'transfer_type', 'evt_type', 'evt_name', 'evt_trg', 'always', 'enabled', 'from_date', 'to_date']
end