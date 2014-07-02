class DriversController < ResourceMultiUpdateController
  
  private
  def resource_params
    [ params.require(:driver).permit(:name, :description) ]
  end
end
