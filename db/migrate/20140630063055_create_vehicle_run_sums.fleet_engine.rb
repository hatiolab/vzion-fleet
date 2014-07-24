# This migration comes from fleet_engine (originally 20140630062831)
class CreateVehicleRunSums < ActiveRecord::Migration

	def change
		create_table :vehicle_run_sums do |t|
			t.references :domain, :null => false
			t.references :vehicle, :null => false
			t.integer :run_year
			t.integer :run_month
			t.integer :run_time, :default => 0
			t.integer :run_dist, :default => 0
			t.float :consmpt, :default => 0
			t.float :co2_emss, :default => 0
			t.float :effcc, :default => 0
			t.integer :eco_index, :default => 0
			t.integer :sud_accel_cnt, :default => 0
			t.integer :sud_brake_cnt, :default => 0
			t.integer :eco_drv_time, :default => 0
			t.integer :ovr_spd_time, :default => 0
			t.integer :idle_time, :default => 0
			t.integer :inc_cnt, :default => 0
			t.integer :oos_cnt, :default => 0
			t.integer :mnt_cnt, :default => 0
			t.integer :mnt_time, :default => 0
      t.datetime :updated_at
		end

    add_index :vehicle_run_sums, [:domain_id, :vehicle_id, :run_year, :run_month], :unique => true, :name => :ix_vehicle_run_sum_0
    add_index :vehicle_run_sums, [:domain_id, :run_year], :name => :ix_vehicle_run_sum_1
	end

end