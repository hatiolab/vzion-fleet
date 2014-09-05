class CreateRepairs < ActiveRecord::Migration

	def change
		create_table :repairs do |t|
			t.references :domain
			t.references :vehicle
			t.date :next_repair_date
			t.date :repair_date
			t.string :repair_man
			t.float :repair_mileage
			t.string :repair_shop
			t.float :repair_time
			t.integer :cost
			t.string :content
			t.string :comment
			t.string :oos
			t.userstamps
			t.timestamps
		end

		add_index :repairs, [:domain_id, :updated_at], :name => :index_repairs_0
	end

end
