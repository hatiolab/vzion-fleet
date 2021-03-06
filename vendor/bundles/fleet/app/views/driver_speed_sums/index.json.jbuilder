json.items do |json|
	json.array!(@collection) do |driver_speed_sum|
		json.(driver_speed_sum, :id,:driver_id,:run_year,:run_month,:spd_lt_10,:spd_lt_20,:spd_lt_30,:spd_lt_40,:spd_lt_50,:spd_lt_60,:spd_lt_70,:spd_lt_80,:spd_lt_90,:spd_lt_100,:spd_lt_110,:spd_lt_120,:spd_lt_130,:spd_lt_140,:spd_lt_150,:spd_lt_160,:updated_at)
		
		json.driver driver_speed_sum.driver, :id, :name, :description if driver_speed_sum.driver
	end
end
json.total @total_count
json.success true
