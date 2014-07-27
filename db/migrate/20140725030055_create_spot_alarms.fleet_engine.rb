# This migration comes from fleet_engine (originally 20140725030041)
class CreateSpotAlarms < ActiveRecord::Migration

	def change
		create_table :spot_alarms do |t|
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

		add_index :spot_alarms, [:domain_id, :name], :unique => true, :name => :ix_spot_alarm_0
	end

end

