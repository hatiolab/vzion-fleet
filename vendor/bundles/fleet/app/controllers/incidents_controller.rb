class IncidentsController < ResourceMultiUpdateController
  
public
  #
  # GET incidents/incident_logs
  #
  def incident_logs
    @collection = IncidentLog.where("incident_id = ?", params[:id])
    @total_coount = @collection.size
  end

private
  def resource_params
    [ params.require(:incident).permit(:terminal_id, :vehicle_id, :driver_id, :impulse_x, :impulse_y, :impulse_z, :impulse_abs, :impulse_threshold, :engine_temp, :engine_temp_threshold, :obd_connected, :confirm, :velocity, :lat, :lng, :video_clip) ]
  end
end
