class DriverRunSumsController < ResourceMultiUpdateController
  
private
  def resource_params
    [ params.require(:driver_run_sum).permit(:run_year,:run_month,:run_time,:run_dist,:consmpt,:co2_emss,:effcc,:eco_index,:sud_accel_cnt,:sud_brake_cnt,:eco_drv_time,:ovr_spd_time,:idle_time,:inc_cnt) ]
  end
end
