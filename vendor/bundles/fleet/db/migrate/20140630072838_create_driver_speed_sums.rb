class CreateDriverSpeedSums < ActiveRecord::Migration

	def change
		create_table :driver_speed_sums do |t|
			t.references :domain, :null => false
			t.references :driver, :null => false
			t.integer :run_year
			t.integer :run_month
			t.integer :run_day
			t.date :run_date
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

    add_index :driver_speed_sums, [:domain_id, :driver_id, :run_date], :unique => true, :name => :ix_driver_spd_sum_0
    add_index :driver_speed_sums, [:domain_id, :driver_id, :run_year], :name => :ix_driver_spd_sum_1
    add_index :driver_speed_sums, [:domain_id, :driver_id, :run_year, :run_month], :name => :ix_driver_spd_sum_2
	end

end
