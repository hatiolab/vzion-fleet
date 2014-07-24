class VehicleStatus < ActiveRecord::Base

  include Multitenant
  
	stampable
  removing_trackable
  
  validates_presence_of :vehicle_id, :strict => true
  validates_uniqueness_of :vehicle_id, :strict => true, :scope => :domain_id
  
	belongs_to :vehicle
	belongs_to :driver
	belongs_to :terminal
  
  HEALTH_NONE = "None"
  HEALTH_HEALTHY = "Healthy"
  HEALTH_IMPENDING = "Impending"
  HEALTH_OVERDUE = "Overdue"
  
  STATUS_NONE = "None"
  STATUS_IDLE = "Idle"
  STATUS_INCIDENT = "Incident"
  STATUS_MAINT = "Maint"
  STATUS_RUN = "Running"
  
  #
  # 차량의 상태를 업데이트한다.
  #
  def update_health
    state = VehicleStatus::HEALTH_HEALTHY
    self.vehicle.vehicle_consumables.each do |consumable|
      if(consumable.status == VehicleStatus::HEALTH_IMPENDING)
        state = VehicleStatus::HEALTH_IMPENDING
      elsif(consumable.status == VehicleStatus::HEALTH_OVERDUE)
        state = VehicleStatus::HEALTH_OVERDUE
        break
      end
    end
    
    self.status = state
    self.save!
  end
  
end
