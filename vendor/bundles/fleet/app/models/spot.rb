class Spot < ActiveRecord::Base

	include Multitenant

	stampable

  strip_cols [:name, :description]
  removing_trackable
  
  validates_presence_of :name, :strict => true
  validates_uniqueness_of :name, :strict => true, :scope => :domain_id
  validates :name, length: { in: 2..60 }, :strict => true
  validates :description, length: { maximum: 255 }, :strict => true
  validates :address, length: { maximum: 255 }, :strict => true
end
