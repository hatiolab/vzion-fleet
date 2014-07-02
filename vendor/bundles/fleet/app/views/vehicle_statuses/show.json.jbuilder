json.(@vehicle_status, :id,:vehicle_id,:driver_id,:terminal_id,:status,:health_status,:total_dist,:total_runtime,:remain_fuel,:official_effcc,:avg_effcc,:eco_index,:eco_run_rate,:lat,:lng,:creator_id,:updater_id,:created_at,:updated_at)

json.vehicle do
	json.id @vehicle_status.vehicle_id
	json.name @vehicle_status.vehicle ? @vehicle_status.vehicle.name : ''
	json.description @vehicle_status.vehicle ? @vehicle_status.vehicle.description : ''
end

json.driver do
	json.id @vehicle_status.driver_id
	json.name @vehicle_status.driver ? @vehicle_status.driver.name : ''
	json.description @vehicle_status.driver ? @vehicle_status.driver.description : ''
end

json.terminal do
	json.id @vehicle_status.terminal_id
	json.name @vehicle_status.terminal ? @vehicle_status.terminal.name : ''
	json.description @vehicle_status.terminal ? @vehicle_status.terminal.description : ''
end