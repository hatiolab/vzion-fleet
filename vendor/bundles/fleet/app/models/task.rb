class Task < ActiveRecord::Base

	include Multitenant

	stampable
	
end
