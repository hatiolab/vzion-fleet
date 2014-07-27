class SpotAlarmsController < ResourceMultiUpdateController
  
public
  #
  # GET spot_alarms/:id/spot_alarm_vehicles
  #
  def spot_alarm_vehicles
    # TODO Pagination
    spot_alarm = SpotAlarm.find(params[:id])
    @collection = spot_alarm.spot_alarm_vehicles
    @total_count = @collection.size
  end

  #
  # POST spot_alarms/:id/update_spot_alarm_vehicles
  #
  def update_spot_alarm_vehicles
    delete_list, update_list, create_list = refine_multiple_data(params[:multiple_data], 'id')
    SpotAlarmVehicle.transaction do
      # 1. delete
      self.destroy_multiple_data(SpotAlarmVehicle, delete_list)
      # 2. update
      self.update_multiple_data(SpotAlarmVehicle, update_list, 'id', [], {})
      # 3. create
      self.create_multiple_data(SpotAlarmVehicle, create_list, false, 'id', [], {})
    end

    # TODO Pagination
    spot_alarm = SpotAlarm.find(params[:id])
    @collection = spot_alarm.spot_alarm_vehicles
    @total_count = @collection.size
  
    respond_with(resource) do |format|
      format.xml  { render 'spot_alarm_vehicles' }
      format.json { render 'spot_alarm_vehicles' }
    end
  end
    
private
  def resource_params
    [ params.require(:spot_alarm).permit(:name,:transfer_type,:evt_type,:evt_name,:evt_trg,:always,:enabled,:from_date,:to_date) ]
  end
end
