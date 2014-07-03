#encoding: utf-8 

Menu.setup :System, {:rank => 9000} do
  submenu :SystemManagement, {:rank => 0, :menu_type => 'SEPARATOR'}
  submenu :Domain, {:rank => 10, :template => 'Base.view.domain.DomainItem'}
  submenu :Calendar, {:rank => 20, :template => 'Base.view.calendar.Calendar'}
  submenu :User, {:rank => 30, :template => 'Base.view.user.User'}
  submenu :Role, {:rank => 40, :template => 'Base.view.role.Role'}
  submenu :CommonCode, {:rank => 50, :template => 'Base.view.common_code.CommonCode'}
  submenu :Menu, {:rank => 60, :template => 'Base.view.menu.Menu'}
  submenu :Entity, {:rank => 70, :template => 'Base.view.entity.Entity'}
  submenu :Customizable, {:rank => 80, :menu_type => 'SEPARATOR'}
  submenu :DiyService, {:rank => 90, :template => 'Base.view.diy_service.DiyService'}
  submenu :DiySelection, {:rank => 100, :template => 'Base.view.diy_selection.DiySelection'}
  submenu :DiyReport, {:rank => 110, :template => 'Base.view.diy_report.DiyReport'}
  submenu :Attachment, {:rank => 120, :template => 'Base.view.attachment.Attachment'}
  submenu :Property, {:rank => 130, :template => 'Base.view.property.Property'}
  submenu :Terminology, {:rank => 140, :template => 'Base.view.terminology.Terminology'}
  submenu :Variable, {:rank => 150, :template => 'Base.view.variable.Variable'}
  submenu :Infographic, {:rank => 160, :template => 'Base.view.infographic.Infographic'}
  submenu :Contact, {:rank => 170, :template => 'Base.view.contact.Contact'}
  submenu :Report, {:rank => 180, :template => 'Base.view.report.Report'}
  submenu :RemTrace, {:rank => 190, :template => 'Base.view.rem_trace.RemTrace'}
end
