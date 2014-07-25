json.(@vehicle_trace, :id,:terminal_id,:vehicle_id,:driver_id,:lng,:lat,:velocity,:trace_time)

json.terminal @vehicle_trace.terminal, :id, :name, :description if @vehicle_trace.terminal

json.vehicle @vehicle_trace.vehicle, :id, :name, :description if @vehicle_trace.vehicle

json.driver @vehicle_trace.driver, :id, :name, :description if @vehicle_trace.driver