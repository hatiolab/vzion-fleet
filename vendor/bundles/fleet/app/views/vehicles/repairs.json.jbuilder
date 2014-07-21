json.items do |json|
	json.array!(@collection) do |repair|
		json.(repair, :id,:domain_id,:vehicle_id,:next_repair_date,:repair_date,:repair_man,:repair_mileage,:repair_shop,:repair_time,:cost,:content,:comment,:oos)
		
		json.vehicle do
			json.id repair.vehicle ? repair.vehicle.id : ''
			json.name repair.vehicle ? repair.vehicle.name : ''
			json.description repair.vehicle ? repair.vehicle.description : ''
		end
	end
end
json.total @total_count
json.success true