class VehicleTrace < ActiveRecord::Base

  include Multitenant
  
	belongs_to :terminal
	belongs_to :vehicle
	belongs_to :driver
  
  def self.moveVehicle(vehicle, lat, lng)
    
    vehicle_statuses = VehicleStatus.where("vehicle_id = ?", vehicle.id)
    
    vehicle_statuses.each do |vehicle_status|
      terminal_id = vehicle_status.terminal_id
      vehicle_id = vehicle.id
      driver_id = vehicle_status.driver_id
      datetime = Time.now - 1.hours
      
      1.upto(lat.length) do |idx|
        trace_time = datetime + (idx -1)
        velocity = 25 + rand(35)
        
        VehicleTrace.create!({
          :terminal_id => terminal_id,
          :vehicle_id => vehicle_id,
          :driver_id => driver_id,
          :lng => lng[idx-1],
          :lat => lat[idx-1],
          :velocity => velocity,
          :trace_time => trace_time
        })
      end
    
      # 0.upto(count) do |idx|
      #   addLng = (rand(100) * 0.0001)
      #   addLat = (rand(100) * 0.0001)
      #   lng += addLng
      #   lat += addLat
      #   trace_time = datetime + idx
      #   velocity = 25 + rand(35)
      #
      #   VehicleTrace.create!({
      #     :terminal_id => terminal_id,
      #     :vehicle_id => vehicle_id,
      #     :driver_id => driver_id,
      #     :lng => lng,
      #     :lat => lat,
      #     :velocity => velocity,
      #     :trace_time => trace_time
      #   })
      # end
    end
  end
	
end
