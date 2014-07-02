class DriverSpeedSumsController < ResourceMultiUpdateController
  
private
  def resource_params
    [ params.require(:driver_speed_sum).permit(:name, :description) ]
  end
end
