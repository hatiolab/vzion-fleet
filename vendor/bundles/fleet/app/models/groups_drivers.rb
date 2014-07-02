class GroupsDrivers < ActiveRecord::Base

  self.table_name = :groups_drivers
  belongs_to :driver_group
  belongs_to :driver

end
