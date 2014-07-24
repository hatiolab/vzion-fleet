class CreateDriverRunSums < ActiveRecord::Migration

	def change
		create_table :driver_run_sums do |t|
			t.references :domain, :null => false
			t.references :driver, :null => false
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
      t.datetime :updated_at
		end

    add_index :driver_run_sums, [:domain_id, :driver_id, :run_year, :run_month], :unique => true, :name => :ix_driver_run_sum_0
    add_index :driver_run_sums, [:domain_id, :run_year], :name => :ix_driver_run_sum_1
	end

end
