class CreateVehicleRunSums < ActiveRecord::Migration

	def change
		create_table :vehicle_run_sums do |t|
			t.references :domain, :null => false
			t.references :vehicle, :null => false
			t.integer :run_year
			t.integer :run_month
			t.integer :run_day
			t.date :run_date
			t.integer :run_time
			t.integer :run_dist
			t.float :consmpt
			t.float :co2_emss
			t.float :effcc
			t.integer :eco_index
			t.integer :sud_accel_cnt
			t.integer :sud_brake_cnt
			t.integer :eco_drv_time
			t.integer :ovr_spd_time
			t.integer :idle_time
			t.integer :inc_cnt
			t.integer :oos_cnt
			t.integer :mnt_cnt
			t.integer :mnt_time
		end

    add_index :vehicle_run_sums, [:domain_id, :domain_id, :vehicle_id, :run_date], :unique => true, :name => :ix_vehicle_run_sum_0
    add_index :vehicle_run_sums, [:domain_id, :vehicle_id, :run_year], :name => :ix_vehicle_run_sum_1
    add_index :vehicle_run_sums, [:domain_id, :vehicle_id, :run_year, :run_month], :name => :ix_vehicle_run_sum_2
	end

end
