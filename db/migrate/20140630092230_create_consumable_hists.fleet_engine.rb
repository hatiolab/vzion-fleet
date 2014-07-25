# This migration comes from fleet_engine (originally 20140630091343)
class CreateConsumableHists < ActiveRecord::Migration

	def change
		create_table :consumable_hists do |t|
			t.references :vehicle_consumable, :null => false
			t.references :vehicle, :null => false
			t.string :name, :limit => 64
			t.string :status, :limit => 10
			t.float :health_rate, :default => 0
			t.date :last_repl_date
			t.integer :last_repl_mile, :default => 0
			t.integer :cumulative_cost, :default => 0
      t.string :component, :limit => 64
			t.integer :repl_cost, :default => 0
			t.string :worker, :limit => 64
			t.string :work_comment, :limit => 255
			t.datetime :created_at
		end

		add_index :consumable_hists, [:vehicle_consumable_id, :created_at], :name => :ix_consumable_hist_0
		add_index :consumable_hists, [:vehicle_id, :created_at], :name => :ix_consumable_hist_1
	end

end

