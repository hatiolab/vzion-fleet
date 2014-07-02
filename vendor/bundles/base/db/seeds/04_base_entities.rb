#encoding: utf-8 

Entity.setup Domain, {:bundle =>'base'} do
  @list_columns = ['name', 'description', 'system_flag']
  @search_columns = ['name']
  @sort_columns = ['name']
  @editable_columns = ['description']
end

Entity.setup Calendar, {:bundle =>'base'} do
  @list_columns = ['name', 'description']
  @search_columns = ['name']
  @sort_columns = ['name']
  @editable_columns = ['description','day1_off_flag','day2_off_flag','day3_off_flag','day4_off_flag','day5_off_flag','day6_off_flag','day7_off_flag','day1_workhour','day2_workhour','day3_workhour','day4_workhour','day5_workhour','day6_workhour','day7_workhour']
end

Entity.setup User, {:bundle =>'base'} do
  @list_columns = ['login', 'name', 'email', 'default_domain_id', 'admin_flag', 'lang', 'timezone']
  @search_columns = ['login', 'name', 'email']
  @sort_columns = ['login']
  @editable_columns = ['name', 'email', 'default_domain_id', 'admin_flag', 'lang', 'timezone']
end

Entity.setup Role, {:bundle =>'base'} do
  @list_columns = ['name', 'description', 'updater_id', 'updated_at']
  @search_columns = ['name', 'description', 'updater_id', 'updated_at']
  @sort_columns = ['name']
  @editable_columns = ['description']
end

Entity.setup CommonCode, {:bundle => 'base'} do 
  @list_columns = ['name', 'description', 'updater_id', 'updated_at']
  @search_columns = ['name', 'description']
  @sort_columns = ['name']
  @editable_columns = ['description']
  #column :parent_id, :resource => 'CommonCode'
end

Entity.setup Entity, {:bundle => 'base'} do
  @list_columns = ['name', 'description', 'bundle', 'updater_id', 'updated_at']
  @search_columns = ['name', 'description', 'bundle']
  @sort_columns = ['bundle', 'name']
  @editable_columns = ['name', 'description']
end

Entity.setup Menu, {:bundle => 'base'} do 
  @list_columns = ['name', 'description', 'rank', 'updater_id', 'updated_at']
  @search_columns = ['name', 'description']
  @sort_columns = ['rank']
  @editable_columns = ['name', 'description', 'rank']
  #column :parent_id, :resource => 'Menu'
end

Entity.setup DiyService, {:bundle => 'base'} do
  @list_columns = ['name', 'description', 'script_type', 'active_flag', 'atomic_flag', 'service_logic']
  @search_columns = ['name', 'description', 'script_type', 'active_flag', 'atomic_flag']
  @sort_columns = ['name']
  @editable_columns = ['name', 'description', 'script_type', 'active_flag', 'atomic_flag', 'service_logic']
end

Entity.setup DiySelection, {:bundle => 'base'} do
  @list_columns = ['name', 'description', 'script_type', 'service_logic']
  @search_columns = ['name', 'description', 'script_type']
  @sort_columns = ['name']
  @editable_columns = ['name', 'description', 'script_type', 'service_logic']
end

Entity.setup DiyReport, {:bundle => 'base'} do
  @list_columns = ['name', 'description', 'diy_selection_id', 'updater_id', 'updated_at']
  @search_columns = ['name', 'description', 'diy_selection_id']
  @sort_columns = ['name']
  @editable_columns = ['name', 'description', 'diy_selection_id']
end

Entity.setup Attachment, {:bundle => 'base'} do
  @list_columns = ['name', 'description', 'updater_id', 'updated_at']
  @search_columns = ['name', 'description', 'on_type', 'on_id', 'tag']
  @sort_columns = ['name']
  @editable_columns = ['name', 'description']
end

Entity.setup Property, {:bundle => 'base'} do
  @list_columns = ['name', 'value', 'description', 'on_type', 'on_id', 'updater_id', 'updated_at']
  @search_columns = ['name', 'on_type', 'on_id', 'value']
  @sort_columns = ['name']
  @editable_columns = ['description']
end

Entity.setup Terminology, {:bundle => 'base'} do
  @list_columns = ['category', 'name', 'locale', 'display', 'display_short', 'updater_id', 'updated_at']
  @search_columns = ['category', 'name', 'locale', 'display', 'display_short' ]
  @sort_columns = ['category, ''name']
  @editable_columns = ['name', 'description', 'locale', 'category', 'display', 'display_short']
end

Entity.setup Variable, {:bundle => 'base'} do
  @list_columns = ['name', 'description', 'category', 'updater_id', 'updated_at']
  @search_columns = ['name', 'description', 'category' ]
  @sort_columns = ['name']
  @editable_columns = ['name', 'description', 'category' ]
end

Entity.setup Infographic, {:bundle => 'base'} do
  @list_columns = ['name', 'description', 'infographic_type', 'printer_type', 'updater_id', 'updated_at']
  @search_columns = ['name', 'description', 'infographic_type', 'printer_type']
  @sort_columns = ['name']
  @editable_columns = ['name', 'description', 'infographic_type', 'printer_type']
end

Entity.setup Contact, {:bundle => 'base'} do
  @list_columns = ['name', 'family_name', 'given_name', 'company', 'department', 'title', 'phone_office', 'phone_mobile', 'email']
  @search_columns = ['name', 'email', 'company', 'department', 'phone_office', 'phone_mobile']
  @sort_columns = ['name']
  @editable_columns = ['name', 'family_name', 'given_name', 'company', 'department', 'title', 'phone_office', 'phone_mobile', 'email']
end

Entity.setup Report, {:bundle => 'base'} do
  @list_columns = ['name', 'template', 'updater_id', 'updated_at']
  @search_columns = ['name', 'description']
  @sort_columns = ['name']
  @editable_columns = ['name', 'template']
end

Entity.setup RemTrace, {:bundle => 'base'} do
  @list_columns = ['entity_type', 'entity_id', 'name', 'content', 'updater_id', 'updated_at']
  @search_columns = ['entity_type', 'entity_id', 'name']
  @sort_columns = ['updated_at']
  @editable_columns = []
end