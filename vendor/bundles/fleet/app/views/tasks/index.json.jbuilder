json.items do |json|
	json.array!(@collection) do |task|
		json.(task, :id,:domain_id,:title,:start_date,:end_date,:all_day,:category,:reminder,:notes,:loc,:rrule,:creator_id,:updater_id,:created_at,:updated_at)
		end
end
json.total @total_count
json.success true
