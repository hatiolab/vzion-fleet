class TasksController < ResourceMultiUpdateController
  
private
  def resource_params
    [ params.require(:task).permit(:title, :start_date, :end_date, :all_day, :category, :reminder, :notes, :loc, :rrule) ]
  end
  
public

  def task_calendar
    today, start_date, end_date = Date.today, nil, nil
    if(params[:start].blank? || params[:start].to_s == "0")
      start_date = today.beginning_of_month.beginning_of_week - 1
    else
      start_date = params[:start]
    end

    if(params[:end].blank? || params[:end].to_s == "0")
      end_date = today.end_of_month.end_of_week - 1
    else
      end_date = params[:end]
    end
      
    start_date = Date.strptime(start_date, '%m-%d-%Y') if(start_date.class.name == 'String')
    end_date = Date.strptime(end_date, '%m-%d-%Y') if(end_date.class.name == 'String')
    sql = Task.select("start_date, end_date, title, count(*) cnt").where("start_date between ? and ?", start_date, end_date).group("start_date, end_date, title").to_sql

    results, idx = Task.connection.select_all(sql), 0
    @task_list = results.collect do |result|
      idx += 1
      {
        :id => idx,
        :ad => true,
        :cid => '1', 
        :cnt => result['cnt'], 
        :end => result['end_date'] + " 23:59:59", 
        :start => result['start_date'] + " 00:00:00", 
        :title => result['title']
      }
    end
  
    @total_count = @task_list.size
  end

end
