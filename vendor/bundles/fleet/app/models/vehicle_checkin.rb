class VehicleCheckin < ActiveRecord::Base

  include Multitenant
  
	belongs_to :terminal
	belongs_to :vehicle
	belongs_to :driver
  
  def self.randomGenCheckinData(vehicle, today)
    
    vehicle_statuses = VehicleStatus.where("vehicle_id = ?", vehicle.id)
    engineStartTime = today + " 09:30:00"
    
    vehicle_statuses.each do |vehicle_status|
      data = {}
      data["terminal_id"] = vehicle_status.terminal_id
      data["vehicle_id"] = vehicle.id
      data["driver_id"] = vehicle_status.driver_id
      data["run_date"] = today
      data["start_time"] = Time.parse(engineStartTime)
      data["run_dist"] = 175 + rand(35)
      data["run_time"] = 250 + rand(35)
      data["idle_time"] = 25 + rand(15)
      data["eco_drv_time"] = 25 + rand(15)
      data["avg_speed"] = 18 + rand(20)
      data["max_speed"] = 120 + rand(30)
      data["fuel_consmpt"] = 10 + rand(8)
      data["fuel_effcc"] = 8 + rand(7)
      data["sud_accel_cnt"] = 17 + rand(15)
      data["sud_brake_cnt"] = 17 + rand(15)
      data["ovr_spd_time"] = 18 + rand(20)
      data["co2_emss"] = 79 + rand(13)
      data["max_cool_water_temp"] = 30 + rand(23)
      data["avg_battery_volt"] = 34 + rand(21)
      
      
      1.upto(16) do |idx|
        data["spd_lt_" + "#{idx}" + "0"] = rand(40)
      end
      
      VehicleCheckin.create! data
    end
  end
	
end
