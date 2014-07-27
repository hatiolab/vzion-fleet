class SpotAlarm < ActiveRecord::Base

	include Multitenant

	stampable
  
  has_many :spot_alarm_vehicles
	
end
