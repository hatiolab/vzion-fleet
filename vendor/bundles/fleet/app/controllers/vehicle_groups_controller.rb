class VehicleGroupsController < ResourceMultiUpdateController
  
public
  #
  # GET vehicle_groups/:id/vehicles
  #
  def vehicles
    vehicle_group = VehicleGroup.find(params[:id])
    @collection = vehicle_group.vehicles
    @total_count = @collection.size
  end
  
  #
  # GET vehicle_groups/groups_vehicles
  #
  def groups_vehicles
    groups, items = VehicleGroup.all, []
    groups.each do |group|
      item = {
        :id => "#{group.id}",
        :name => "#{group.name} (#{group.description})",
        :description => "#{group.name} (#{group.description})",
      }
      item[:vehicles] = group.vehicles.collect { |vehicle| vehicle.id.to_s }
      items.push(item)
    end
    
    respond_to do |format|
      format.xml  { render :xml => {:items => items, :total => items.size, :success => true } }
      format.json { render :json => {:items => items, :total => items.size, :success => true } }
    end
  end
  
  #
  # POST vehicle_groups/:id/update_groups_vehicles
  #
  def update_groups_vehicles
    vehicle_group_id = params[:id]
    data_list = JSON.parse(params[:multiple_data])

    GroupsVehicles.transaction do
      data_list.each do |data|
        vehicle_id = data["vehicle"]["id"]
      
        if("c" == data["_cud_flag_"])
          GroupsVehicles.create!({:vehicle_group_id => vehicle_group_id, :vehicle_id => vehicle_id})
        elsif("d" == data["_cud_flag_"])
          gv = GroupsVehicles.where("vehicle_group_id = ? and vehicle_id = ?", vehicle_group_id, vehicle_id).first
          gv.destroy!
        end
      end
    end
  
    respond_to do |format|
      format.xml  { render :xml => { :success => true, :msg => :success } }
      format.json { render :json => { :success => true, :msg => :success } }
    end
  end
    
private
  def resource_params
    [ params.require(:vehicle_group).permit(:name, :description) ]
  end
end
