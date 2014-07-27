class Driver < ActiveRecord::Base

	include Multitenant
  include Attachable
  include PropertyKeepable

	stampable
  strip_cols [:name,:description,:social_id,:division,:title,:phone_no,:mobile_no]
  removing_trackable
  
  has_one :driver_status
  
  after_create do
    DriverStatus.create!({:driver_id => self.id, :status => :None.to_s})
  end
  
  after_destroy do
    # 차량 그룹에서 삭제
    GroupsDrivers.delete_all("driver_id = #{self.id}")
    # 차량 상태에서 삭제
    DriverStatus.delete_all("driver_id = #{self.id}")
  end
end
