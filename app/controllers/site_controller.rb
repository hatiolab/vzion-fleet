class SiteController < ApplicationController

  skip_before_filter :authenticate_user!, :set_current_user
  skip_around_filter :scope_current_domain

  # layout :site
  
  # def main
  # end
  
  # def ops
  #   render :layout => false
  # end
  # 
  # def cfinstall
  #   render :layout => false
  # end
  #     
  # def barcode
  #   render :layout => false
  # end
  # 
  # def barcode_label_modeler
  #   render :layout => false
  # end
  # 
  # def spc_chart
  #   render :layout => false
  # end
  
  def contact
    
    ContactMailer.contact_email(params).deliver

    begin
      flash[:notice] = "Successfully..."
    rescue
      flash[:notice] = "failed ..."
    end
  end
  
end
