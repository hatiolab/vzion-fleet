class Consumable < ActiveRecord::Base

	include Multitenant

	stampable
  
  strip_cols [:name]
  removing_trackable
  
  validates_presence_of :name, :strict => true
  validates_uniqueness_of :name, :strict => true, :scope => :domain_id
  validates :name, length: { in: 2..60 }, :strict => true
  validates :description, length: { maximum: 255 }, :strict => true
  
  REPL_UNIT_BOTH = "Both"
  REPL_UNIT_DURATION = "Duration"
  REPL_UNIT_MILEAGE = "Mileage"

end
