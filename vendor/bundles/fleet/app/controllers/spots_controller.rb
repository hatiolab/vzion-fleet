class SpotsController < ResourceMultiUpdateController
  
private
  def resource_params
    [ params.require(:spot).permit(:name, :description,:address,:radius,:lat,:lng,:lat_hi,:lat_low,:lng_hi,:lng_low) ]
  end
end