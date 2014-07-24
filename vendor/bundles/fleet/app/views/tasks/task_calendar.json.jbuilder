json.items do |json|
	json.array!(@task_list) do |event|
		json.(event, :start_date, :end_date, :all_day, :category, :reminder, :notes, :loc, :rrule)
	end
end
json.total @total_count
json.success true