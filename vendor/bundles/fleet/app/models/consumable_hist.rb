class ConsumableHist < ActiveRecord::Base

	belongs_to :vehicle_consumable
	belongs_to :vehicle
	
end
