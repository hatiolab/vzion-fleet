class Vehicle < ActiveRecord::Base

	include Multitenant
  include Attachable
  include PropertyKeepable

	stampable
  strip_cols [:name]
  removing_trackable
  
  validates_presence_of :name, :strict => true
  validates_uniqueness_of :name, :strict => true, :scope => :domain_id
  validates :name, length: { in: 2..60 }, :strict => true
  validates :description, length: { maximum: 255 }, :strict => true
  
  has_one :vehicle_status
  has_many :vehicle_consumables
  has_many :repairs

  after_create do
    VehicleStatus.create!({:vehicle_id => self.id, :status => :None.to_s, :health_status => :None.to_s})
  end
  
  after_destroy do
    # 차량 그룹에서 삭제
    GroupsVehicles.delete_all("vehicle_id = #{self.id}")
    # 차량 상태에서 삭제
    VehicleStatus.delete_all("vehicle_id = #{self.id}")
  end
  
end
