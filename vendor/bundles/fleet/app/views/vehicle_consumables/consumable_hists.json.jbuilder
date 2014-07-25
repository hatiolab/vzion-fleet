json.items do |json|
	json.array!(@collection) do |consumable_hist|
		json.(consumable_hist, :id,:vehicle_consumable_id,:vehicle_id,:name,:status,:health_rate,:last_repl_date,:last_repl_mile,:cumulative_cost,:component,:repl_cost,:worker,:work_comment,:created_at)
	end
end