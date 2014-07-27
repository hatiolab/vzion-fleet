json.items do |json|
	json.array!(@collection) do |alarm_vehicle|
		json.(alarm_vehicle, :id,:domain_id,:spot_alarm_id,:vehicle_id)
		
		json.spot_alarm alarm_vehicle.spot_alarm, :id, :name if alarm_vehicle.spot_alarm
		json.vehicle alarm_vehicle.vehicle, :id, :name, :description if alarm_vehicle.vehicle
	end
end
json.total @total_count
json.success true