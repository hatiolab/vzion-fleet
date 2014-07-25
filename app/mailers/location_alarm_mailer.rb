class LocationAlarmMailer < ActionMailer::Base

  default from: "admin@hatiolab.com"

  def location(location_alarm)
    return if(!location_alarm)

    @location_alarm = location_alarm
    emails = get_mailing_list

    if(emails && !emails.empty?)
      mail(:to => emails, :subject => "Vzion-Fleet - Location Alarm") do |format|
        format.html
      end
    end
  end
  
  def get_mailing_list
    code = CommonCode.find_by_name("LOCATION_ALARM_MAILING")
    return nil if(!code)
    emails = code.description.split(';')
    emails
  end
end