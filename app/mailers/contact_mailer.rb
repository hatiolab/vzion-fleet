class ContactMailer < ActionMailer::Base
  default from: "contact@vzionsys.com", to: "contact@vzionsys.com"
  
  def contact_email(contact)
    @contact = contact

    mail(subject: "Contact Notification : #{@contact[:name]} (#{@contact[:email]})")
  end

end
