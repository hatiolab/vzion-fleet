vehicles = Vehicle.all
consumables = Consumable.all

vehicles.each do |vehicle|
  consumables.each do |consumable|
    vehicle_consumable = VehicleConsumable.create!(
      vehicle_id: vehicle.id,
      name: consumable.name,
      description: consumable.description,
      status: VehicleStatus::HEALTHY,
      health_rate: 0,
      cycle_repl_mile: consumable.repl_mile,
      cycle_repl_duration: consumable.repl_duration,
      repl_unit: consumable.unit,
      last_repl_mile: 0,
      cumulative_cost: 0
    )
    vehicle_consumable.replace_consumable
  end
end