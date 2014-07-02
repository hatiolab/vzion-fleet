#encoding: utf-8 

Menu.setup :Company, {:rank => 1000} do
  submenu :Location, {:rank => 1100, :template => 'Fleet.view.location.Location'}
  submenu :Consumable, {:rank => 1200, :template => 'Fleet.view.consumable.Consumable'}
end

Menu.setup :Vehicle, {:rank => 2000} do
  submenu :Vehicle, {:rank => 2100, :template => 'Fleet.view.vehicle.Vehicle'}
  submenu :VehicleGroup, {:rank => 2200, :template => 'Fleet.view.vehicle_group.VehicleGroup'}
  submenu :VehicleStatus, {:rank => 2300, :template => 'Fleet.view.vehicle_status.VehicleStatus'}
  submenu :VehicleTrace, {:rank => 2400, :template => 'Fleet.view.vehicle_trace.VehicleTrace'}
  submenu :VehicleCheckin, {:rank => 2500, :template => 'Fleet.view.vehicle_checkin.VehicleCheckin'}
  submenu :VehicleRunSum, {:rank => 2600, :template => 'Fleet.view.vehicle_run_sum.VehicleRunSum'}
  submenu :VehicleSpeedSum, {:rank => 2700, :template => 'Fleet.view.vehicle_speed_sum.VehicleSpeedSum'}
end

Menu.setup :Driver, {:rank => 3000} do
  submenu :Driver, {:rank => 3100, :template => 'Fleet.view.driver.Driver'}
  submenu :DriverGroup, {:rank => 3200, :template => 'Fleet.view.driver_group.DriverGroup'}
  submenu :DriverStatus, {:rank => 3300, :template => 'Fleet.view.driver_status.DriverStatus'}
  submenu :DriverRunSum, {:rank => 3400, :template => 'Fleet.view.driver_run_sum.DriverRunSum'}
  submenu :DriverSpeedSum, {:rank => 3500, :template => 'Fleet.view.driver_speed_sum.DriverSpeedSum'}
end

Menu.setup :Terminal, {:rank => 4000} do
  submenu :Terminal, {:rank => 4100, :template => 'Fleet.view.terminal.Terminal'}
  submenu :Incident, {:rank => 4200, :template => 'Fleet.view.incident.Incident'}
end

Menu.setup :Maintenance, {:rank => 5000} do
  submenu :VehicleConsumable, {:rank => 5100, :template => 'Fleet.view.vehicle_consumable.VehicleConsumable'}
end

Menu.setup :Schedule, {:rank => 6000} do
end

Menu.setup :Dashboard, {:rank => 7000} do
end