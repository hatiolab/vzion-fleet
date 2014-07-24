# This migration comes from fleet_engine (originally 20140628073004)
class CreateConsumables < ActiveRecord::Migration

	def change
		create_table :consumables do |t|
			t.references :domain, :null => false
			t.string :name, :null => false, :limit => 64
			t.string :description, :limit => 255
			t.string :unit, :limit => 10
			t.integer :init_repl_mile, :default => 0
			t.integer :init_repl_duration, :default => 0
			t.integer :repl_mile, :default => 0
			t.integer :repl_duration, :default => 0
			t.userstamps
			t.timestamps
		end

		add_index :consumables, [:domain_id, :name], :unique => true, :name => :ix_consumable_0
	end

end
