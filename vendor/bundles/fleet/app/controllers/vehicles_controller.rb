class VehiclesController < ResourceMultiUpdateController

public
  #
  # GET vehicles/summary
  #
  def summary
    vehicle, today = Vehicle.find(params[:id]), Date.today
    vehicle_status = vehicle.vehicle_status
    vehicle_consumables = vehicle.vehicle_consumables
    vehicle_run_sum = VehicleRunSum.where("vehicle_id = ? and run_year = ? and run_month = ?", vehicle.id, today.year, today.month).first
    repair = Repair.where("vehicle_id = ?", vehicle.id).order("created_at desc").first
    item, result = {}, { :total => 1, :success => true }
    
    item[:vehicle] = {
      :id => vehicle.description,
      :name => vehicle.name,
      :description => vehicle.description,
      :birth_year => vehicle.birth_year,
      :vehicle_type => vehicle.classicfication,
      :manufacturer => vehicle.vendor,
      :image_clip => nil,
      :fuel_type => vehicle.fuel_type,
      :remaining_fuel => vehicle_status.remain_fuel,
      :total_run_time => vehicle_status.total_runtime,
      :total_distance => vehicle_status.total_dist,
      :official_effcc => vehicle_status.official_effcc,
      :avg_effcc => vehicle_status.avg_effcc,
      :eco_index => vehicle_status.eco_index,
      :eco_run_rate => vehicle_status.eco_run_rate,
      :run_time_of_month => vehicle_run_sum ? vehicle_run_sum.run_time : 0,
      :eco_drv_time_of_month => vehicle_run_sum ? vehicle_run_sum.eco_drv_time : 0,
      :run_dist_of_month => vehicle_run_sum ? vehicle_run_sum.run_dist : 0,
      :consmpt_of_month => vehicle_run_sum ? vehicle_run_sum.consmpt : 0,
      :effcc_of_month => vehicle_run_sum ? vehicle_run_sum.effcc : 0,
      :co2_emss_of_month => vehicle_run_sum ? vehicle_run_sum.co2_emss : 0
    }
    
    item[:consumables] = vehicle_consumables.collect { |consumable| {:consumable_item => consumable.name, :health_rate => consumable.health_rate } }
    item[:maint] = { :next_repair_date => repair ? repair.next_repair_date : '', :repair_date => repair ? repair.repair_date : '' }
    result[:items] = item
        
    respond_to do |format|
      format.json { render :json => result }
      format.xml { render :xml => result }
    end
  end
  
  #
  # GET vehicles/:id/repairs
  #
  def repairs
    # TODO Pagination
    vehicle = Vehicle.find(params[:id])
    @collection = vehicle.repairs
    @total_count = @collection.size
  end
  
  #
  # POST vehicles/:id/update_vehicle_repairs
  #
  def update_vehicle_repairs
    delete_list, update_list, create_list = refine_multiple_data(params[:multiple_data], 'id')
    Repair.transaction do
      # 1. delete
      self.destroy_multiple_data(Repair, delete_list)
      # 2. update
      self.update_multiple_data(Repair, update_list, 'id', [], {})
      # 3. create
      self.create_multiple_data(Repair, create_list, false, 'id', [], {})
    end

    # TODO Pagination
    vehicle = Vehicle.find(params[:id])
    @collection = vehicle.repairs
    @total_count = @collection.size
    
    respond_with(resource) do |format|
      format.xml  { render 'repairs' }
      format.json { render 'repairs' }
    end
  end
  
private
  def resource_params
    [ params.require(:vehicle).permit(:name,:description,:model,:vendor,:classicfication,:fuel_type,:ownership,:birth_year,:seat_size) ]
  end
end
