class CreateLocations < ActiveRecord::Migration

	def change
		create_table :locations do |t|
			t.references :domain, :null => false
			t.string :name, :null => false, :limit => 128
			t.string :description, :limit => 255
			t.string :address, :limit => 255
			t.float :radius
			t.float :lat
			t.float :lng
			t.float :lat_hi
			t.float :lat_low
			t.float :lng_hi
			t.float :lng_low
			t.userstamps
			t.timestamps
		end

		add_index :locations, [:domain_id, :name], :name => :ix_location_0
		add_index :locations, [:domain_id, :address], :name => :ix_location_1
	end

end
