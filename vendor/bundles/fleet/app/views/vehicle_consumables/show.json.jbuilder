json.(@vehicle_consumable, :id,:domain_id,:vehicle_id,:name,:description,:status,:health_rate,:cycle_repl_mile,:cycle_repl_duration,:last_repl_date,:last_repl_mile,:next_repl_date,:next_repl_mile,:repl_unit,:cumulative_cost,:creator_id,:updater_id,:created_at,:updated_at)

json.vehicle do
	json.id @vehicle_consumable.vehicle_id
	json.name @vehicle_consumable.vehicle ? @vehicle_consumable.vehicle.name : ''
	json.description @vehicle_consumable.vehicle ? @vehicle_consumable.vehicle.description : ''
end