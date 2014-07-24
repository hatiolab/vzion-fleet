json.items do |json|
	json.array!(@collection) do |consumable|
		json.(consumable, :domain_id,:id,:name,:description,:unit,:init_repl_mile,:init_repl_duration,:repl_mile,:repl_duration,:creator_id,:updater_id,:created_at,:updated_at)
		
		json.updater consumable.updater, :id, :name if consumable.updater
	end
end
json.total @total_count
json.success true
