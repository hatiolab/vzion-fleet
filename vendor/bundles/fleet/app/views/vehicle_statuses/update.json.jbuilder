json.(@vehicle_status, :id,:vehicle_id,:driver_id,:terminal_id,:status,:health_status,:total_dist,:total_runtime,:remain_fuel,:official_effcc,:avg_effcc,:eco_index,:eco_run_rate,:lat,:lng,:creator_id,:updater_id,:created_at,:updated_at)

json.terminal @vehicle_status.terminal, :id, :name, :description if @vehicle_status.terminal

json.vehicle @vehicle_status.vehicle, :id, :name, :description if @vehicle_status.vehicle
		
json.driver @vehicle_status.driver, :id, :name, :description if @vehicle_status.driver