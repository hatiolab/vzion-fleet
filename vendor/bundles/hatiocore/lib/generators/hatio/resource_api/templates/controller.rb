class <%= class_name.pluralize %>Controller < ResourceMultiUpdateController
  
private
  def resource_params
    [ params.require(:<%= singular_name %>).permit(:name, :description) ]
  end
end
