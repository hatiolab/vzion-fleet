class ErrorsController < ApplicationController
  
  layout false
  
  def show
    @exception = env["action_dispatch.exception"]

    # Routing에 실패한 404 에러인 경우는 ApplicationController를 통하지 않기 때문에, format이 분석되지 않는다.
    # 따라서, 이 경우는 text/html 형태로만 응답된다.
    logger.error @exception.message
    logger.error @exception.backtrace.join("\n")
    
    respond_to do |format|
      format.html { render action: request.path[1..-1], status: request.path[1..-1] }
      format.json {
        render :json => {
          :errors => [@exception.message],
          :throwable => {
            :type => @exception.class.name,
            :message => @exception.message,
            :stacktrace => @exception.backtrace.join("\n")
          },
          :request => {
            :uri => env["REQUEST_URI"],
            :params => params
          }
        }, :status => request.path[1..-1]
      }
    end
  end

end
