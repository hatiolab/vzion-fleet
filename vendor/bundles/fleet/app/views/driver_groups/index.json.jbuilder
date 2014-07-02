json.items do |json|
	json.array!(@collection) do |driver_group|
		json.(driver_group, :id,:domain_id,:name,:description,:creator_id,:updater_id,:created_at,:updated_at)
		json.updater do
			json.id driver_group.updater_id
			json.name driver_group.updater ? driver_group.updater.name : ''
		end

		end
end
json.total @total_count
json.success true
