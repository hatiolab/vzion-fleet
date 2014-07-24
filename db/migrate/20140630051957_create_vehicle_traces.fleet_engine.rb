# This migration comes from fleet_engine (originally 20140630051811)
class CreateVehicleTraces < ActiveRecord::Migration

	def change
		create_table :vehicle_traces do |t|
			t.references :domain, :null => false
			t.references :terminal, :null => false
			t.references :vehicle
			t.references :driver
			t.float :lng, :default => 0
			t.float :lat, :default => 0
			t.float :velocity, :default => 0
			t.datetime :trace_time
		end

    add_index :vehicle_traces, [:terminal_id], :name => :ix_vehicle_trace_0
    add_index :vehicle_traces, [:vehicle_id], :name => :ix_vehicle_trace_1
    add_index :vehicle_traces, [:driver_id], :name => :ix_vehicle_trace_2
    add_index :vehicle_traces, [:domain_id, :trace_time], :name => :ix_vehicle_trace_3
	end

end
