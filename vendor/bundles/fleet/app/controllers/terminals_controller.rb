class TerminalsController < ResourceMultiUpdateController
  
private
  def resource_params
    [ params.require(:terminal).permit(:name,:description,:purchase_date,:vehicle_id,:driver_id) ]
  end
end
