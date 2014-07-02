json.items do |json|
	json.array!(@collection) do |terminal|
		json.(terminal, :id,:domain_id,:name,:description,:purchase_date,:vehicle_id,:driver_id,:creator_id,:updater_id,:created_at,:updated_at)
		
		json.vehicle do
			json.id terminal.vehicle_id
			json.name terminal.vehicle ? terminal.vehicle.name : ''
			json.description terminal.vehicle ? terminal.vehicle.description : ''
		end

		json.driver do
			json.id terminal.driver_id
			json.name terminal.driver ? terminal.driver.name : ''
			json.description terminal.driver ? terminal.driver.description : ''
		end

		json.updater do
			json.id terminal.updater_id
			json.name terminal.updater ? terminal.updater.name : ''
		end
	end
end
json.total @total_count
json.success true
