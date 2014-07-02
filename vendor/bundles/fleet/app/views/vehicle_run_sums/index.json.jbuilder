json.items do |json|
	json.array!(@collection) do |vehicle_run_sum|
		json.(vehicle_run_sum, :id,:vehicle_id,:run_year,:run_month,:run_day,:run_date,:run_time,:run_dist,:consmpt,:co2_emss,:effcc,:eco_index,:sud_accel_cnt,:sud_brake_cnt,:eco_drv_time,:ovr_spd_time,:idle_time,:inc_cnt,:oos_cnt,:mnt_cnt,:mnt_time)
		
		json.vehicle do
			json.id vehicle_run_sum.vehicle_id
			json.name vehicle_run_sum.vehicle ? vehicle_run_sum.vehicle.name : ''
			json.description vehicle_run_sum.vehicle ? vehicle_run_sum.vehicle.description : ''
		end
	end
end
json.total @total_count
json.success true
