class LocationsController < ResourceMultiUpdateController
  
private
  def resource_params
    [ params.require(:location).permit(:name, :description) ]
  end
end
