json.items do |json|
	json.array!(@collection) do |location_alarm|
		json.(location_alarm, :id,:domain_id,:name,:transfer_type,:evt_type,:evt_name,:evt_trg,:always,:enabled,:from_date,:to_date,:creator_id,:updater_id,:created_at,:updated_at)
		end
end
json.total @total_count
json.success true
