json.items do |json|
	json.array!(@collection) do |vehicle_group|
		json.(vehicle_group, :id,:domain_id,:name,:description,:creator_id,:updater_id,:created_at,:updated_at)
		json.updater do
			json.id vehicle_group.updater_id
			json.name vehicle_group.updater ? vehicle_group.updater.name : ''
		end

		end
end
json.total @total_count
json.success true
