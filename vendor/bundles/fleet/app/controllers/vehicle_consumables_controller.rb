class VehicleConsumablesController < ResourceMultiUpdateController

public
  #
  # GET vehicle_consumables/:id/consumable_hists
  #
  def consumable_hists
    @collection = ConsumableHist.where("vehicle_consumable_id = ?", params[:id]).limit(30)
    @total_count = @collection.size
  end
  
  #
  # POST resources/transaction
  #
  def transaction
    call_type, result = 'model', nil
    
    if('instance' == params[:logic_type])
      resource = resource_class.find(params[:instance_id])
      result = resource.send(params[:tran_name], params)
    else
      result = resource_class.send(params[:tran_name], params);
    end
    
    respond_to do |format|
      format.xml  { render :xml => { :success => true, :msg => :success, :result => result } }
      format.json { render :json => { :success => true, :msg => :success, :result => result } }
    end
  end
  
private
  def resource_params
    [ params.require(:vehicle_consumable).permit(:vehicle_id,:name,:description,:status,:health_rate,:cycle_repl_mile,:cycle_repl_duration,:last_repl_date,:last_repl_mile,:next_repl_date,:next_repl_mile,:repl_unit,:cumulative_cost) ]
  end
end
