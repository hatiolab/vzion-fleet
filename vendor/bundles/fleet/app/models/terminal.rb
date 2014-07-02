class Terminal < ActiveRecord::Base

	include Multitenant

	stampable
	belongs_to :vehicle
	belongs_to :driver
	
end
