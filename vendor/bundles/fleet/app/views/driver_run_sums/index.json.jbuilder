json.items do |json|
	json.array!(@collection) do |driver_run_sum|
		json.(driver_run_sum, :id,:driver_id,:run_year,:run_month,:run_time,:run_dist,:consmpt,:co2_emss,:effcc,:eco_index,:sud_accel_cnt,:sud_brake_cnt,:eco_drv_time,:ovr_spd_time,:idle_time,:inc_cnt,:updated_at)
		
		json.driver driver_run_sum.driver, :id, :name, :description if driver_run_sum.driver
	end
end
json.total @total_count
json.success true
