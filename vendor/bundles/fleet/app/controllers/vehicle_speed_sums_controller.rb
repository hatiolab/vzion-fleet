class VehicleSpeedSumsController < ResourceMultiUpdateController
  
private
  def resource_params
    [ params.require(:vehicle_speed_sum).permit(:name, :description) ]
  end
end
