class CreateVehicleGroups < ActiveRecord::Migration

	def change
		create_table :vehicle_groups do |t|
			t.references :domain, :null => false
			t.string :name, :null => false, :limit => 64
			t.string :description, :limit => 255
			t.userstamps
			t.timestamps
		end

		add_index :vehicle_groups, [:domain_id, :name], :unique => true, :name => :ix_vehicle_group_0
	end

end
