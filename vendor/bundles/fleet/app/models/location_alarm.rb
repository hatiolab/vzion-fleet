class LocationAlarm < ActiveRecord::Base

	include Multitenant

	stampable
  
  has_many :location_alarm_vehicles
	
end
