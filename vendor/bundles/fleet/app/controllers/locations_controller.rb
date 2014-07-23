class LocationsController < ResourceMultiUpdateController
  
private
  def resource_params
    [ params.require(:location).permit(:name, :description,:address,:radius,:lat,:lng,:lat_hi,:lat_low,:lng_hi,:lng_low) ]
  end
end