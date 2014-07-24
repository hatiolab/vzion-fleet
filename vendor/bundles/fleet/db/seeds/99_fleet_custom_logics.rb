#encoding: utf-8 

fleet_simulation = DiyService.create!(:name => 'FleetSimulation', :description => 'Vehicle Checkin & Trace Simulation', :script_type => 'DSL', :active_flag => true, :atomic_flag => true)
fleet_simulation.service_logic = <<-END
vehicles = Vehicle.all
today = Time.now.strftime("%Y-%m-%d")

lat = [
  37.420367, 37.419796, 37.419367, 37.418781, 37.418768, 37.416783, 37.416842, 37.418146, 37.418751, 
  37.418751, 37.425476, 37.427896, 37.429992, 37.433204, 37.438707, 37.441927, 37.446433, 37.450096, 
  37.453699, 37.457855, 37.462300, 37.466064, 37.470799, 37.470637, 37.470092, 37.470049, 37.470232, 
  37.471246, 37.471297, 37.473065, 37.475777, 37.478749, 37.481580, 37.482516, 37.483278, 37.484368, 
  37.485981, 37.487701, 37.489625, 37.491396, 37.492958, 37.494537, 37.496129, 37.497597, 37.498755, 
  37.499950, 37.501121, 37.502189, 37.504632, 37.508657, 37.510813, 37.513179, 37.516787, 37.518634, 
  37.520327, 37.521578, 37.522931, 37.523978, 37.526641, 37.528598, 37.530367, 37.531371, 37.532018, 
  37.533724, 37.535301, 37.535892, 37.537504, 37.538466, 37.538691, 37.539558, 37.540145, 37.540315, 
  37.540460, 37.541226, 37.541322, 37.543903, 37.543996, 37.544096, 37.544211, 37.544802, 37.545227, 
  37.545796, 37.546101, 37.546103, 37.546062, 37.545811, 37.545594, 37.545236, 37.544938, 37.545134, 
  37.549532, 37.550034, 37.552364, 37.553411, 37.554550, 37.556405, 37.558573, 37.559637, 37.559934, 
  37.559296, 37.559798, 37.561116, 37.561994, 37.564639, 37.564052, 37.561534, 37.561074, 37.566364, 
  37.566075, 37.566032, 37.566236
]

lng = [
  127.125707, 127.125664, 127.125681, 127.125672, 127.127142, 127.127154, 127.128763, 127.128855, 
  127.128860, 127.128860, 127.128971, 127.129389, 127.129432, 127.129035, 127.127995, 127.127394, 
  127.126847, 127.126707, 127.126589, 127.125967, 127.126053, 127.126396, 127.126857, 127.126192, 
  127.124916, 127.124282, 127.123875, 127.123027, 127.122893, 127.121575, 127.119568, 127.117390, 
  127.115255, 127.113920, 127.111125, 127.109660, 127.108405, 127.107037, 127.105492, 127.103357, 
  127.100117, 127.096314, 127.091534, 127.087232, 127.083873, 127.080279, 127.075140, 127.071213, 
  127.068805, 127.068048, 127.067695, 127.067288, 127.066708, 127.066118, 127.064659, 127.063350, 
  127.063028, 127.063329, 127.064563, 127.065453, 127.066268, 127.065839, 127.064959, 127.059299, 
  127.053022, 127.050893, 127.045174, 127.041644, 127.040919, 127.040029, 127.039267, 127.038494, 
  127.037604, 127.035898, 127.035689, 127.036153, 127.035842, 127.035735, 127.035415, 127.033650, 
  127.032379, 127.030795, 127.029679, 127.029154, 127.028802, 127.028105, 127.027523, 127.026085, 
  127.024755, 127.024519, 127.026085, 127.026042, 127.025163, 127.021912, 127.019981, 127.019906, 
  127.018811, 127.018758, 127.017792, 127.016687, 127.014906, 127.011086, 127.010370, 127.010274, 
  127.006562, 126.995479, 126.993247, 126.992636, 126.983570, 126.979171, 126.978613
]

VehicleTrace.transaction do
  vehicles.each do |vehicle|
    VehicleTrace.moveVehicle(vehicle, lat, lng)
    VehicleCheckin.randomGenCheckinData(vehicle, today)
  end
end

[ {:success => true, :msg => :ok } ]
END

fleet_simulation.save!

fleet_summary = DiyService.create!(:name => 'FleetSummary', :description => 'Daily Summaries', :script_type => 'DSL', :active_flag => true, :atomic_flag => true)
fleet_summary.service_logic = <<-END
# 소모품 건강 상태 업데이트 
consumables = VehicleConsumable.all
consumables.each do |consumable|
    consumable.update_status
end

# 차량 상태 업데이트 
vehicle_statuses = VehicleStatus.all
vehicle_statuses.each do |vehicle_status|
    vehicle_status.update_health
end

today = Date.today
year, month = today.year, today.month
from_date, to_date = today.at_beginning_of_month.strftime('%Y-%m-%d'), today.at_end_of_month.strftime('%Y-%m-%d')

