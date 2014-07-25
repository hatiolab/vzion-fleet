class ConsumablesController < ResourceMultiUpdateController
  
private
  def resource_params
    [ params.require(:consumable).permit(:name,:description,:unit,:init_repl_mile,:init_repl_duration,:repl_mile,:repl_duration) ]
  end
end
