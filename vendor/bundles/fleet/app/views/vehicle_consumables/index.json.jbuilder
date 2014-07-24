json.items do |json|
	json.array!(@collection) do |vehicle_consumable|
		json.(vehicle_consumable, :id,:domain_id,:vehicle_id,:name,:description,:status,:health_rate,:cycle_repl_mile,:cycle_repl_duration,:last_repl_date,:last_repl_mile,:next_repl_date,:next_repl_mile,:repl_unit,:cumulative_cost,:creator_id,:updater_id,:created_at,:updated_at)
		
		json.vehicle vehicle_consumable.vehicle, :id, :name, :description if vehicle_consumable.vehicle
		json.updater vehicle_consumable.updater, :id, :name if vehicle_consumable.updater
	end
end
json.total @total_count
json.success true
