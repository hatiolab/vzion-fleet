class TerminalsController < ResourceMultiUpdateController
  
private
  def resource_params
    [ params.require(:terminal).permit(:name, :description) ]
  end
end
