json.items do |json|
	json.array!(@collection) do |incident|
	
		json.(incident, :id,:domain_id,:terminal_id,:vehicle_id,:driver_id,:lat,:lng,:velocity,:impulse_x,:impulse_y,:impulse_z,:impulse_abs,:impulse_threshold,:engine_temp,:engine_temp_threshold,:obd_connected,:confirm,:video_clip,:creator_id,:updater_id,:created_at,:updated_at)
		
		json.terminal incident.terminal, :id, :name, :description if incident.terminal
		
		json.vehicle incident.vehicle, :id, :name, :description if incident.vehicle
				
		json.driver incident.driver, :id, :name, :description if incident.driver
	end
end
json.total @total_count
json.success true