sql = "
    SELECT
        VEHICLE_ID,
        SUM(RUN_TIME) RUN_TIME, SUM(RUN_DIST) RUN_DIST, SUM(IDLE_TIME) IDLE_TIME, 
        SUM(ECO_DRV_TIME) ECO_DRV_TIME, AVG(AVG_SPEED) AVG_SPEED, MAX(MAX_SPEED),
        SUM(FUEL_CONSMPT) FUEL_CONSMPT, AVG(FUEL_EFFCC) FUEL_EFFCC, 
        SUM(SUD_ACCEL_CNT) SUD_ACCEL_CNT, SUM(SUD_BRAKE_CNT) SUD_BRAKE_CNT,
        SUM(OVR_SPD_TIME) OVR_SPD_TIME, SUM(CO2_EMSS) CO2_EMSS, 
        SUM(SPD_LT_10) SPD_LT_10, SUM(SPD_LT_20) SPD_LT_20, 
        SUM(SPD_LT_30) SPD_LT_30, SUM(SPD_LT_40) SPD_LT_40, 
        SUM(SPD_LT_50) SPD_LT_50, SUM(SPD_LT_60) SPD_LT_60,
        SUM(SPD_LT_70) SPD_LT_70, SUM(SPD_LT_80) SPD_LT_80, 
        SUM(SPD_LT_90) SPD_LT_90, SUM(SPD_LT_100) SPD_LT_100, 
        SUM(SPD_LT_110) SPD_LT_110, SUM(SPD_LT_120) SPD_LT_120, 
        SUM(SPD_LT_130) SPD_LT_130, SUM(SPD_LT_140) SPD_LT_140, 
        SUM(SPD_LT_150) SPD_LT_150, SUM(SPD_LT_160) SPD_LT_160
    FROM
        VEHICLE_CHECKINS
    WHERE
        RUN_DATE >= '\#{from_date}' AND RUN_DATE <= '\#{to_date}'
    GROUP BY
        VEHICLE_ID
    ORDER BY
        VEHICLE_ID"

checkin_summaries = VehicleCheckin.connection.select_all(sql)

# Vehicle & Driver Summary By Checkin Data
checkin_summaries.each do |checkin|
    vehicle_id = checkin['vehicle_id']
    vehicle = Vehicle.find(vehicle_id)
    
    vehicle_run_sum = VehicleRunSum.where("vehicle_id = ? and run_year = ? and run_month = ?", vehicle_id, year, month).first
    vehicle_run_sum = VehicleRunSum.new(vehicle_id: vehicle_id, run_year: year, run_month: month, run_day: today, run_date: today) unless vehicle_run_sum
    
    vehicle_run_sum.run_time = checkin['run_time'].to_i
    vehicle_run_sum.run_dist = checkin['run_dist'].to_i
    vehicle_run_sum.consmpt = checkin['fuel_consmpt'].to_i
    vehicle_run_sum.co2_emss = checkin['co2_emss'].to_f
    vehicle_run_sum.effcc = (vehicle_run_sum.run_dist.to_f / vehicle_run_sum.consmpt.to_f)
    vehicle_run_sum.eco_index = (vehicle_run_sum.effcc.to_f / vehicle.vehicle_status.official_effcc.to_f).to_i * 100
    vehicle_run_sum.sud_accel_cnt = checkin['sud_accel_cnt'].to_i
    vehicle_run_sum.sud_brake_cnt = checkin['sud_brake_cnt'].to_i
    vehicle_run_sum.eco_drv_time = checkin['eco_drv_time'].to_i
    vehicle_run_sum.ovr_spd_time = checkin['eco_drv_time'].to_i
    vehicle_run_sum.idle_time = checkin['idle_time'].to_i
    vehicle_run_sum.save!
    
    vehicle_spd_sum = VehicleSpeedSum.where("vehicle_id = ? and run_year = ? and run_month = ?", vehicle_id, year, month).first
    vehicle_spd_sum = VehicleSpeedSum.new(vehicle_id: vehicle_id, run_year: year, run_month: month, run_day: today, run_date: today) unless vehicle_spd_sum
    vehicle_spd_sum.spd_lt_10  = checkin['spd_lt_10'].to_i
    vehicle_spd_sum.spd_lt_20  = checkin['spd_lt_20'].to_i
    vehicle_spd_sum.spd_lt_30  = checkin['spd_lt_30'].to_i
    vehicle_spd_sum.spd_lt_40  = checkin['spd_lt_40'].to_i
    vehicle_spd_sum.spd_lt_50  = checkin['spd_lt_50'].to_i
    vehicle_spd_sum.spd_lt_60  = checkin['spd_lt_60'].to_i
    vehicle_spd_sum.spd_lt_70  = checkin['spd_lt_70'].to_i
    vehicle_spd_sum.spd_lt_80  = checkin['spd_lt_80'].to_i
    vehicle_spd_sum.spd_lt_90  = checkin['spd_lt_90'].to_i
    vehicle_spd_sum.spd_lt_100 = checkin['spd_lt_100'].to_i
    vehicle_spd_sum.spd_lt_110 = checkin['spd_lt_110'].to_i
    vehicle_spd_sum.spd_lt_120 = checkin['spd_lt_120'].to_i
    vehicle_spd_sum.spd_lt_130 = checkin['spd_lt_130'].to_i
    vehicle_spd_sum.spd_lt_140 = checkin['spd_lt_140'].to_i
    vehicle_spd_sum.spd_lt_150 = checkin['spd_lt_150'].to_i
    vehicle_spd_sum.spd_lt_160 = checkin['spd_lt_160'].to_i
    vehicle_spd_sum.save!
	
	# TODO Driver Summary
end

[ {:success => true, :msg => :success} ]
END

fleet_summary.save!
