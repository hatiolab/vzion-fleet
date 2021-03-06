class CreateVehicleSpeedSums < ActiveRecord::Migration

	def change
		create_table :vehicle_speed_sums do |t|
			t.references :domain, :null => false
			t.references :vehicle, :null => false
			t.integer :run_year
			t.integer :run_month
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
      t.datetime :updated_at
		end

    add_index :vehicle_speed_sums, [:domain_id, :vehicle_id, :run_year, :run_month], :unique => true, :name => :ix_vehicle_spd_sum_0
    add_index :vehicle_speed_sums, [:domain_id, :run_year], :name => :ix_vehicle_spd_sum_1
	end

end
