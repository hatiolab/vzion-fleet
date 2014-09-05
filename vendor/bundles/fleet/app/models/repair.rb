class Repair < ActiveRecord::Base

	include Multitenant

	stampable
	belongs_to :vehicle
	
end
