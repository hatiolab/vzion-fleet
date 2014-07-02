json.(@driver_status, :id,:driver_id,:status,:total_dist,:total_runtime,:avg_effcc,:eco_index,:eco_run_rate,:creator_id,:updater_id,:created_at,:updated_at)

json.driver do
	json.id @driver_status.driver_id
	json.name @driver_status.driver ? @driver_status.driver.name : ''
	json.description @driver_status.driver ? @driver_status.driver.description : ''
end