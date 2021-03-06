class ConsumableHist < ActiveRecord::Base

	belongs_to :vehicle_consumable
	belongs_to :vehicle
  
  def self.add_history(vehicle_consumable)
    hist = ConsumableHist.new
    hist.vehicle_consumable_id = vehicle_consumable.id
    hist.vehicle_id = vehicle_consumable.vehicle_id
    hist.name = vehicle_consumable.name
    hist.status = vehicle_consumable.status
    hist.health_rate = vehicle_consumable.health_rate
    hist.last_repl_mile = vehicle_consumable.last_repl_mile
    hist.last_repl_date = vehicle_consumable.last_repl_date
    hist.cumulative_cost = vehicle_consumable.cumulative_cost
    hist.created_at = Time.now
    hist.save!
  end
  
  def self.add_replace_history(vehicle_consumable, params)
    hist = ConsumableHist.new
    hist.vehicle_consumable_id = vehicle_consumable.id
    hist.vehicle_id = vehicle_consumable.vehicle_id
    hist.name = vehicle_consumable.name
    hist.status = vehicle_consumable.status
    hist.health_rate = vehicle_consumable.health_rate
    hist.last_repl_mile = vehicle_consumable.last_repl_mile
    hist.last_repl_date = vehicle_consumable.last_repl_date
    hist.cumulative_cost = vehicle_consumable.cumulative_cost
    hist.repl_cost = params[:repl_cost]
    hist.worker = params[:worker]
    hist.component = params[:component]
    hist.work_comment = params[:comment]
    hist.created_at = Time.now
    hist.save!
  end

end
