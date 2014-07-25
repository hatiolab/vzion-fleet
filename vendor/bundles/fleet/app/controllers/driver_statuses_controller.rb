class DriverStatusesController < ResourceMultiUpdateController
  
private
  def resource_params
    [ params.require(:driver_status).permit(:status,:total_dist,:total_runtime,:avg_effcc,:eco_index,:eco_run_rate) ]
  end
end
