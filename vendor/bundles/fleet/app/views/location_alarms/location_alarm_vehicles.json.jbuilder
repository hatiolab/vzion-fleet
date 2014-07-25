json.items do |json|
	json.array!(@collection) do |vehicle|
		json.(vehicle, :id,:domain_id,:location_alarm_id,:vehicle_id,:alarm_name)
		
		json.vehicle vehicle.vehicle, :id, :name, :description if vehicle.vehicle
	end
end
json.total @total_count
json.success true