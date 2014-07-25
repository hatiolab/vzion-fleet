json.items do |json|
	json.array!(@collection) do |terminal|
		json.(terminal, :id,:domain_id,:name,:description,:purchase_date,:vehicle_id,:driver_id,:creator_id,:updater_id,:created_at,:updated_at)
		
		json.vehicle terminal.vehicle, :id, :name, :description if terminal.vehicle
		
		json.driver terminal.driver, :id, :name, :description if terminal.driver
		
		json.updater terminal.updater, :id, :name if terminal.updater

	end
end
json.total @total_count
json.success true
