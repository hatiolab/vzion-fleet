json.(@vehicle_run_sum, :id,:vehicle_id,:run_year,:run_month,:run_time,:run_dist,:consmpt,:co2_emss,:effcc,:eco_index,:sud_accel_cnt,:sud_brake_cnt,:eco_drv_time,:ovr_spd_time,:idle_time,:inc_cnt,:oos_cnt,:mnt_cnt,:mnt_time)

json.vehicle @vehicle_run_sum.vehicle, :id, :name, :description if @vehicle_run_sum.vehicle