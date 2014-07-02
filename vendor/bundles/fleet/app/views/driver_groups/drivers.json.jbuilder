json.items do |json|
	json.array!(@collection) do |driver|
		json.(driver, :id,:name,:description,:social_id,:division,:title,:phone_no,:mobile_no)
		
		json.driver do
			json.id driver.id
			json.name driver.name
			json.description driver.description
		end
		
		json.updater do
			json.id driver.updater_id
			json.name driver.updater ? driver.updater.name : ''
		end
	end
end
json.total @total_count
json.success true
