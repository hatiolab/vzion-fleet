json.items do |json|
	json.array!(@collection) do |consumable_hist|
		json.(consumable_hist, :id,:vehicle_consumable_id,:seq,:vehicle_id,:name,:status,:health_rate,:cycle_repl_mile,:cycle_repl_duration,:last_repl_date,:last_repl_mile,:next_repl_date,:next_repl_mile,:repl_unit,:cumulative_cost,:repl_cost,:worker,:work_comment,:created_time)
		
		json.vehicle do
			json.id consumable_hist.vehicle_id
			json.name consumable_hist.vehicle ? consumable_hist.vehicle.name : ''
			json.description consumable_hist.vehicle ? consumable_hist.vehicle.description : ''
		end
	end
end
json.total @total_count
json.success true
