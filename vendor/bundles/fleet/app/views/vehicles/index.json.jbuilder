json.items do |json|
	json.array!(@collection) do |vehicle|
		json.(vehicle, :id,:domain_id,:name,:description,:model,:vendor,:classicfication,:fuel_type,:ownership,:birth_year,:seat_size,:creator_id,:updater_id,:created_at,:updated_at)
		json.updater do
			json.id vehicle.updater_id
			json.name vehicle.updater ? vehicle.updater.name : ''
		end

		end
end
json.total @total_count
json.success true
