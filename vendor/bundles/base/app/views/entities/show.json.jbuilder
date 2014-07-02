json.(@entity, :id, :name, :description, :bundle, :list_infographic, :item_infographic)

json.list_infographic @entity.list_infographic, :id, :name if @entity.list_infographic
json.item_infographic @entity.item_infographic, :id, :name if @entity.item_infographic

json.updated_at @entity.updated_at
json.updater @entity.updater, :id, :name if @entity.updater

json.created_at @entity.created_at
json.creator @entity.creator, :id, :name if @entity.creator
