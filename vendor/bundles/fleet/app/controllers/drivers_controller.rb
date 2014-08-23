class DriversController < ResourceMultiUpdateController
  
public
  #
  # GET drivers/summary
  #
  def summary
    driver, today = Driver.find(params[:id]), Date.today
    driver_status = driver.driver_status
    driver_run_sum = DriverRunSum.where("driver_id = ? and run_year = ? and run_month = ?", driver.id, today.year, today.month).first
    result = {
      :id => driver.description,
      :name => driver.name,
      :description => driver.description,
      :division => driver.division,
      :title => driver.title,
      :social_id => driver.social_id,
      :phone_no => driver.phone_no,
      :image_clip => nil,
      :total_runtime => driver_status.total_runtime,
      :total_dist => driver_status.total_dist,
      :avg_effcc => driver_status.avg_effcc,
      :eco_index => driver_status.eco_index,
      :eco_run_rate => driver_status.eco_run_rate,
      :run_time_of_month => driver_run_sum ? driver_run_sum.run_time : 0,
      :eco_drv_time_of_month => driver_run_sum ? driver_run_sum.eco_drv_time : 0,
      :run_dist_of_month => driver_run_sum ? driver_run_sum.run_dist : 0,
      :consmpt_of_month => driver_run_sum ? driver_run_sum.consmpt : 0,
      :effcc_of_month => driver_run_sum ? driver_run_sum.effcc : 0,
    }
  
    respond_to do |format|
      format.json { render :json => result }
      format.xml { render :xml => result }
    end
  end
    
private

  def resource_params
    [ params.require(:driver).permit(:name,:description,:social_id,:division,:title,:phone_no,:mobile_no) ]
  end
end
