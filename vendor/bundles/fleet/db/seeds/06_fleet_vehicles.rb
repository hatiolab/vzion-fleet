#encoding: utf-8 

Vehicle.create! :name => '18고 1298', :description => 'V-001', :vendor => 'Hyundai', :model => '아반떼', :ownership => 'Company', :fuel_type => 'GAS', :classicfication => 'Sedan', :seat_size => 5, :birth_year => 2012
Vehicle.create! :name => '26다 9204', :description => 'V-002', :vendor => 'Kia', :model => '프라이드', :ownership => 'Personal', :fuel_type => 'GAS', :classicfication => 'Hatchback', :seat_size => 4, :birth_year => 2014
Vehicle.create! :name => '76허 1938', :description => 'V-003', :vendor => 'GM', :model => '크루즈', :ownership => 'Rent', :fuel_type => 'LPG', :classicfication => 'Sedan', :seat_size => 5, :birth_year => 2010
Vehicle.create! :name => '31파 7102', :description => 'V-004', :vendor => 'Kia', :model => '모닝', :ownership => 'Company', :fuel_type => 'GAS', :classicfication => 'Sedan', :seat_size => 4, :birth_year => 2008

VehicleGroup.create! :name => "Group A", :description => "그룹 A"
VehicleGroup.create! :name => "Group B", :description => "그룹 B"

GroupsVehicles.create! :vehicle_group_id => 1, :vehicle_id => 1
GroupsVehicles.create! :vehicle_group_id => 2, :vehicle_id => 2
GroupsVehicles.create! :vehicle_group_id => 1, :vehicle_id => 3
GroupsVehicles.create! :vehicle_group_id => 2, :vehicle_id => 4

terminals = Terminal.all
vehicle_statuses = VehicleStatus.all

terminals.each do |terminal|
  terminal.driver_id = terminal.id
  terminal.vehicle_id = terminal.id
  terminal.save!
end

lat, lng = 37.42, 127.16
vehicle_statuses.each do |vehicle_status|
  vehicle_status.status = VehicleStatus::STATUS_RUN
  vehicle_status.health_status = VehicleStatus::HEALTH_HEALTHY
  vehicle_status.driver_id = vehicle_status.vehicle.id
  vehicle_status.terminal_id = vehicle_status.vehicle.id
  vehicle_status.official_effcc = 15
  vehicle_status.total_dist = rand(1000) * 100
  vehicle_status.total_runtime = rand(1000) * 100
  vehicle_status.lat = lat
  vehicle_status.lng = lng
  vehicle_status.save!
  lat = lat - 0.08
  lng = lng - 0.1
end