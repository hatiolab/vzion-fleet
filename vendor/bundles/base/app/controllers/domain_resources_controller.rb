class DomainResourcesController < InheritedResources::Base
    
  public
  
  def index
    conditions, include_arr, order_str, limit, offset = search_filter resource_class
    @total_count = collection.where(conditions).count
    @collection = collection.includes(include_arr).where(conditions).order(order_str).limit(limit).offset(offset)
  end
  
  def show_by_name
    name = params[:name]
    set_resource_ivar(resource_class.find_by(name: name))

    respond_with(resource) do |format|
      format.xml  { render 'show' }
      format.json { render 'show' }
    end
  end
  
  def show
    show!
  end
  
  def create
    create!
  end
  
  def update
    update!
  end
  
  def destroy
    destroy!
  end
  
  def import
    resource_class.importable(current_domain, resource_class, params[:file])
    
    respond_to do |format|
      format.xml  { render :xml => {:success => true, :msg => :success} }
      format.json { render :json => {:success => true, :msg => :success} }
    end
  end
  
  def export
    entity = Entity.find_by_name(resource_class.to_s)
    raise Hatio::Exception::MisConfigured, (I18n.translate 'errors.messages.x_not_found', :x => 'Entity') + '(' + resource_class.to_s + ')' unless entity    
    conditions, include_arr, order_str, limit, offset = search_filter resource_class
    list = collection.includes(include_arr).where(conditions).order(order_str)
    @export_columns = EntityColumn.where("entity_id = ? and list_rank > 0 and name not in ('creator_id', 'updater_id', 'created_at', 'updated_at')", entity.id).order("list_rank asc")
    
    @collection = list.collect do |data|
      result = {}
      @export_columns.each do |column|
			  val = data[column.name]
			  if(column.ref_type == 'Entity')
				  ref_name = column.ref_name
				  val = data.send column.name.sub('_id', '')
				  val = val.name if val
			  elsif(column.ref_type == 'CommonCode')
				  ref_name = column.ref_name
				  code_master = CommonCode.find_by_name(ref_name)
				  code = code_master.codes.find { |c| c.name == val.to_s }
				  val = code.description if(code)
			  end
			  
			  if(column.column_type == 'boolean')
			    val = (val.to_s.downcase == 'true') ? 'Y' : 'N' 
			  elsif(column.column_type == 'date')
			    val = val.strftime(GlobalConfig.date_format) if(val)
		    elsif(column.column_type == 'datetime')
		      val = val.strftime(GlobalConfig.datetime_format) if(val)
		    end
		    
		    result[column.name] = val
      end
      result
    end
    
    respond_to do |format|
      format.json { render :json => @collection }
      format.xml { render :xml => @collection }
      format.xls
    end
  end
    
  #
  # 클라이언트 화면에서 보내주는대로 엑셀 출력 
  #
  def export_screen
    @collection = JSON.parse(params[:xlsGridInfo])
    # 배열의 첫번째는 컬럼 정보
    @export_columns = @collection.shift
    
    respond_to do |format|
      format.json { render :json => @collection }
      format.xml { render :xml => @collection }
      format.xls
    end    
  end
  
end