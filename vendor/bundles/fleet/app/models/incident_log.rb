class IncidentLog < ActiveRecord::Base

	include Multitenant

	stampable
	belongs_to :terminal
	belongs_to :vehicle
	belongs_to :driver
	
end
