class VehicleConsumable < ActiveRecord::Base

	include Multitenant

	stampable
	belongs_to :vehicle
  
  #
  # 소모품을 교체한다. 소모품의 최근 교체일, 최근 교체 주행거리, 다음 교체일, 다음 교체 주행거리, 건강율, 상태 등의 정보를 업데이트한다. 
  #
  def replace_consumable(params = nil)
    current_miles = self.vehicle.vehicle_status.total_dist
    
		# 다음 교체일 계산
    if(self.repl_unit == Consumable::REPL_UNIT_BOTH || self.repl_unit == Consumable::REPL_UNIT_DURATION)
      self.last_repl_date = Date.today
      self.next_repl_date = Date.today + (self.cycle_repl_duration * 30)
    end
    
		# 다음 교체 주행거리 계산
    if(self.repl_unit == Consumable::REPL_UNIT_BOTH || self.repl_unit == Consumable::REPL_UNIT_MILEAGE)
      self.last_repl_mile = current_miles
      self.next_repl_mile = current_miles + self.cycle_repl_mile
    end
    
    self.health_rate = 0
    self.status = VehicleStatus::HEALTH_HEALTHY
    self.description = params[:description] if(params && !params[:description].blank?)
    self.cumulative_cost += params[:cost].to_i if(params && !params[:cost].blank?)
    self.save!
    
    # 소모품 교체 이력 추가 
    ConsumableHist.add_history(self)
  end
  
  #
  # 소모품 health rate, status 재계산
  #
  def update_status
    self.health_rate = self.calc_impending_rate
    self.status = (self.health_rate > 1) ? VehicleStatus::HEALTH_OVERDUE : ((self.health_rate < 0.9) ? VehicleStatus::HEALTH_HEALTHY : VehicleStatus::HEALTH_IMPENDING)
    self.save!
  end
  
  #
  # 소모품 교체 단위가 Mileage일 경우 impending rate 계산, 현재 차량 주행거리에서 마지막 교체 주행거리를 빼서 그 값과 교체 주행거리와의 비율을 계산
  #
  def calc_impending_rate_by_miles
    return -1 if(self.cycle_repl_mile <= 0)
    current_miles = self.vehicle.vehicle_status.total_dist
    miles_after_repl = current_miles - self.last_repl_mile
    val = (miles_after_repl <= 0) ? 0 : (miles_after_repl.to_f / self.cycle_repl_mile.to_f);
    return val * 100
  end
  
  #
  # 소모품 교체 단위가 Duration일 경우 health rate 계산, 오늘 날짜에서 마지막 교체일을 빼서 그 값과 교체일의 비율을 계산
  #
  def calc_impending_rate_by_duration
    return -1 if(self.cycle_repl_duration <= 0)
    self.last_repl_date = Date.today unless self.last_repl_date
    repl_days = self.cycle_repl_duration * 30       # 교체일수
    fast_days = Date.today - self.last_repl_date    # 마지막 교체 후 지나온 일수
    val = (fast_days.to_f / repl_days.to_f)
    return val * 100
  end
  
  #
  # 소모품 교체 단위가 Both일 경우 health rate 계산, Mileage, Time 두 경우 다 계산 한 후 큰 것을 리턴 
  #
  def calc_impending_rate
		rate_by_mile = self.calc_impending_rate_by_miles
		rate_by_time = self.calc_impending_rate_by_duration
		return (rate_by_mile > rate_by_time) ? rate_by_mile : rate_by_time;
  end
	
end
