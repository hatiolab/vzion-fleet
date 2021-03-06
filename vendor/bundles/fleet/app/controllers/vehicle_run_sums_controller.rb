class VehicleRunSumsController < ResourceMultiUpdateController
  
private
  def resource_params
    [ params.require(:vehicle_run_sum).permit(:vehicle_id,:run_year,:run_month,:run_time,:run_dist,:consmpt,:co2_emss,:effcc,:eco_index,:sud_accel_cnt,:sud_brake_cnt,:eco_drv_time,:ovr_spd_time,:idle_time,:inc_cnt,:oos_cnt,:mnt_cnt,:mnt_time) ]
  end
end
