# This migration comes from fleet_engine (originally 20140721160439)
class CreateRepairs < ActiveRecord::Migration
  
  def	change
    create_table :repairs do |t|
      t.references :domain, :null => false
      t.references :vehicle, :null => false
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

    add_index :repairs, [:domain_id, :updated_at], :unique => true, :name => :ix_repairs_0
  end
  
end