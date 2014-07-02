class VehicleConsumablesController < ResourceMultiUpdateController
  
private
  def resource_params
    [ params.require(:vehicle_consumable).permit(:name, :description) ]
  end
end
