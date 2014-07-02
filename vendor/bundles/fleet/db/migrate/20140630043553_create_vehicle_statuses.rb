class CreateVehicleStatuses < ActiveRecord::Migration

	def change
		create_table :vehicle_statuses do |t|
			t.references :domain, :null => false
			t.references :vehicle, :null => false
			t.references :driver
			t.references :terminal
			t.string :status, :limit => 10
			t.string :health_status, :limit => 10
			t.float :total_dist
			t.float :total_runtime
			t.float :remain_fuel
			t.float :official_effcc
			t.float :avg_effcc
			t.integer :eco_index
			t.integer :eco_run_rate
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
