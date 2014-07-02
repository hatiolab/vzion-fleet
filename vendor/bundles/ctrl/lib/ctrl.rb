require "ctrl/version"
require "ctrl/engine"
require "ctrl/pluggable_spot"

# module Ctrl
  # Your code goes here...
# end

Hatio::Bundle.new 'ctrl', 1.0 do |bundle|
  bundle.dependencies = ['base']
  bundle.bootstrap_controllers = ['Ctrl.controller.CtrlController']
end