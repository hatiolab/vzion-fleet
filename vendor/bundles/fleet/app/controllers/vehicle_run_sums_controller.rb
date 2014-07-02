class VehicleRunSumsController < ResourceMultiUpdateController
  
private
  def resource_params
    [ params.require(:vehicle_run_sum).permit(:name, :description) ]
  end
end
