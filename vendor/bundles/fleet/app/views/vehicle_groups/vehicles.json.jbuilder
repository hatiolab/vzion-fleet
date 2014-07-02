json.items do |json|
	json.array!(@collection) do |vehicle|
		json.(vehicle, :id,:name,:description,:model,:vendor,:classicfication,:fuel_type,:ownership,:birth_year,:seat_size)
		
		json.vehicle do
			json.id vehicle.id
			json.name vehicle.name
			json.description vehicle.description
		end
		
		json.updater do
			json.id vehicle.updater_id
			json.name vehicle.updater ? vehicle.updater.name : ''
		end
	end
end
json.total @total_count
json.success true
