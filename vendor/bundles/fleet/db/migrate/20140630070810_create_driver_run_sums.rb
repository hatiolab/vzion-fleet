class CreateDriverRunSums < ActiveRecord::Migration

	def change
		create_table :driver_run_sums do |t|
			t.references :domain, :null => false
			t.references :driver, :null => false
			t.string :run_year
			t.string :run_month
			t.string :run_day
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
		end

    add_index :driver_run_sums, [:domain_id, :driver_id, :run_date], :unique => true, :name => :ix_driver_run_sum_0
    add_index :driver_run_sums, [:domain_id, :driver_id, :run_year], :name => :ix_driver_run_sum_1
    add_index :driver_run_sums, [:domain_id, :driver_id, :run_year, :run_month], :name => :ix_driver_run_sum_2
	end

end
