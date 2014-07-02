class ConsumablesController < ResourceMultiUpdateController
  
private
  def resource_params
    [ params.require(:consumable).permit(:name, :description) ]
  end
end
