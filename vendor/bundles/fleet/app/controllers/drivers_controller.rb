class DriversController < ResourceMultiUpdateController
  
  private
  def resource_params
    [ params.require(:driver).permit(:name,:description,:social_id,:division,:title,:phone_no,:mobile_no) ]
  end
end
