class DiySelectionsController < ResourceMultiUpdateController
  
  #
  # POST diy_selections/:diy_selection_id/update_multiple_parameters.json
  #
  def update_multiple_parameters
    @diySelection = DiySelection.find(params[:id])
    parameterType = params[:type]
    parameterClass = (parameterType == 'in') ? ServiceInParam : ServiceOutParam
    update_parameters(@diySelection, parameterClass)
    @service_params = (parameterType == 'in') ? @diySelection.service_in_params : @diySelection.service_out_params
  end
  
  #
  # GET diy_selections/diy_selection_name/shoot
  # 
  def query
    shoot
  end
  
  #
  # POST diy_selections/diy_selection_name/shoot
  # 
  def shoot
    @diy_selection = DiySelection.find_by_name(params[:id])
    raise Hatio::Exception::ResourceNotFound, "Not Found CustomSelection Named '#{params[:id]}'" unless(@diy_selection)

    params[:input] ||= params
    params[:input][:domain_id] = params[:domain_id] if params[:input][:domain_id].blank?
    @result_list = @diy_selection.execute_logic(params[:input])
    
    if('xls' == params[:format])
      @out_params = @diy_selection.service_out_params
      if(@result_list.class.name == 'Hash')
        if(@result_list.key?("items"))
          @result_list = @result_list["items"] 
        elsif(@result_list.key?(:items))
          @result_list = @result_list[:items]
        end
      end
    end
    
    respond_to do |format|
      format.xml { render :xml => @result_list } 
      format.json { render :json => @result_list }
      format.xls
    end
  end
  
  #
  # 클라이언트 화면에서 보내주는대로 엑셀 출력
  #
  def export_screen
    @collection = JSON.parse(params[:xlsGridInfo])
    diy_selection = DiySelection.find_by_name(params[:id])
    @export_columns = diy_selection.service_out_params
    @collection.shift
    
    respond_to do |format|
      format.xml { render :xml => @collection } 
      format.json { render :json => @collection }
      format.xls
    end
  end 
  
private
  def resource_params
    [ params.require(:diy_selection).permit(:name,:description,:script_type,:service_logic) ]
  end
  
  def multi_update_attrs_to_rem
    ['service_in_params', 'service_out_params']
  end
  
  def multi_create_attrs_to_rem
    ['service_in_params', 'service_out_params']
  end
  
  def update_parameters(diySelection, parameterClass)
    delete_list, update_list, create_list = refine_multiple_data(params[:multiple_data], 'id')
    parameterClass.transaction do
      # 1. delete
      destroy_multiple_data(parameterClass, delete_list)
      # 2. update
      update_multiple_data(parameterClass, update_list, 'id', [], {})
      # 3. create
      create_multiple_data(parameterClass, create_list, false, 'id', [], {})
    end
  end  

end
