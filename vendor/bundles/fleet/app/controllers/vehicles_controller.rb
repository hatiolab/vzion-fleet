class VehiclesController < ResourceMultiUpdateController
  
private
  def resource_params
    [ params.require(:vehicle).permit(:name, :description) ]
  end
end
