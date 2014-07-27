# This migration comes from fleet_engine (originally 20140725131633)
class CreateSpotAlarmVehicles < ActiveRecord::Migration
  
  def	change
    create_table :spot_alarm_vehicles do |t|
      t.references :domain, :null => false
      t.references :spot_alarm, :null => false
      t.references :vehicle, :null => false
    end

    add_index :spot_alarm_vehicles, [:domain_id, :spot_alarm_id, :vehicle_id], :unique => true, :name => :ix_spot_alarm_vehicle_0
  end
  
end