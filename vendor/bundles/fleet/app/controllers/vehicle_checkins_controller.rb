class VehicleCheckinsController < ResourceMultiUpdateController
  
private
  def resource_params
    [ params.require(:vehicle_checkin).permit(:terminal_id,:vehicle_id,:driver_id,:run_date,:start_time,:run_dist,:run_time,:idle_time,:eco_drv_time,:avg_speed,:max_speed,:fuel_consmpt,:fuel_effcc,:sud_accel_cnt,:sud_brake_cnt,:ovr_spd_time,:co2_emss,:max_cool_water_temp,:avg_battery_volt,:spd_lt_10,:spd_lt_20,:spd_lt_30,:spd_lt_40,:spd_lt_50,:spd_lt_60,:spd_lt_70,:spd_lt_80,:spd_lt_90,:spd_lt_100,:spd_lt_110,:spd_lt_120,:spd_lt_130,:spd_lt_140,:spd_lt_150,:spd_lt_160) ]
  end
end
