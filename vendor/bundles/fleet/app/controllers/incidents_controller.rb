class IncidentsController < ResourceMultiUpdateController
  
public
  #
  # GET incidents/:id/incident_logs
  #
  def incident_logs
    @collection = IncidentLog.where("incident_id = ?", params[:id])
    @total_coount = @collection.size
  end

private
  def resource_params
    [ params.require(:incident).permit(:incident_id, :vehicle_id, :terminal_id, :driver_id, :accel_x, :accel_y, :accel_z, :velocity, :lat, :lng, :video_clip) ]
  end
end
