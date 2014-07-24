# This migration comes from fleet_engine (originally 20140630060145)
class CreateDriverStatuses < ActiveRecord::Migration

	def change
		create_table :driver_statuses do |t|
			t.references :domain, :null => false
			t.references :driver, :null => false
			t.string :status, :limit => 10
			t.float :total_dist, :default => 0
			t.float :total_runtime, :default => 0
			t.float :avg_effcc, :default => 0
			t.integer :eco_index, :default => 0
			t.integer :eco_run_rate, :default => 0
			t.userstamps
			t.timestamps
		end

		add_index :driver_statuses, [:domain_id, :driver_id], :name => :ix_driver_status_0
		add_index :driver_statuses, [:domain_id, :status], :name => :ix_driver_status_1
	end

end
