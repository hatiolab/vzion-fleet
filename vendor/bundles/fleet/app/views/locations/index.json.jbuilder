json.items do |json|
	json.array!(@collection) do |location|
		json.(location, :id,:domain_id,:name,:description,:address,:radius,:lat,:lng,:lat_hi,:lat_low,:lng_hi,:lng_low,:creator_id,:updater_id,:created_at,:updated_at)

		json.updater do
			json.id location.updater_id
			json.name location.updater ? location.updater.name : ''
		end
	end
end
json.total @total_count
json.success true
