class CreateSpotAlarms < ActiveRecord::Migration

	def change
		create_table :spot_alarms do |t|
			t.references :domain
			t.string :name, :limit => 64
			t.string :transfer_type, :limit => 20
			t.string :evt_type, :limit => 20
			t.string :evt_name, :limit => 32
			t.string :evt_trg, :limit => 20
			t.boolean :always, :default => false
			t.boolean :enabled, :default => false
			t.date :from_date
			t.date :to_date
			t.userstamps
			t.timestamps
		end

		add_index :spot_alarms, [:domain_id, :name], :unique => true, :name => :ix_spot_alarm_0
	end

end
