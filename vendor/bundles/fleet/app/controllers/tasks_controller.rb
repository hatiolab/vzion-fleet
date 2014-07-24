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
    sql = Task.select("start_date, count(*) cnt").where("start_date between ? and ?", start_date, end_date).group("start_date").to_sql

    results, idx = Task.connection.select_all(sql), 0
    @task_list = results.collect do |result|
      idx += 1
      {
        :id => idx,
        :domain_id => result['domain_id'],
        :title => result['title'],
        :start_date => result['start_date'],
        :end_date => result['end_date'],
        :all_day => result['all_day'],
        :category => result['category'],
        :reminder => result['reminder'],
        :notes => result['notes'],
        :loc => result['loc'],
        :rrule => result['rrule']
      }
    end
  
    @total_count = @task_list.size
  end

end
