class DriverGroupsController < ResourceMultiUpdateController
  
public
  #
  # GET driver_groups/:id/drivers
  #
  def drivers
    driver_group = DriverGroup.find(params[:id])
    @collection = driver_group.drivers
    @total_count = @collection.size
  end
  
  #
  # POST driver_groups/:id/update_groups_drivers
  #
  def update_groups_drivers
    driver_group_id = params[:id]
    data_list = JSON.parse(params[:multiple_data])

    GroupsDrivers.transaction do
      data_list.each do |data|
        driver_id = data["driver"]["id"]
        
        if("c" == data["_cud_flag_"])
          GroupsDrivers.create!({:driver_group_id => driver_group_id, :driver_id => driver_id})
        elsif("d" == data["_cud_flag_"])
          gd = GroupsDrivers.where("driver_group_id = ? and driver_id = ?", driver_group_id, driver_id).first
          gd.destroy!
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
    [ params.require(:driver_group).permit(:name, :description) ]
  end
end
