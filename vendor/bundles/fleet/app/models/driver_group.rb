class DriverGroup < ActiveRecord::Base

	include Multitenant

  removing_trackable
	stampable
  strip_cols [:name, :description]
  
  validates_presence_of :name, :strict => true
  validates_uniqueness_of :name, :strict => true, :scope => :domain_id
  validates :name, length: { in: 1..60 }, :strict => true
  validates :description, length: { maximum: 255 }, :strict => true  

  has_and_belongs_to_many :drivers, :join_table => "groups_drivers"
	
end