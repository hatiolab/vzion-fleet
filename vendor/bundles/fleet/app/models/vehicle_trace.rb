class VehicleTrace < ActiveRecord::Base

  include Multitenant
  
	belongs_to :terminal
	belongs_to :vehicle
	belongs_to :driver
  
  after_create do
    if(self.vehicle)
      # Spot alarm
      # TODO 이 부분은 속도 문제가 될 수 있으므로 background로 처리하도록 던져주고 끝나는 것으로 추후 변경
      lat_hist = self.changes['lat']
      lng_hist = self.changes['lng']
      
      prev_vehicle_lat = lat_hist[0].nil? ? 0 : lat_hist[0]
      current_vehicle_lat = lat_hist[1].nil? ? 0 : lat_hist[1]
      
      prev_vehicle_lng = lng_hist[0].nil? ? 0 : lng_hist[0]
      current_vehicle_lng = lng_hist[1].nil? ? 0 : lng_hist[1]
      
      vehicle_status = self.vehicle.vehicle_status
      vehicle_status.lat = self.lat
      vehicle_status.lng = self.lng
      vehicle_status.status = VehicleStatus::STATUS_RUN
      vehicle_status.save!
      
      alarms = self.check_spot_based_alarm(self.vehicle.id, prev_vehicle_lat, current_vehicle_lat, prev_vehicle_lng, current_vehicle_lng)
      alarms.each do |alar|
        alarm['vehicle'] = self.vehicle
        begin
          SpotAlarmMailer.spot(alarm).deliver
        rescue
          logger.error "Failed to sending mail!"
        end
      end unless(alarms.empty?)
    end
    
    if(self.driver && self.driver.driver_status && DriverStatus::STATUS_RUN != self.driver.driver_status.status)
      driver_status = self.driver.driver_status
      driver_status.status = DriverStatus::STATUS_RUN
      driver_status.save!
    end
  end
  
  def check_spot_based_alarm(vehicle_id, prev_vehicle_lat, current_vehicle_lat, prev_vehicle_lng, current_vehicle_lng)
    sql = "
    select
      alarm_name,
      loc_name,
      event_type
    from (
        select
          a.name as alarm_name,
          l.name as loc_name,
          case
          when
            (a.evt_trg ='In' or a.evt_trg = 'In-Out') and
            (l.lat_low <= '#{current_vehicle_lat}' and l.lat_hi >= '#{current_vehicle_lat}' and l.lng_low <= '#{current_vehicle_lng}' and l.lng_hi >= '#{current_vehicle_lng}') and
            not (l.lat_low <= '#{prev_vehicle_lat}' and l.lat_hi >= '#{prev_vehicle_lat}' and l.lng_low <= '#{prev_vehicle_lng}' and l.lng_hi >= '#{prev_vehicle_lng}')
          then
            'in'
          when
            (a.evt_trg = 'Out' or a.evt_trg = 'In-Out') and
            not (l.lat_low <= '#{current_vehicle_lat}' and l.lat_hi >= '#{current_vehicle_lat}' and l.lng_low <= '#{current_vehicle_lng}' and l.lng_hi >= '#{current_vehicle_lng}') and
            (l.lat_low <= '#{prev_vehicle_lat}' and l.lat_hi >= '#{prev_vehicle_lat}' and l.lng_low <= '#{prev_vehicle_lng}' and l.lng_hi >= '#{prev_vehicle_lng}')
          then
            'out'
          else
            'no'
          end as event_type
      from
          spot_alarms a,
          spot_alarm_vehicles avr,
          spots l
        where
          avr.vehicle_id = '#{vehicle_id}'
    )tbl
  where
      tbl.event_type != 'no'"
    
      VehicleTrace.connection.select_all(sql)
  end

end
