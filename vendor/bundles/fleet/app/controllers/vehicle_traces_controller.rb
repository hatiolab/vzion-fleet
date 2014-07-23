class VehicleTracesController < ResourceMultiUpdateController
  
private
  def resource_params
    [ params.require(:vehicle_trace).permit(:terminal_id,:vehicle_id,:driver_id,:lng,:lat,:velocity,:trace_time) ]
  end
end
