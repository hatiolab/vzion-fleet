class LocationAlarmsController < ResourceMultiUpdateController
  
public
  #
  # GET location_alarms/:id/location_alarm_vehicles
  #
  def location_alarm_vehicles
    # TODO Pagination
    location_alarm = LocationAlarm.find(params[:id])
    @collection = location_alarm.location_alarm_vehicles
    @total_count = @collection.size
  end

  #
  # POST location_alarms/:id/update_location_alarm_vehicles
  #
  def update_location_alarm_vehicles
    delete_list, update_list, create_list = refine_multiple_data(params[:multiple_data], 'id')
    LocationAlarmVehicle.transaction do
      # 1. delete
      self.destroy_multiple_data(LocationAlarmVehicle, delete_list)
      # 2. update
      self.update_multiple_data(LocationAlarmVehicle, update_list, 'id', [], {})
      # 3. create
      self.create_multiple_data(LocationAlarmVehicle, create_list, false, 'id', [], {})
    end

    # TODO Pagination
    location_alarm = LocationAlarm.find(params[:id])
    @collection = location_alarm.location_alarm_vehicles
    @total_count = @collection.size
  
    respond_with(resource) do |format|
      format.xml  { render 'location_alarm_vehicles' }
      format.json { render 'location_alarm_vehicles' }
    end
  end
    
private
  def resource_params
    [ params.require(:location_alarm).permit(:name,:transfer_type,:evt_type,:evt_name,:evt_trg,:always,:enabled,:from_date,:to_date) ]
  end
end
