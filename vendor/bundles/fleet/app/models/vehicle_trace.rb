class VehicleTrace < ActiveRecord::Base

  include Multitenant
  
	belongs_to :terminal
	belongs_to :vehicle
	belongs_to :driver
  
  after_create do
    if(self.vehicle)
      vehicle_status = self.vehicle.vehicle_status
      vehicle_status.lat = self.lat
      vehicle_status.lng = self.lng
      vehicle_status.status = VehicleStatus::STATUS_RUN
      vehicle_status.save!
    end
  end
	
end
