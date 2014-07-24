class CreateIncidents < ActiveRecord::Migration

	def change
		create_table :incidents do |t|
			t.references :domain, :null => false
			t.references :terminal, :null => false
			t.references :vehicle
			t.references :driver
			t.float :lat, :default => 0
			t.float :lng, :default => 0
			t.float :velocity, :default => 0
			t.float :impulse_x, :default => 0
			t.float :impulse_y, :default => 0
			t.float :impulse_z, :default => 0
			t.float :impulse_abs, :default => 0
			t.float :impulse_threshold, :default => 0
			t.float :engine_temp, :default => 0
			t.float :engine_temp_threshold, :default => 0
			t.boolean :obd_connected, :default => false
			t.boolean :confirm, :default => false
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
