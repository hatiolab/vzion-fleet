json.(@incident, :id,:domain_id,:terminal_id,:vehicle_id,:driver_id,:lat,:lng,:velocity,:impulse_x,:impulse_y,:impulse_z,:impulse_abs,:impulse_threshold,:engine_temp,:engine_temp_threshold,:obd_connected,:confirm,:video_clip,:creator_id,:updater_id,:created_at,:updated_at)

json.terminal do
	json.id @incident.terminal_id
	json.name @incident.terminal ? @incident.terminal.name : ''
	json.description @incident.terminal ? @incident.terminal.description : ''
end

json.vehicle do
	json.id @incident.vehicle_id
	json.name @incident.vehicle ? @incident.vehicle.name : ''
	json.description @incident.vehicle ? @incident.vehicle.description : ''
end

json.driver do
	json.id @incident.driver_id
	json.name @incident.driver ? @incident.driver.name : ''
	json.description @incident.driver ? @incident.driver.description : ''
end