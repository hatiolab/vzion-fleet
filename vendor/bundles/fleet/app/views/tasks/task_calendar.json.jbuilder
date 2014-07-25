json.items do |json|
	json.array!(@task_list) do |event|
		json.(event, :ad, :cid, :cnt, :end, :id, :start, :title)
	end
end
json.total @total_count
json.success true