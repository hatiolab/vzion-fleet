class EntityColumn < ActiveRecord::Base
  
  belongs_to :entity
  strip_cols [:name]
  
  validates_presence_of :name, :strict => true
  validates :name, length: { maximum: 60 }, :strict => true
  validates :description, length: { maximum: 255 }, :strict => true
  validates_uniqueness_of :name, :strict => true, :scope => [:entity_id]
  
  default_scope { order("display_rank ASC") }

  def pk_column?
    (self.pk.nil? || self.pk == false || self.pk == 0 || (self.pk =~ /^(t|true|on|y|yes)$/i).nil?) ? false : true
  end
end
