class VehicleCheckinsController < ResourceMultiUpdateController
  
private
  def resource_params
    [ params.require(:vehicle_checkin).permit(:name, :description) ]
  end
end
