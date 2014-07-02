json.items do |json|
	json.array!(@collection) do |incident|
	
		json.(incident_log, :id,:terminal_id,:vehicle_id,:driver_id,:lat,:lng,:velocity,:accel_x,:accel_y,:accel_z,:created_at)
		
	end
end
json.total @total_count
json.success true
