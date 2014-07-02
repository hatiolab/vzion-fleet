# This migration comes from fleet_engine (originally 20140629101753)
class CreateDriverGroups < ActiveRecord::Migration

	def change
		create_table :driver_groups do |t|
			t.references :domain, :null => false
			t.string :name, :null => false, :limit => 64
			t.string :description, :limit => 255
			t.userstamps
			t.timestamps
		end

		add_index :driver_groups, [:domain_id, :name], :unique => true, :name => :ix_driver_group_0
	end

end
