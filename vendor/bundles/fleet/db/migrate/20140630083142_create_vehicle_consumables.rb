class CreateVehicleConsumables < ActiveRecord::Migration

	def change
		create_table :vehicle_consumables do |t|
			t.references :domain, :null => false
			t.references :vehicle, :null => false
			t.string :name, :null => false, :limit => 64
			t.string :description, :limit => 64
			t.string :status, :limit => 10
			t.float :health_rate, :default => 0
			t.integer :cycle_repl_mile, :default => 0
			t.integer :cycle_repl_duration, :default => 0
			t.string :repl_unit, :limit => 10
			t.date :last_repl_date
			t.integer :last_repl_mile, :default => 0
			t.date :next_repl_date
			t.integer :next_repl_mile, :default => 0
			t.integer :cumulative_cost, :default => 0
			t.userstamps
			t.timestamps
		end

		add_index :vehicle_consumables, [:domain_id, :vehicle_id, :name], :unique => true, :name => :ix_vehicle_consumable_0
    add_index :vehicle_consumables, [:domain_id, :vehicle_id], :name => :ix_vehicle_consumable_1
	end

end
