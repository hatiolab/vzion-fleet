class RepairsController < ResourceMultiUpdateController
  
private
  def resource_params
    [ params.require(:repair).permit(:vehicle_id, :next_repair_date, :repair_date, :repair_man, :repair_mileage, :repair_shop, :repair_time, :cost, :content, :comment, :oos) ]
  end
end
