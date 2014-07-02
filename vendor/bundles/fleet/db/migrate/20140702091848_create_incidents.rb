class CreateIncidents < ActiveRecord::Migration

	def change
		create_table :incidents do |t|
			t.references :domain, :null => false
			t.references :terminal, :null => false
			t.references :vehicle
			t.references :driver
			t.float :lat
			t.float :lng
			t.float :velocity
			t.float :impulse_x
			t.float :impulse_y
			t.float :impulse_z
			t.float :impulse_abs
			t.float :impulse_threshold
			t.float :engine_temp
			t.float :engine_temp_threshold
			t.boolean :obd_connected
			t.boolean :confirm
			t.string :video_clip, :limit => 255
			t.userstamps
			t.timestamps
		end

    add_index :incidents, [:domain_id, :updated_at], :name => :ix_incident_0
    add_index :incidents, [:domain_id, :terminal_id], :name => :ix_incident_1
    add_index :incidents, [:domain_id, :vehicle_id], :name => :ix_incident_2
    add_index :incidents, [:domain_id, :driver_id], :name => :ix_incident_3
    add_index :incidents, [:domain_id, :confirm], :name => :ix_incident_4
	end

end
