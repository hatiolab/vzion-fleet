class CreateDriverStatuses < ActiveRecord::Migration

	def change
		create_table :driver_statuses do |t|
			t.references :domain, :null => false
			t.references :driver, :null => false
			t.string :status, :limit => 10
			t.float :total_dist
			t.float :total_runtime
			t.float :avg_effcc
			t.integer :eco_index
			t.integer :eco_run_rate
			t.userstamps
			t.timestamps
		end

		add_index :driver_statuses, [:domain_id, :driver_id], :name => :ix_driver_status_0
		add_index :driver_statuses, [:domain_id, :status], :name => :ix_driver_status_1
	end

end
