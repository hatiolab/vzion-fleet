json.(@driver_run_sum, :id,:driver_id,:run_year,:run_month,:run_day,:run_date,:run_time,:run_dist,:consmpt,:co2_emss,:effcc,:eco_index,:sud_accel_cnt,:sud_brake_cnt,:eco_drv_time,:ovr_spd_time,:idle_time,:inc_cnt)

json.vehicle do
	json.id @driver_run_sum.driver_id
	json.name @driver_run_sum.vehicle ? @driver_run_sum.vehicle.name : ''
	json.description @driver_run_sum.vehicle ? @driver_run_sum.vehicle.description : ''
end
