class DriverStatus < ActiveRecord::Base

  include Multitenant
  
	stampable
	belongs_to :driver
	
end
