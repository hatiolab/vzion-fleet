# This migration comes from fleet_engine (originally 20140629033603)
class CreateSpots < ActiveRecord::Migration

	def change
		create_table :spots do |t|
			t.references :domain, :null => false
			t.string :name, :null => false, :limit => 128
			t.string :description, :limit => 255
			t.string :address, :limit => 255
			t.float :radius, :default => 0
			t.float :lat, :default => 0
			t.float :lng, :default => 0
			t.float :lat_hi, :default => 0
			t.float :lat_low, :default => 0
			t.float :lng_hi, :default => 0
			t.float :lng_low, :default => 0
			t.userstamps
			t.timestamps
		end

		add_index :spots, [:domain_id, :name], :name => :ix_spot_0
		add_index :spots, [:domain_id, :address], :name => :ix_spot_1
	end

end
