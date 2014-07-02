class VehicleStatusesController < ResourceMultiUpdateController
  
private
  def resource_params
    [ params.require(:vehicle_status).permit(:vehicle_id) ]
  end
end
