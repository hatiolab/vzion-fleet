class GroupsVehicles < ActiveRecord::Base

  self.table_name = :groups_vehicles
  belongs_to :vehicle_group
  belongs_to :vehicle

end
