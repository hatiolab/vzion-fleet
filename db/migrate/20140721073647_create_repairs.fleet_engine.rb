# This migration comes from fleet_engine (originally 20140721160439)
class CreateRepairs < ActiveRecord::Migration
  
  def	change
    create_table :repairs do |t|
      t.references :domain, :null => false
      t.references :vehicle, :null => false
      t.date :next_repair_date
      t.date :repair_date
      t.string :repair_man, :limit => 64
      t.float :repair_mileage, :default => 0
      t.string :repair_shop, :limit => 64
      t.float :repair_time, :default => 0
      t.integer :cost, :default => 0
      t.string :content, :limit => 255
      t.string :comment, :limit => 255
      t.string :oos, :limit => 255
      t.userstamps
      t.timestamps
    end

    add_index :repairs, [:domain_id, :vehicle_id], :name => :ix_repairs_0
    add_index :repairs, [:domain_id, :repair_date], :name => :ix_repairs_1
  end
  
end