class VehicleTrace < ActiveRecord::Base

  include Multitenant
  
	belongs_to :terminal
	belongs_to :vehicle
	belongs_to :driver
	
end
