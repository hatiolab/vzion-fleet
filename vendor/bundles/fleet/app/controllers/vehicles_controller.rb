class VehiclesController < ResourceMultiUpdateController

public
  #
  # GET vehicles/:id/repairs
  #
  def repairs
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
  
    respond_to do |format|
      format.xml { render :xml => {:success => true, :msg => :success} } 
      format.json { render :json => {:success => true, :msg => :success} }
    end
  end
  
private
  def resource_params
    [ params.require(:vehicle).permit(:name, :description) ]
  end
end
