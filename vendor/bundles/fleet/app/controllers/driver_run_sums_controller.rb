class DriverRunSumsController < ResourceMultiUpdateController
  
private
  def resource_params
    [ params.require(:driver_run_sum).permit(:name, :description) ]
  end
end
