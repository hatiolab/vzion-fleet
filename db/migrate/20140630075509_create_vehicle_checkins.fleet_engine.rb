# This migration comes from fleet_engine (originally 20140630075238)
class CreateVehicleCheckins < ActiveRecord::Migration

	def change
		create_table :vehicle_checkins do |t|
			t.references :domain, :null => false
			t.references :terminal, :null => false
			t.references :vehicle
			t.references :driver
			t.date :run_date
			t.datetime :start_time
			t.integer :run_dist
			t.integer :run_time
			t.integer :idle_time
			t.integer :eco_drv_time
			t.integer :avg_speed
			t.integer :max_speed
			t.float :fuel_consmpt
			t.float :fuel_effcc
			t.float :sud_accel_cnt
			t.float :sud_brake_cnt
			t.float :ovr_spd_time
			t.float :co2_emss
			t.float :max_cool_water_temp
			t.float :avg_battery_volt
			t.integer :spd_lt_10
			t.integer :spd_lt_20
			t.integer :spd_lt_30
			t.integer :spd_lt_40
			t.integer :spd_lt_50
			t.integer :spd_lt_60
			t.integer :spd_lt_70
			t.integer :spd_lt_80
			t.integer :spd_lt_90
			t.integer :spd_lt_100
			t.integer :spd_lt_110
			t.integer :spd_lt_120
			t.integer :spd_lt_130
			t.integer :spd_lt_140
			t.integer :spd_lt_150
			t.integer :spd_lt_160
		end

    add_index :vehicle_checkins, [:vehicle_id], :name => :ix_vehicle_checkin_0
    add_index :vehicle_checkins, [:terminal_id], :name => :ix_vehicle_checkin_1
    add_index :vehicle_checkins, [:driver_id], :name => :ix_vehicle_checkin_2
    add_index :vehicle_checkins, [:run_date, :start_time, :vehicle_id], :name => :ix_vehicle_checkin_3
	end

end
