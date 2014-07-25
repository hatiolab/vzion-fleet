class VehicleConsumablesController < ResourceMultiUpdateController
  
private
  def resource_params
    [ params.require(:vehicle_consumable).permit(:vehicle_id,:name,:description,:status,:health_rate,:cycle_repl_mile,:cycle_repl_duration,:last_repl_date,:last_repl_mile,:next_repl_date,:next_repl_mile,:repl_unit,:cumulative_cost) ]
  end
end
