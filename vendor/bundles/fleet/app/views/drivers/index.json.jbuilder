json.items do |json|
	json.array!(@collection) do |driver|
		json.(driver, :id,:domain_id,:name,:description,:social_id,:division,:title,:phone_no,:mobile_no,:creator_id,:updater_id,:created_at,:updated_at)
		
		json.updater driver.updater, :id, :name if driver.updater
	end
end
json.total @total_count
json.success true
