json.(@driver_status, :id,:driver_id,:status,:total_dist,:total_runtime,:avg_effcc,:eco_index,:eco_run_rate,:creator_id,:updater_id,:created_at,:updated_at)

json.driver @driver_status.driver, :id, :name, :description if @driver_status.driver