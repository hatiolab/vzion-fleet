json.(@driver_run_sum, :id,:driver_id,:run_year,:run_month,:run_time,:run_dist,:consmpt,:co2_emss,:effcc,:eco_index,:sud_accel_cnt,:sud_brake_cnt,:eco_drv_time,:ovr_spd_time,:idle_time,:inc_cnt)

json.driver @driver_run_sum.driver, :id, :name, :description if @driver_run_sum.driver
