class WelcomeController < ApplicationController
  
  layout false
  
  def index
    if current_user.operator_flag
      redirect_to :action => GlobalConfig.ops_page_url
    else
      redirect_to :action => GlobalConfig.std_page_url
    end
  end
  
  def std
    if current_user.operator_flag
      redirect_to :action => GlobalConfig.ops_page_url
    else
      render :layout => false
    end
  end
  
end
