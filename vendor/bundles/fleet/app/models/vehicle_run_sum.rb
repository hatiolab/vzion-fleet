class VehicleRunSum < ActiveRecord::Base

  include Multitenant
  
	belongs_to :vehicle
	
end
