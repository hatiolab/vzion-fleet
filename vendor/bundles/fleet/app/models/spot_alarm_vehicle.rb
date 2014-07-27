class SpotAlarmVehicle < ActiveRecord::Base

  belongs_to :spot_alarm
  belongs_to :vehicle

end
