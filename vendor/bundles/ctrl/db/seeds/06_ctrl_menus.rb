#encoding: utf-8 

Menu.setup :Monitor, {:rank => 10000, :category => 'TERMINAL'} do
  submenu :Monitor, {:rank => 11000, :category => 'TERMINAL', :template => 'Ctrl.view.monitor.Monitor'}
  submenu :Information, {:rank => 12000, :category => 'TERMINAL', :template => 'Ctrl.view.monitor.Information'}
  submenu :Incident, {:rank => 13000, :category => 'TERMINAL', :template => 'Ctrl.view.monitor.Incident'}
end