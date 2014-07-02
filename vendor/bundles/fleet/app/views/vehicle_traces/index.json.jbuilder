json.items do |json|
	json.array!(@collection) do |vehicle_trace|
		json.(vehicle_trace, :id,:terminal_id,:vehicle_id,:driver_id,:lng,:lat,:velocity,:trace_time)
		
		json.terminal do
			json.id vehicle_trace.terminal_id
			json.name vehicle_trace.terminal ? vehicle_trace.terminal.name : ''
			json.description vehicle_trace.terminal ? vehicle_trace.terminal.description : ''
		end

		json.vehicle do
			json.id vehicle_trace.vehicle_id
			json.name vehicle_trace.vehicle ? vehicle_trace.vehicle.name : ''
			json.description vehicle_trace.vehicle ? vehicle_trace.vehicle.description : ''
		end

		json.driver do
			json.id vehicle_trace.driver_id
			json.name vehicle_trace.driver ? vehicle_trace.driver.name : ''
			json.description vehicle_trace.driver ? vehicle_trace.driver.description : ''
		end
	end
end
json.total @total_count
json.success true
