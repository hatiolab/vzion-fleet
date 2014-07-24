json.items do |json|
	json.array!(@collection) do |driver_status|
		json.(driver_status, :id,:driver_id,:status,:total_dist,:total_runtime,:avg_effcc,:eco_index,:eco_run_rate)
		
		json.driver driver_status.driver, :id, :name, :description if driver_status.driver
	end
end
json.total @total_count
json.success true
