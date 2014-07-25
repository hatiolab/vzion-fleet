json.items do |json|
	json.array!(@collection) do |repair|
		json.(repair, :id,:domain_id,:vehicle_id,:next_repair_date,:repair_date,:repair_man,:repair_mileage,:repair_shop,:repair_time,:cost,:content,:comment,:oos,:created_at)
		
		json.vehicle repair.vehicle, :id, :name, :description if repair.vehicle
	end
end
json.total @total_count
json.success true