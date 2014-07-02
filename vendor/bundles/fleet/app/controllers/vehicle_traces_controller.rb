class VehicleTracesController < ResourceMultiUpdateController
  
private
  def resource_params
    [ params.require(:vehicle_trace).permit(:name, :description) ]
  end
end
