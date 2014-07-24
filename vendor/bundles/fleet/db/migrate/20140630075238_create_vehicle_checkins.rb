class CreateVehicleCheckins < ActiveRecord::Migration

	def change
		create_table :vehicle_checkins do |t|
			t.references :domain, :null => false
			t.references :terminal, :null => false
			t.references :vehicle
			t.references :driver
			t.date :run_date
			t.datetime :start_time
			t.integer :run_dist, :default => 0
			t.integer :run_time, :default => 0
			t.integer :idle_time, :default => 0
			t.integer :eco_drv_time, :default => 0
			t.integer :avg_speed, :default => 0
			t.integer :max_speed, :default => 0
			t.float :fuel_consmpt, :default => 0
			t.float :fuel_effcc, :default => 0
			t.float :sud_accel_cnt, :default => 0
			t.float :sud_brake_cnt, :default => 0
			t.float :ovr_spd_time, :default => 0
			t.float :co2_emss, :default => 0
			t.float :max_cool_water_temp, :default => 0
			t.float :avg_battery_volt, :default => 0
			t.integer :spd_lt_10, :default => 0
			t.integer :spd_lt_20, :default => 0
			t.integer :spd_lt_30, :default => 0
			t.integer :spd_lt_40, :default => 0
			t.integer :spd_lt_50, :default => 0
			t.integer :spd_lt_60, :default => 0
			t.integer :spd_lt_70, :default => 0
			t.integer :spd_lt_80, :default => 0
			t.integer :spd_lt_90, :default => 0
			t.integer :spd_lt_100, :default => 0
			t.integer :spd_lt_110, :default => 0
			t.integer :spd_lt_120, :default => 0
			t.integer :spd_lt_130, :default => 0
			t.integer :spd_lt_140, :default => 0
			t.integer :spd_lt_150, :default => 0
			t.integer :spd_lt_160, :default => 0
		end

    add_index :vehicle_checkins, [:domain_id, :vehicle_id], :name => :ix_vehicle_checkin_0
    add_index :vehicle_checkins, [:domain_id, :terminal_id], :name => :ix_vehicle_checkin_1
    add_index :vehicle_checkins, [:domain_id, :driver_id], :name => :ix_vehicle_checkin_2
    add_index :vehicle_checkins, [:domain_id, :run_date], :name => :ix_vehicle_checkin_3
	end

end
