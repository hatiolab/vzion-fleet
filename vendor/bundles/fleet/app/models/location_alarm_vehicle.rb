class LocationAlarmVehicle < ActiveRecord::Base

  belongs_to :location_alarm
  belongs_to :vehicle

end
