class CreateVehicleConsumables < ActiveRecord::Migration

	def change
		create_table :vehicle_consumables do |t|
			t.references :domain, :null => false
			t.references :vehicle, :null => false
			t.string :name, :null => false, :limit => 64
			t.string :description, :limit => 64
			t.string :status
			t.float :health_rate
			t.integer :cycle_repl_mile
			t.integer :cycle_repl_duration
			t.string :repl_unit, :limit => 10
			t.date :last_repl_date
			t.integer :last_repl_mile
			t.date :next_repl_date
			t.integer :next_repl_mile
			t.integer :cumulative_cost
			t.userstamps
			t.timestamps
		end

		add_index :vehicle_consumables, [:domain_id, :vehicle_id, :name], :unique => true, :name => :ix_vehicle_consumable_0
	end

end
