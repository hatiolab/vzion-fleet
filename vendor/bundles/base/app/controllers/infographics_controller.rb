class InfographicsController < ResourceMultiUpdateController

  def show_by_entity
    entity, clazz = Entity.find_by_name(params[:entity_type]), eval(params[:entity_type])
        
    if empty_param?(params, :entity_id)
      @infographic, @on = entity.list_infographic, clazz
    else
      @infographic, @on = entity.item_infographic, clazz.find(params[:entity_id])
    end
    
    if @infographic.nil?
      raise Exception.new('Infographic is not configured for requested entity yet.')
    else
      render :show_diagram
    end
  end

  private
    def resource_params
      [ params.require(:infographic).permit(:name, :description, :infographic_type, :printer_type, :diagram, :print_command) ]
    end
end
