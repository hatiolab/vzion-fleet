class DriverGroup < ActiveRecord::Base

	include Multitenant

  has_and_belongs_to_many :drivers, :join_table => "groups_drivers"
  
	stampable
	
end
