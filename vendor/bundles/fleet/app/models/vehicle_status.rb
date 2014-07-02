class VehicleStatus < ActiveRecord::Base

  include Multitenant
  
	stampable
  removing_trackable
  
  validates_presence_of :vehicle_id, :strict => true
  validates_uniqueness_of :vehicle_id, :strict => true, :scope => :domain_id
  
	belongs_to :vehicle
	belongs_to :driver
	belongs_to :terminal
  
end
