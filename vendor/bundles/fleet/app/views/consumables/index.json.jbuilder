json.items do |json|
	json.array!(@collection) do |consumable|
		json.(consumable, :domain_id,:id,:name,:description,:unit,:initial_mileage,:inital_duration,:last_mileage,:last_duration,:creator_id,:updater_id,:created_at,:updated_at)
		
		json.updater do
			json.id consumable.updater_id
			json.name consumable.updater ? consumable.updater.name : ''
		end
	end
end
json.total @total_count
json.success true
