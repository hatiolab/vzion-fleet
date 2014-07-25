class CreateLocationAlarms < ActiveRecord::Migration

	def change
		create_table :location_alarms do |t|
			t.references :domain
			t.string :name
			t.string :transfer_type
			t.string :evt_type
			t.string :evt_name
			t.string :evt_trg
			t.boolean :always
			t.boolean :enabled
			t.date :from_date
			t.date :to_date
			t.userstamps
			t.timestamps
		end

		add_index :location_alarms, [:domain_id, :name], :unique => true, :name => :index_location_alarms_0
		add_index :location_alarms, [:domain_id, :updated_at], :name => :index_location_alarms_1
	end

end
