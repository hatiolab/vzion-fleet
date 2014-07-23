class VehicleStatusesController < ResourceMultiUpdateController
  
private
  def resource_params
    [ params.require(:vehicle_status).permit(:vehicle_id,:driver_id,:terminal_id,:status,:health_status,:total_dist,:total_runtime,:remain_fuel,:official_effcc,:avg_effcc,:eco_index,:eco_run_rate,:lat,:lng) ]
  end
end
