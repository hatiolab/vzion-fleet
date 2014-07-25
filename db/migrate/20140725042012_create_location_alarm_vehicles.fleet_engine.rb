# This migration comes from fleet_engine (originally 20140725131633)
class CreateLocationAlarmVehicles < ActiveRecord::Migration
  
  def	change
    create_table :location_alarm_vehicles do |t|
      t.references :domain, :null => false
      t.references :location_alarm, :null => false
      t.references :vehicle, :null => false
      t.string :alarm_name
    end

    add_index :location_alarm_vehicles, [:location_alarm_id, :vehicle_id], :name => :ix_location_alarm_vehicles_0
  end
  
end