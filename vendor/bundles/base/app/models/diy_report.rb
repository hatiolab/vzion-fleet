class DiyReport < ActiveRecord::Base
  
  include Multitenant
    
  stampable
  strip_cols [:name, :description]
  removing_trackable

	belongs_to :diy_selection

	has_many :service_in_params, :as => :resource, :dependent => :destroy, :order => "rank asc"
	has_many :service_out_params, :as => :resource, :dependent => :destroy, :order => "rank asc"
  
  validates_presence_of :name, :strict => true
  validates :name, length: { in: 4..60 }, :strict => true
  validates :description, length: { maximum: 255 }, :strict => true
  validates_uniqueness_of :name, :strict => true, :scope => :domain_id
  validates_presence_of :diy_selection_id, :strict => true
  
  validates_associated :service_in_params
  validates_associated :service_out_params
    
end
