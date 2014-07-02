class CreateConsumableHists < ActiveRecord::Migration

	def change
		create_table :consumable_hists do |t|
			t.references :vehicle_consumable, :null => false
			t.integer :seq
			t.references :vehicle, :null => false
			t.string :name, :limit => 64
			t.string :status, :limit => 10
			t.float :health_rate
			t.integer :cycle_repl_mile
			t.integer :cycle_repl_duration
			t.date :last_repl_date
			t.integer :last_repl_mile
			t.date :next_repl_date
			t.integer :next_repl_mile
			t.string :repl_unit, :limit => 10
			t.integer :cumulative_cost
			t.integer :repl_cost
			t.string :worker, :limit => 64
			t.string :work_comment, :limit => 255
			t.datetime :created_time
		end

		add_index :consumable_hists, [:vehicle_consumable_id, :seq, :vehicle_id], :unique => true, :name => :ix_consumable_hist_0
	end

end
