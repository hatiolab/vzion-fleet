# This migration comes from fleet_engine (originally 20140630120000)
class CreateGroupsVehicles < ActiveRecord::Migration
  
  def	change
    create_table :groups_vehicles do |t|
      t.references :vehicle_group, :null => false
      t.references :vehicle, :null => false
    end

    add_index :groups_vehicles, [:vehicle_group_id, :vehicle_id], :unique => true, :name => :ix_group_vehicle_0
  end
  
end