class DriverStatus < ActiveRecord::Base

  include Multitenant
  
	stampable
	belongs_to :driver
	
  STATUS_NONE = "None"
  STATUS_IDLE = "Idle"
  STATUS_INCIDENT = "Incident"
  STATUS_RUN = "Running"
  
end
