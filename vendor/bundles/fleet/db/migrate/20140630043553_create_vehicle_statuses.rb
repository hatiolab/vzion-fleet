class CreateVehicleStatuses < ActiveRecord::Migration

	def change
		create_table :vehicle_statuses do |t|
			t.references :domain, :null => false
			t.references :vehicle, :null => false
			t.references :driver
			t.references :terminal
			t.string :status, :limit => 10
			t.string :health_status, :limit => 10
			t.float :total_dist, :default => 0
			t.float :total_runtime, :default => 0
			t.float :remain_fuel, :default => 0
			t.float :official_effcc, :default => 0
			t.float :avg_effcc, :default => 0
			t.integer :eco_index, :default => 0
			t.integer :eco_run_rate, :default => 0
			t.float :lat
			t.float :lng
			t.userstamps
			t.timestamps
		end

    add_index :vehicle_statuses, [:domain_id, :vehicle_id], :unique => true, :name => :ix_vehicle_status_0
		add_index :vehicle_statuses, [:domain_id, :status], :name => :ix_vehicle_status_1
    add_index :vehicle_statuses, [:domain_id, :health_status], :name => :ix_vehicle_status_2
	end

end
