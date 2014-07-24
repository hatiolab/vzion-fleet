# This migration comes from fleet_engine (originally 20140724075413)
class CreateTasks < ActiveRecord::Migration

	def change
		create_table :tasks do |t|
			t.references :domain, :null => false
			t.string :title, :limit => 128
			t.date :start_date
			t.date :end_date
			t.boolean :all_day, :default => false
			t.string :category, :limit => 20
			t.string :reminder, :limit => 32
			t.string :notes, :limit => 255
			t.string :loc, :limit => 64
			t.string :rrule, :limit => 255
			t.userstamps
			t.timestamps
		end

		add_index :tasks, [:domain_id, :start_date], :name => :ix_tasks_0
		add_index :tasks, [:domain_id, :updated_at], :name => :ix_tasks_1
	end

end
