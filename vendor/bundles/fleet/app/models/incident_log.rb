class IncidentLog < ActiveRecord::Base

	include Multitenant

	stampable
	belongs_to :terminal
	belongs_to :incident
	
end
