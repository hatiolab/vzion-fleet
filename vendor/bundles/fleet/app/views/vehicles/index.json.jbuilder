json.items do |json|
	json.array!(@collection) do |vehicle|
		json.(vehicle, :id,:domain_id,:name,:description,:model,:vendor,:classicfication,:fuel_type,:ownership,:birth_year,:seat_size,:creator_id,:updater_id,:created_at,:updated_at)
		
		json.updater vehicle.updater, :id, :name if vehicle.updater
	end
end
json.total @total_count
json.success true
