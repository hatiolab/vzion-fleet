json.(@vehicle_speed_sum, :id,:vehicle_id,:run_year,:run_month,:spd_lt_10,:spd_lt_20,:spd_lt_30,:spd_lt_40,:spd_lt_50,:spd_lt_60,:spd_lt_70,:spd_lt_80,:spd_lt_90,:spd_lt_100,:spd_lt_110,:spd_lt_120,:spd_lt_130,:spd_lt_140,:spd_lt_150,:spd_lt_160)

json.vehicle @vehicle_speed_sum.vehicle, :id, :name, :description if @vehicle_speed_sum.vehicle