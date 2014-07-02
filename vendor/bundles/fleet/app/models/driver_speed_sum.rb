class DriverSpeedSum < ActiveRecord::Base

  include Multitenant
  
	belongs_to :driver
	
end
