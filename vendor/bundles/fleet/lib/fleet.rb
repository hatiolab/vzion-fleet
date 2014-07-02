require "fleet/version"
require "fleet/engine"
require "fleet/pluggable_spot"

# module Fleet
  # Your code goes here...
# end

Hatio::Bundle.new 'fleet', 1.0 do |bundle|
  bundle.dependencies = ['base']
  bundle.bootstrap_controllers = ['Fleet.controller.FleetController']
end