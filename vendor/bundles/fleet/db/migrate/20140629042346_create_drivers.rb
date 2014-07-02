class CreateDrivers < ActiveRecord::Migration

	def change
		create_table :drivers do |t|
			t.references :domain, :null => false
			t.string :name, :null => false, :limit => 64
			t.string :description, :limit => 255
			t.string :social_id, :limit => 32
			t.string :title, :limit => 32
			t.string :division, :limit => 32
			t.string :phone_no, :limit => 32
			t.string :mobile_no, :limit => 32
			t.userstamps
			t.timestamps
		end

		add_index :drivers, [:domain_id, :name], :unique => true, :name => :ix_driver_0
		add_index :drivers, [:domain_id, :social_id], :name => :ix_driver_1
	end

end
