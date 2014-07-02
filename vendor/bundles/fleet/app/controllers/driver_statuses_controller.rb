class DriverStatusesController < ResourceMultiUpdateController
  
private
  def resource_params
    [ params.require(:driver_status).permit(:name, :description) ]
  end
end
