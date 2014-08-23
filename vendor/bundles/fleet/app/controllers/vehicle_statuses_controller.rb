class VehicleStatusesController < ResourceMultiUpdateController
  
public
  
  #
  # GET vehicle_statuses/locations
  #
  def locations
    vehicle_statuses = VehicleStatus.all
    items = VehicleStatus.all.collect do |vs|
      vehicle = vs.vehicle
      {
        :id => vs.vehicle_id,
        :name => vehicle.name,
        :description => vehicle.description,
        :status => vs.status,
        :driver_id => vs.driver_id,
        :lat => vs.lat,
        :lng => vs.lng,
        :image_clip => ''
      }
    end
    
    result = {
      :total => items.size,
      :success => true,
      :items => items
    }
    
    respond_to do |format|
      format.json { render :json => result }
      format.xml { render :xml => result }
    end
  end
  
private
  def resource_params
    [ params.require(:vehicle_status).permit(:vehicle_id,:driver_id,:terminal_id,:status,:health_status,:total_dist,:total_runtime,:remain_fuel,:official_effcc,:avg_effcc,:eco_index,:eco_run_rate,:lat,:lng) ]
  end
end
