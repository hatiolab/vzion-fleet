# This migration comes from fleet_engine (originally 20140629070117)
class CreateTerminals < ActiveRecord::Migration

	def change
		create_table :terminals do |t|
			t.references :domain, :null => false
			t.string :name, :limit => 64
			t.string :description, :limit => 255
			t.date :purchase_date
			t.references :vehicle
			t.references :driver
			t.userstamps
			t.timestamps
		end

		add_index :terminals, [:domain_id, :name], :unique => true, :name => :ix_terminal_0
		add_index :terminals, [:domain_id, :description], :name => :ix_terminal_1
	end

end