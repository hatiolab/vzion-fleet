json.(@domain, :id, :name, :description, :system_flag, :timezone)

json.updated_at @domain.updated_at
json.updater @domain.updater, :id, :name if @domain.updater

json.created_at @domain.created_at
json.creator @domain.creator, :id, :name if @domain.creator
