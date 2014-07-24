class CreateVehicles < ActiveRecord::Migration

	def change
		create_table :vehicles do |t|
			t.references :domain, :null => false
			t.string :name, :null => false, :limit => 64
      t.string :description, :limit => 255
			t.string :model, :limit => 64
			t.string :vendor, :limit => 32
			t.string :classicfication, :limit => 32
			t.string :fuel_type, :limit => 15
			t.string :ownership, :limit => 15
			t.integer :birth_year, :default => 0
			t.integer :seat_size, :default => 0
			t.userstamps
			t.timestamps
		end

		add_index :vehicles, [:domain_id, :name], :unique => true, :name => :ix_vehicle_0
		add_index :vehicles, [:domain_id, :model], :name => :ix_vehicle_1
		add_index :vehicles, [:domain_id, :vendor], :name => :ix_vehicle_2
		add_index :vehicles, [:domain_id, :fuel_type], :name => :ix_vehicle_3
		add_index :vehicles, [:domain_id, :ownership], :name => :ix_vehicle_4
		add_index :vehicles, [:domain_id, :birth_year], :name => :ix_vehicle_5
	end

end
