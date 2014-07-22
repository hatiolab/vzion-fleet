class CreateIncidentLogs < ActiveRecord::Migration

	def change
		create_table :incident_logs do |t|
			t.references :domain, :null => false
			t.references :terminal, :null => false
			t.references :incident
      t.date :incident_log_date
			t.float :lat
			t.float :lng
			t.float :velocity
			t.float :accelate_x
			t.float :accelate_y
			t.float :accelate_z
			t.userstamps
			t.timestamps
		end

    add_index :incident_logs, [:domain_id, :updated_at], :name => :ix_incident_log_0
    add_index :incident_logs, [:domain_id, :terminal_id], :name => :ix_incident_log_1
	end

end
