json.items do |json|
	json.array!(@collection) do |repair|
		json.(repair, :id,:domain_id,:vehicle_id,:next_repair_date,:repair_date,:repair_man,:repair_mileage,:repair_shop,:repair_time,:cost,:content,:comment,:oos,:creator_id,:updater_id,:created_at,:updated_at)
		
		json.vehicle repair.vehicle, :id, :name, :description if repair.vehicle
		
		json.creator repair.creator, :id, :name if repair.creator
	end
end
json.total @total_count
json.success true
