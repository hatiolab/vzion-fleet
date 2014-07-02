class EntityProperty < ActiveRecord::Base
  
  belongs_to :entity
  strip_cols [:name]

  default_scope { order("display_rank ASC") }
end
