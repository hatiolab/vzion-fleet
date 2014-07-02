class CreateGroupsDrivers < ActiveRecord::Migration
  
  def	change
    create_table :groups_drivers do |t|
      t.references :driver_group, :null => false
      t.references :driver, :null => false
    end

    add_index :groups_drivers, [:driver_group_id, :driver_id], :unique => true, :name => :ix_group_driver_0
  end
  
end