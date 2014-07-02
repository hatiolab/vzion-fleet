class CreateConsumables < ActiveRecord::Migration

	def change
		create_table :consumables do |t|
			t.references :domain, :null => false
			t.string :name, :null => false, :limit => 64
			t.string :description, :limit => 255
			t.string :unit, :limit => 20
			t.integer :initial_mileage
			t.integer :inital_duration
			t.integer :last_mileage
			t.integer :last_duration
			t.userstamps
			t.timestamps
		end

		add_index :consumables, [:domain_id, :name], :unique => true, :name => :ix_consumable_0
	end

end
