class CreateTasks < ActiveRecord::Migration

	def change
		create_table :tasks do |t|
			t.references :domain
			t.string :title
			t.date :start_date
			t.date :end_date
			t.boolean :all_day
			t.string :category
			t.string :reminder
			t.string :notes
			t.string :loc
			t.string :rrule
			t.userstamps
			t.timestamps
		end

		add_index :tasks, [:domain_id, :updated_at], :name => :index_tasks_0
	end

end
